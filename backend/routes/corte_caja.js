const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Obtener todos los cortes de caja
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('corte_caja')
            .select('*')
            .order('fecha', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener cortes de caja' });
    }
});

// Obtener totales de ventas de un día específico (Local Time)
router.get('/totales-hoy', async (req, res) => {
    const { date } = req.query; // YYYY-MM-DD
    try {
        // Usar la fecha del cliente o la del servidor (en-CA da YYYY-MM-DD)
        const targetDate = date || new Date().toLocaleDateString('en-CA');
        
        // Consultar todas las ventas
        const { data: sales, error } = await supabase
            .from('venta')
            .select('fecha, total, metodo_pago');
            
        if (error) throw error;
        
        let efectivo = 0;
        let transferencia = 0;
        
        if (sales) {
            sales.forEach(sale => {
                const saleDateStr = new Date(sale.fecha).toLocaleDateString('en-CA');
                if (saleDateStr === targetDate) {
                    const total = parseFloat(sale.total) || 0;
                    if (sale.metodo_pago === 'Efectivo') {
                        efectivo += total;
                    } else if (sale.metodo_pago === 'Transferencia') {
                        transferencia += total;
                    }
                }
            });
        }
        
        res.json({
            date: targetDate,
            ventas_efectivo: efectivo,
            ventas_transferencia: transferencia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener totales del día', error: error.message });
    }
});

// Registrar un corte de caja
router.post('/', async (req, res) => {
    const { cajero_nombre, ventas_efectivo, ventas_transferencia, efectivo_esperado, efectivo_real, diferencia, observaciones } = req.body;
    try {
        const { data, error } = await supabase
            .from('corte_caja')
            .insert([{
                cajero_nombre,
                ventas_efectivo: parseFloat(ventas_efectivo) || 0,
                ventas_transferencia: parseFloat(ventas_transferencia) || 0,
                efectivo_esperado: parseFloat(efectivo_esperado) || 0,
                efectivo_real: parseFloat(efectivo_real) || 0,
                diferencia: parseFloat(diferencia) || 0,
                observaciones
            }])
            .select();
            
        if (error) throw error;
        res.status(201).json({ message: 'Corte de caja registrado exitosamente', data: data[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar corte de caja', error: error.message });
    }
});

module.exports = router;
