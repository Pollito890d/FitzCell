const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Obtener total de ingresos de hoy (Suma de Ventas y Reparaciones del día en curso)
router.get('/ingresos', async (req, res) => {
    try {
        // Obtener total de Ventas
        const { data: ventas, error: errVentas } = await supabase
            .from('venta')
            .select('total, fecha');
        if(errVentas) throw errVentas;
        
        // Obtener total de Reparaciones cobradas (anticipos)
        const { data: reps, error: errReps } = await supabase
            .from('orden_reparacion')
            .select('anticipo, fecha_entrada');
        if(errReps) throw errReps;

        // Fecha de hoy en formato local YYYY-MM-DD
        const todayStr = new Date().toLocaleDateString('en-CA');

        let total = 0;
        if(ventas) {
            ventas.forEach(v => {
                const saleDateStr = new Date(v.fecha).toLocaleDateString('en-CA');
                if (saleDateStr === todayStr) {
                    total += parseFloat(v.total || 0);
                }
            });
        }
        
        if(reps) {
            reps.forEach(r => {
                const repDateStr = new Date(r.fecha_entrada).toLocaleDateString('en-CA');
                if (repDateStr === todayStr) {
                    total += parseFloat(r.anticipo || 0);
                }
            });
        }

        res.json({ total_ingresos: total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al calcular ingresos' });
    }
});

module.exports = router;

