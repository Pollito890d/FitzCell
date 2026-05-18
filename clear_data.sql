-- ==========================================
-- LIMPIAR DATOS DE PRUEBA (SUPABASE)
-- ==========================================

-- La instrucción TRUNCATE vacía las tablas por completo y reinicia los contadores (id) a 1.
-- El modificador CASCADE asegura que se borren también los datos relacionados en otras tablas
-- (por ejemplo, si borras un Dispositivo, se borrarán las Órdenes asociadas a él).

TRUNCATE TABLE Detalle_Venta CASCADE;
TRUNCATE TABLE Venta CASCADE;
TRUNCATE TABLE Detalle_Reparacion CASCADE;
TRUNCATE TABLE Producto CASCADE;
TRUNCATE TABLE Garantia CASCADE;
TRUNCATE TABLE Orden_Reparacion CASCADE;
TRUNCATE TABLE Dispositivo CASCADE;
TRUNCATE TABLE Cliente CASCADE;

-- Si también quieres borrar TODOS los usuarios (incluyendo al admin original y a los técnicos), 
-- descomenta la siguiente línea quitando los guiones:
-- TRUNCATE TABLE Usuario CASCADE;
