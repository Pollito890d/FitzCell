const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Obtener todas las reparaciones
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orden_reparacion')
            .select('*, cliente:id_cliente(nombre_completo)')
            .order('fecha_ingreso', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reparaciones' });
    }
});

// Obtener una reparación por folio (Para rastreo y detalles)
router.get('/:folio', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orden_reparacion')
            .select('*, cliente:id_cliente(nombre_completo)')
            .eq('codigo_seguimiento', req.params.folio)
            .single();
        if (error) {
            if(error.code === 'PGRST116') return res.status(404).json({ message: 'Reparación no encontrada' });
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reparación' });
    }
});

// Crear una solicitud de reparación (Pública)
router.post('/solicitud', async (req, res) => {
    const { cliente_nombre, cliente_telefono, cliente_email, modelo, falla } = req.body;
    
    try {
        // 1. Buscar o crear cliente
        let clienteId;
        let { data: existingClient, error: errClient } = await supabase
            .from('cliente')
            .select('id_cliente')
            .or(correo_electronico.eq.+cliente_email+,telefono.eq.+cliente_telefono)
            .limit(1);

        if (existingClient && existingClient.length > 0) {
            clienteId = existingClient[0].id_cliente;
        } else {
            const { data: newClient, error: errNew } = await supabase
                .from('cliente')
                .insert([{ nombre_completo: cliente_nombre, telefono: cliente_telefono, correo_electronico: cliente_email }])
                .select();
            if(errNew) throw errNew;
            clienteId = newClient[0].id_cliente;
        }

        // 2. Insert device
        const { data: newDevice, error: errDev } = await supabase
            .from('dispositivo')
            .insert([{ id_cliente: clienteId, modelo: modelo }])
            .select();
        if(errDev) throw errDev;
        const deviceId = newDevice[0].id_dispositivo;

        // 3. Generar folio para solicitud web
        const folio = 'WEB-' + Math.floor(Date.now() / 1000).toString().substring(4);
        
        // 4. Crear reparación
        const { error: errRep } = await supabase
            .from('orden_reparacion')
            .insert([{
                codigo_seguimiento: folio,
                id_dispositivo: deviceId,
                falla_reportada: falla,
                estado: 'Pendiente'
            }]);
        if(errRep) throw errRep;

        res.status(201).json({ message: 'Solicitud enviada correctamente', folio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

module.exports = router;
