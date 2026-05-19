const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener inventario
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM inventario');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inventario' });
    }
});

// Agregar producto
router.post('/', async (req, res) => {
    const { nombre, cantidad, minimo, proveedor, precio, categoria } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO inventario (nombre, cantidad, minimo, proveedor, precio, categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, cantidad || 0, minimo || 1, proveedor, precio || 0.00, categoria]
        );
        res.status(201).json({ message: 'Producto agregado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    const { nombre, cantidad, minimo, proveedor, precio, categoria } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE inventario SET nombre=?, cantidad=?, minimo=?, proveedor=?, precio=?, categoria=? WHERE id=?',
            [nombre, cantidad, minimo, proveedor, precio, categoria, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

module.exports = router;

