const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos (público) - solo con stock > 0 o destacados
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos WHERE stock > 0 OR destacado = 1 ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Obtener todos los productos (ADMIN)
router.get('/admin', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto (ADMIN)
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, imagen_url, destacado } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url, destacado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock || 0, categoria, imagen_url, destacado || false]
        );
        res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Actualizar un producto (ADMIN)
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, imagen_url, destacado } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, imagen_url=?, destacado=? WHERE id=?',
            [nombre, descripcion, precio, stock, categoria, imagen_url, destacado, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

// Eliminar un producto (ADMIN)
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM productos WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

module.exports = router;

