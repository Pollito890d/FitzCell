const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Obtener todas las reparaciones
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orden_reparacion')
            .select('*, dispositivo(*, cliente(*))')
            .order('fecha_entrada', { ascending: false });
        if (error) throw error;
        
        // Mapear fecha_ingreso para retrocompatibilidad
        const mappedData = data.map(item => ({
            ...item,
            fecha_ingreso: item.fecha_entrada
        }));
        res.json(mappedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reparaciones' });
    }
});

// Obtener una reparación por folio (Para rastreo y detalles con refacciones y garantías)
router.get('/:folio', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orden_reparacion')
            .select('*, dispositivo(*, cliente(*)), detalle_reparacion(*, producto(*), garantia(*))')
            .eq('codigo_seguimiento', req.params.folio)
            .single();
        if (error) {
            if(error.code === 'PGRST116') return res.status(404).json({ message: 'Reparación no encontrada' });
            throw error;
        }
        
        // Retrocompatibilidad
        if (data) {
            data.fecha_ingreso = data.fecha_entrada;
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reparación' });
    }
});

// Crear una solicitud de reparación (Pública)
router.post('/solicitud', async (req, res) => {
    const { cliente_nombre, cliente_telefono, cliente_email, modelo, falla, folio_manual, anticipo } = req.body;
    
    try {
        // 1. Buscar o crear cliente
        let clienteId;
        let { data: existingClient, error: errClient } = await supabase
            .from('cliente')
            .select('id_cliente')
            .or(`correo_electronico.eq.${cliente_email},telefono.eq.${cliente_telefono}`)
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

        // 3. Generar folio o usar manual
        const folioFinal = folio_manual && folio_manual.trim() !== '' 
            ? folio_manual.trim() 
            : 'FITZ-' + Math.floor(Date.now() / 1000).toString().substring(4);
        
        // 4. Crear reparación
        const { error: errRep } = await supabase
            .from('orden_reparacion')
            .insert([{
                codigo_seguimiento: folioFinal,
                id_dispositivo: deviceId,
                falla_reportada: falla,
                anticipo: anticipo ? parseFloat(anticipo) : 0,
                estado: 'Pendiente'
            }]);
        if(errRep) throw errRep;

        res.status(201).json({ message: 'Solicitud enviada correctamente', folio: folioFinal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

// Guardar diagnóstico del técnico, cambiar estado y añadir piezas utilizadas
router.put('/:id_orden/diagnostico', async (req, res) => {
    const { id_orden } = req.params;
    const { diagnostico, estado, costo, piezas } = req.body;
    
    try {
        // 1. Actualizar orden_reparacion
        const { data: updatedOrder, error: errUpdate } = await supabase
            .from('orden_reparacion')
            .update({ diagnostico, estado, costo })
            .eq('id_orden', id_orden)
            .select();
        
        if (errUpdate) throw errUpdate;
        
        // 2. Si se proporcionaron piezas, insertarlas en Detalle_Reparacion
        if (piezas && piezas.length > 0) {
            const insertData = piezas.map(p => ({
                id_orden: parseInt(id_orden),
                id_producto: p.id_producto,
                tipo_refaccion: p.tipo_refaccion || 'Original',
                cantidad_usada: 1
            }));
            
            const { error: errPiezas } = await supabase
                .from('detalle_reparacion')
                .insert(insertData);
            
            if (errPiezas) throw errPiezas;
        }
        
        res.json({ message: 'Diagnóstico guardado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el diagnóstico', error: error.message });
    }
});

module.exports = router;


