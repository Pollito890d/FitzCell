const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los pedidos (ADMIN)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, c.nombre as cliente_nombre, c.email as cliente_email
            FROM pedidos p 
            LEFT JOIN clientes c ON p.cliente_id = c.id
            ORDER BY p.fecha_pedido DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener pedidos' });
    }
});

// Obtener detalles de un pedido (Items)
router.get('/:id', async (req, res) => {
    try {
        const [pedido] = await db.query('SELECT * FROM pedidos WHERE id = ?', [req.params.id]);
        if (pedido.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });

        const [items] = await db.query(`
            SELECT pi.*, pr.nombre as producto_nombre 
            FROM pedido_items pi 
            JOIN productos pr ON pi.producto_id = pr.id 
            WHERE pi.pedido_id = ?
        `, [req.params.id]);
        
        res.json({ pedido: pedido[0], items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener detalles del pedido' });
    }
});

// Crear un pedido (Cliente / Checkout)
router.post('/', async (req, res) => {
    const { cliente_id, cliente_nombre, cliente_telefono, cliente_email, total, direccion_envio, metodo_pago, items } = req.body;
    
    // Iniciar transacción
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        let finalClienteId = cliente_id;

        // Si no se proporcionó cliente_id pero sí el nombre, crear o buscar el cliente
        if (!finalClienteId && cliente_nombre) {
            const [existing] = await connection.query('SELECT id FROM clientes WHERE email = ? OR telefono = ? LIMIT 1', [cliente_email || '', cliente_telefono || '']);
            if (existing.length > 0) {
                finalClienteId = existing[0].id;
            } else {
                const [newClient] = await connection.query(
                    'INSERT INTO clientes (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)',
                    [cliente_nombre, cliente_telefono, cliente_email, direccion_envio]
                );
                finalClienteId = newClient.insertId;
            }
        }

        // 1. Insertar el pedido principal
        const [pedidoResult] = await connection.query(
            'INSERT INTO pedidos (cliente_id, total, direccion_envio, metodo_pago) VALUES (?, ?, ?, ?)',
            [finalClienteId, total, direccion_envio, metodo_pago]
        );
        const pedidoId = pedidoResult.insertId;

        // 2. Insertar los items del pedido y descontar stock
        for (let item of items) {
            await connection.query(
                'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [pedidoId, item.producto_id, item.cantidad, item.precio]
            );

            await connection.query(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [item.cantidad, item.producto_id]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Pedido creado exitosamente', id: pedidoId });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al procesar el pedido' });
    } finally {
        connection.release();
    }
});

// Actualizar estado del pedido (ADMIN)
router.put('/:id/estado', async (req, res) => {
    const { estado } = req.body;
    try {
        const [result] = await db.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, req.params.id]);
         if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
         res.json({ message: 'Estado del pedido actualizado' });
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Error al actualizar pedido' });
    }
});


module.exports = router;

