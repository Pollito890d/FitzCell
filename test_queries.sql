-- ==========================================
-- PRUEBAS DE TRIGGERS Y FUNCIONALIDAD (SUPABASE)
-- ==========================================

-- PRUEBA 1: Verificar el Trigger de Inventario (TC-02)
-- 1. Revisamos cuánto stock hay del Producto 1 (Pantalla)
SELECT nombre_producto, stock FROM Producto WHERE id_producto = 1;

-- 2. Simulamos usar una pantalla en la reparación del folio 1 (Juan)
INSERT INTO Detalle_Reparacion (id_orden, id_producto, tipo_refaccion, cantidad_usada) 
VALUES (1, 1, 'Original', 1);

-- 3. Volvemos a revisar el stock, ¡Debería tener 1 pieza menos!
SELECT nombre_producto, stock FROM Producto WHERE id_producto = 1;

-- PRUEBA 2: Verificar Asignación Automática de Garantía (RF-04)
-- Revisamos el Detalle de Reparación que acabamos de insertar para ver qué póliza le asignó.
-- Como pusimos 'Original', debió asignarle el id_garantia = 1 (30 días).
SELECT * FROM Detalle_Reparacion WHERE id_orden = 1;

-- PRUEBA 3: Verificar Restricción de Entrega (TC-05)
-- El equipo de Juan tiene un costo de 3000 y solo dejó 500 de anticipo.
-- Si intentamos ponerlo en 'Entregado', la base de datos DEBE MARCAR ERROR y bloquear la acción.
UPDATE Orden_Reparacion SET estado = 'Entregado' WHERE id_orden = 1;

-- Para que nos deje entregarlo, primero Juan debe liquidar (anticipo = costo)
UPDATE Orden_Reparacion SET anticipo = 3000 WHERE id_orden = 1;
-- Ahora sí, intentamos entregarlo y debería funcionar sin problemas
UPDATE Orden_Reparacion SET estado = 'Entregado' WHERE id_orden = 1;

-- PRUEBA 4: Verificar Código de Seguimiento (RF-03)
-- Insertamos una nueva orden vacía para María (Dispositivo 2)
INSERT INTO Orden_Reparacion (id_dispositivo, falla_reportada, diagnostico, anticipo, costo, estado) 
VALUES (2, 'Micrófono no sirve', 'Requiere cambio de módulo inferior', 200, 600, 'Pendiente');

-- Revisamos todas las órdenes, la nueva orden debió auto-generar un código como "FTZ-003"
SELECT id_orden, codigo_seguimiento, falla_reportada FROM Orden_Reparacion;
