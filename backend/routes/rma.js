const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los RMA
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.*, i.nombre as pieza_nombre 
            FROM rma r 
            LEFT JOIN inventario i ON r.pieza_id = i.id
            ORDER BY r.fecha_devolucion DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener RMA' });
    }
});

// Crear un nuevo RMA
router.post('/', async (req, res) => {
    const { id, pieza_id, proveedor, motivo, fecha_devolucion, reparacion_folio, estado, monto, notas } = req.body;
    try {
        await db.query(
            `INSERT INTO rma 
            (id, pieza_id, proveedor, motivo, fecha_devolucion, reparacion_folio, estado, monto, notas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, pieza_id, proveedor, motivo, fecha_devolucion, reparacion_folio, estado || 'Pendiente', monto || 0, notas]
        );
        res.status(201).json({ message: 'RMA registrado correctamente', id });
    } catch (error) {
        console.error(error);
        if(error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'El ID de RMA ya existe' });
        }
        res.status(500).json({ message: 'Error al registrar RMA' });
    }
});

// Actualizar estado de un RMA
router.put('/:id', async (req, res) => {
    const { estado, notas } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE rma SET estado = ?, notas = ? WHERE id = ?',
            [estado, notas, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'RMA no encontrado' });
        res.json({ message: 'RMA actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar RMA' });
    }
});

module.exports = router;

