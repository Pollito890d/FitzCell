-- 1. Agregar columna descripcion a la tabla Dispositivo si no existe
ALTER TABLE Dispositivo ADD COLUMN IF NOT EXISTS descripcion TEXT;

-- 2. Crear función para registrar automáticamente la fecha de entrega cuando el estado pasa a 'Entregado'
CREATE OR REPLACE FUNCTION registrar_fecha_entrega()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'Entregado' AND (OLD.estado IS NULL OR OLD.estado <> 'Entregado') THEN
        NEW.fecha_entrega := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Crear trigger para Orden_Reparacion
DROP TRIGGER IF EXISTS tr_registrar_fecha_entrega ON Orden_Reparacion;
CREATE TRIGGER tr_registrar_fecha_entrega
BEFORE UPDATE OF estado ON Orden_Reparacion
FOR EACH ROW EXECUTE FUNCTION registrar_fecha_entrega();
