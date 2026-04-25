const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las reparaciones
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.*, c.nombre as cliente 
            FROM reparaciones r 
            LEFT JOIN clientes c ON r.cliente_id = c.id
            ORDER BY r.fecha_ingreso DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reparaciones' });
    }
});

// Obtener una reparación por folio
router.get('/:folio', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.*, c.nombre as cliente 
            FROM reparaciones r 
            LEFT JOIN clientes c ON r.cliente_id = c.id
            WHERE r.folio = ?
        `, [req.params.folio]);
        if (rows.length === 0) {
             return res.status(404).json({ message: 'Reparación no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Error al obtener la reparación' });
    }
});

// Crear una solicitud de reparación (Pública)
router.post('/solicitud', async (req, res) => {
    const { cliente_nombre, cliente_telefono, cliente_email, modelo, falla } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Buscar o crear cliente
        let clienteId;
        const [existing] = await connection.query('SELECT id FROM clientes WHERE email = ? OR telefono = ? LIMIT 1', [cliente_email || '', cliente_telefono || '']);
        
        if (existing.length > 0) {
            clienteId = existing[0].id;
        } else {
            const [newClient] = await connection.query(
                'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
                [cliente_nombre, cliente_telefono, cliente_email]
            );
            clienteId = newClient.insertId;
        }

        // 2. Generar folio para solicitud web
        const folio = 'WEB-' + Math.floor(Date.now() / 1000).toString().substring(4);
        const fecha_ingreso = new Date().toISOString().split('T')[0];
        const notas = 'Solicitud creada desde el portal web.';

        // 3. Crear reparación
        await connection.query(
            `INSERT INTO reparaciones 
            (folio, cliente_id, modelo, falla, estado, fecha_ingreso, notas) 
            VALUES (?, ?, ?, ?, 'Diagnóstico', ?, ?)`,
            [folio, clienteId, modelo, falla, fecha_ingreso, notas]
        );

        await connection.commit();
        res.status(201).json({ message: 'Solicitud enviada correctamente', folio });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    } finally {
        connection.release();
    }
});

// Crear una nueva reparación
router.post('/', async (req, res) => {
    const { folio, cliente_id, modelo, imei, falla, costo, anticipo, sellos, fecha_ingreso, fecha_estimada, notas } = req.body;
    let deuda = costo - anticipo;
    if(deuda < 0) deuda = 0;

    try {
        await db.query(
            `INSERT INTO reparaciones 
            (folio, cliente_id, modelo, imei, falla, costo, anticipo, deuda, sellos, fecha_ingreso, fecha_estimada, notas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [folio, cliente_id, modelo, imei, falla, costo, anticipo, deuda, sellos, fecha_ingreso, fecha_estimada, notas]
        );
        res.status(201).json({ message: 'Reparación registrada correctamente', folio });
    } catch (error) {
        console.error(error);
        if(error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'El folio ya existe' });
        }
        res.status(500).json({ message: 'Error al registrar la reparación' });
    }
});

// Actualizar una reparación
router.put('/:folio', async (req, res) => {
    const { estado, costo, anticipo, notas } = req.body;
    let updateFields = [];
    let values = [];

    if(estado) { updateFields.push('estado = ?'); values.push(estado); }
    if(notas)  { updateFields.push('notas = ?'); values.push(notas); }
    if(costo !== undefined) { updateFields.push('costo = ?'); values.push(costo); }
    if(anticipo !== undefined) { updateFields.push('anticipo = ?'); values.push(anticipo); }
    
    // Recalcular deuda si se enviaron costo/anticipo
    if(costo !== undefined && anticipo !== undefined) {
        let deuda = costo - anticipo;
         if(deuda < 0) deuda = 0;
        updateFields.push('deuda = ?');
        values.push(deuda);
    }

    if(updateFields.length === 0) {
        return res.status(400).json({ message: 'No hay campos para actualizar' });
    }

    values.push(req.params.folio);

    try {
        const [result] = await db.query(
            `UPDATE reparaciones SET ${updateFields.join(', ')} WHERE folio = ?`,
            values
        );

        if(result.affectedRows === 0) {
             return res.status(404).json({ message: 'Reparación no encontrada' });
        }
        res.json({ message: 'Reparación actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la reparación' });
    }
});


module.exports = router;
