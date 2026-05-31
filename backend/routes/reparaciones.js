const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Obtener todas las reparaciones
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orden_reparacion')
            .select('*, dispositivo(*, cliente(*)), venta(id_venta)')
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

// Obtener todos los clientes registrados
router.get('/clientes/listado', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cliente')
            .select('*')
            .order('nombre_completo', { ascending: true });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
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
    const { cliente_curp, cliente_nombre, cliente_telefono, cliente_email, marca, modelo, color, contrasenia, descripcion, falla, folio_manual, anticipo } = req.body;
    
    try {
        // 1. Buscar o crear cliente
        let clienteId = (cliente_curp || '').toUpperCase().trim();
        if (!clienteId) {
            // Generar un CURP temporal si no viene definido (para peticiones antiguas)
            clienteId = 'CURP' + Date.now().toString().padEnd(14, '0');
        }

        let { data: existingClient, error: errClient } = await supabase
            .from('cliente')
            .select('curp')
            .eq('curp', clienteId)
            .limit(1);

        if (!existingClient || existingClient.length === 0) {
            const { data: newClient, error: errNew } = await supabase
                .from('cliente')
                .insert([{ curp: clienteId, nombre_completo: cliente_nombre, telefono: cliente_telefono, correo_electronico: cliente_email }])
                .select();
            if(errNew) throw errNew;
        }

        // 2. Insert device
        const { data: newDevice, error: errDev } = await supabase
            .from('dispositivo')
            .insert([{ 
                id_cliente: clienteId, 
                marca: marca, 
                modelo: modelo, 
                color: color, 
                contrasenia: contrasenia,
                descripcion: descripcion
            }])
            .select();
        if(errDev) throw errDev;
        const deviceId = newDevice[0].id_dispositivo;

        // 3. Obtener folio si viene manual, si no null para que actúe el trigger
        const folioFinal = folio_manual && folio_manual.trim() !== '' 
            ? folio_manual.trim() 
            : null;
        
        // 4. Crear reparación
        const { data: newRep, error: errRep } = await supabase
            .from('orden_reparacion')
            .insert([{
                codigo_seguimiento: folioFinal,
                id_dispositivo: deviceId,
                falla_reportada: falla,
                anticipo: anticipo ? parseFloat(anticipo) : 0,
                estado: 'Pendiente'
            }])
            .select();
        if(errRep) throw errRep;

        let folioRetorno = newRep && newRep[0] ? newRep[0].codigo_seguimiento : folioFinal;

        // Si el folio autogenerado por el trigger retorna null en la inserción (debido al trigger AFTER INSERT),
        // consultamos nuevamente para obtener el folio oficial ya asignado.
        if (!folioRetorno && newRep && newRep[0]) {
            const { data: updatedRep } = await supabase
                .from('orden_reparacion')
                .select('codigo_seguimiento')
                .eq('id_orden', newRep[0].id_orden)
                .single();
            if (updatedRep) {
                folioRetorno = updatedRep.codigo_seguimiento;
            }
        }

        res.status(201).json({ message: 'Solicitud enviada correctamente', folio: folioRetorno });
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
        const updateFields = { diagnostico, estado, costo };
        if (estado === 'Entregado') {
            updateFields.fecha_entrega = new Date().toISOString();
        }

        const { data: updatedOrder, error: errUpdate } = await supabase
            .from('orden_reparacion')
            .update(updateFields)
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

// Actualizar la contraseña/patrón del dispositivo de una orden
router.put('/:id_orden/contrasenia', async (req, res) => {
    const { id_orden } = req.params;
    const { contrasenia } = req.body;
    try {
        // Obtener id_dispositivo de la orden
        const { data: ord, error: errOrd } = await supabase
            .from('orden_reparacion')
            .select('id_dispositivo')
            .eq('id_orden', id_orden)
            .single();
        if (errOrd || !ord) return res.status(404).json({ message: 'Orden no encontrada' });

        const { error: errUpdate } = await supabase
            .from('dispositivo')
            .update({ contrasenia })
            .eq('id_dispositivo', ord.id_dispositivo);
        if (errUpdate) throw errUpdate;

        res.json({ message: 'Contraseña del dispositivo actualizada con éxito' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar contraseña' });
    }
});

module.exports = router;


