const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

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
    const { codigo_barras, nombre_producto, stock, categoria, precio_compra, precio_venta, modelos_compatibles, marcas_compatibles } = req.body;
    try {
        const { data, error } = await supabase
            .from('producto')
            .insert([{ 
                codigo_barras, 
                nombre_producto, 
                stock: stock || 0, 
                categoria, 
                precio_compra: parseFloat(precio_compra) || 0, 
                precio_venta: parseFloat(precio_venta) || 0,
                modelos_compatibles,
                marcas_compatibles
            }])
            .select();
        if (error) throw error;
        res.status(201).json({ message: 'Producto agregado', id: data[0].codigo_barras });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    const { nombre_producto, stock, categoria, precio_compra, precio_venta, modelos_compatibles, marcas_compatibles } = req.body;
    try {
        const { data, error } = await supabase
            .from('producto')
            .update({ 
                nombre_producto, 
                stock: parseInt(stock) || 0, 
                categoria, 
                precio_compra: parseFloat(precio_compra) || 0, 
                precio_venta: parseFloat(precio_venta) || 0,
                modelos_compatibles,
                marcas_compatibles
            })
            .eq('codigo_barras', req.params.id)
            .select();
        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

// Agregar stock a un producto (incremento)
router.patch('/:id/stock', async (req, res) => {
    const { cantidad } = req.body;
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo' });
    }
    try {
        // Obtener stock actual
        const { data: prod, error: getErr } = await supabase
            .from('producto')
            .select('stock')
            .eq('codigo_barras', req.params.id)
            .single();
        if (getErr || !prod) return res.status(404).json({ message: 'Producto no encontrado' });

        const nuevoStock = prod.stock + parseInt(cantidad);
        const { error: updErr } = await supabase
            .from('producto')
            .update({ stock: nuevoStock })
            .eq('codigo_barras', req.params.id);
        if (updErr) throw updErr;
        res.json({ message: 'Stock actualizado', nuevo_stock: nuevoStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar stock' });
    }
});

module.exports = router;
