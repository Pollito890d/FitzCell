const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Obtener total de ingresos (Suma de Ventas y Reparaciones)
router.get('/ingresos', async (req, res) => {
    try {
        // Sumar total de Ventas
        const { data: ventas, error: errVentas } = await supabase
            .from('venta')
            .select('total');
        if(errVentas) throw errVentas;
        
        // Sumar total de Reparaciones cobradas (anticipos)
        const { data: reps, error: errReps } = await supabase
            .from('orden_reparacion')
            .select('anticipo, costo');
        if(errReps) throw errReps;

        let total = 0;
        if(ventas) ventas.forEach(v => total += parseFloat(v.total || 0));
        if(reps) reps.forEach(r => total += parseFloat(r.anticipo || 0));

        res.json({ total_ingresos: total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al calcular ingresos' });
    }
});

module.exports = router;
