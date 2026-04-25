const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes ORDER BY nombre ASC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
});

// Crear cliente
router.post('/', async (req, res) => {
    const { nombre, telefono, email, direccion, notas } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO clientes (nombre, telefono, email, direccion, notas) VALUES (?, ?, ?, ?, ?)',
            [nombre, telefono, email, direccion, notas]
        );
        res.status(201).json({ message: 'Cliente registrado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar cliente' });
    }
});

// Obtener cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
             return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Error al obtener cliente' });
    }
});


module.exports = router;
