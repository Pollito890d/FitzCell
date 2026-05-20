const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Registrar una venta
router.post('/', async (req, res) => {
    const { total, subtotal, metodo_pago, items } = req.body;
    try {
        // 1. Insertar venta
        const { data: newVenta, error: errVenta } = await supabase
            .from('venta')
            .insert([{ total, subtotal, metodo_pago: metodo_pago || 'Efectivo' }])
            .select();
        
        if (errVenta) throw errVenta;
        const id_venta = newVenta[0].id_venta;

        // 2. Insertar detalles y actualizar stock
        for (let item of items) {
            const { error: errDetalle } = await supabase
                .from('detalle_venta')
                .insert([{
                    id_venta,
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: item.precio_unitario
                }]);
            
            if (errDetalle) throw errDetalle;

            // Descontar stock manualmente del producto en base de datos
            const { data: prod, error: errProd } = await supabase
                .from('producto')
                .select('stock')
                .eq('id_producto', item.id_producto)
                .single();
            
            if (errProd) throw errProd;
            
            const newStock = Math.max(0, (prod.stock || 0) - item.cantidad);
            await supabase
                .from('producto')
                .update({ stock: newStock })
                .eq('id_producto', item.id_producto);
        }

        res.status(201).json({ message: 'Venta registrada exitosamente', id_venta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la venta', error: error.message });
    }
});

// Obtener todas las ventas con detalles
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('venta')
            .select('*, detalle_venta(*, producto(*))')
            .order('fecha', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ventas' });
    }
});

module.exports = router;
