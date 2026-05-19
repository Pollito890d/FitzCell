const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Obtener inventario
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('producto').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inventario' });
    }
});

// Agregar producto
router.post('/', async (req, res) => {
    const { nombre_producto, stock, categoria, precio_compra, precio_venta } = req.body;
    try {
        const { data, error } = await supabase
            .from('producto')
            .insert([{ nombre_producto, stock: stock || 0, categoria, precio_compra, precio_venta }])
            .select();
        if (error) throw error;
        res.status(201).json({ message: 'Producto agregado', id: data[0].id_producto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    const { nombre_producto, stock, categoria, precio_compra, precio_venta } = req.body;
    try {
        const { data, error } = await supabase
            .from('producto')
            .update({ nombre_producto, stock, categoria, precio_compra, precio_venta })
            .eq('id_producto', req.params.id)
            .select();
        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

module.exports = router;
