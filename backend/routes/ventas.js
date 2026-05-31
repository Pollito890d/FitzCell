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
            const { data: prods, error: errProd } = await supabase
                .from('producto')
                .select('stock')
                .eq('codigo_barras', item.id_producto);
            
            if (errProd) throw errProd;
            if (!prods || prods.length === 0) {
                throw new Error(`El producto con código de barras ${item.id_producto} no existe en el inventario.`);
            }
            const prod = prods[0];
            
            const newStock = Math.max(0, (prod.stock || 0) - item.cantidad);
            await supabase
                .from('producto')
                .update({ stock: newStock })
                .eq('codigo_barras', item.id_producto);
        }

        res.status(201).json({ message: 'Venta registrada exitosamente', id_venta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la venta', error: error.message });
    }
});

// Registrar cobro y entrega de una reparación
router.post('/reparacion', async (req, res) => {
    const { id_orden, total, metodo_pago } = req.body;
    try {
        // 1. Crear la venta asociada a la orden
        const { data: newVenta, error: errVenta } = await supabase
            .from('venta')
            .insert([{ 
                id_orden, 
                total, 
                subtotal: total, 
                metodo_pago: metodo_pago || 'Efectivo' 
            }])
            .select();
        
        if (errVenta) throw errVenta;

        // 2. Obtener el costo total de la reparación para liquidarlo
        const { data: ords, error: errOrdSelect } = await supabase
            .from('orden_reparacion')
            .select('costo')
            .eq('id_orden', id_orden);
        
        if (errOrdSelect) throw errOrdSelect;
        if (!ords || ords.length === 0) {
            return res.status(404).json({ message: `La orden de reparación #${id_orden} no existe.` });
        }
        const ord = ords[0];

        // 3. Actualizar la orden a 'Entregado', liquidando el anticipo e ingresando la fecha de entrega
        const { error: errOrd } = await supabase
            .from('orden_reparacion')
            .update({ 
                estado: 'Entregado',
                anticipo: ord.costo, // Liquidar el saldo completo
                fecha_entrega: new Date().toISOString()
            })
            .eq('id_orden', id_orden);
        
        if (errOrd) throw errOrd;

        res.status(201).json({ message: 'Cobro y entrega registrados exitosamente', id_venta: newVenta[0].id_venta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar entrega de reparación', error: error.message });
    }
});

// Obtener todas las ventas con detalles
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('venta')
            .select('*, detalle_venta(*, producto(*)), orden_reparacion(*, detalle_reparacion(*, producto(*), garantia(*)))')
            .order('fecha', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ventas' });
    }
});

module.exports = router;
