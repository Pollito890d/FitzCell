-- ==========================================
-- SCRIPT DE TRIGGERS CORREGIDOS PARA SUPABASE
-- ==========================================

-- 1. Generación Automática de Código de Seguimiento (RF-03)
ALTER TABLE Orden_Reparacion ALTER COLUMN codigo_seguimiento DROP NOT NULL;

CREATE OR REPLACE FUNCTION generar_codigo_seguimiento()
RETURNS TRIGGER AS $*$*
BEGIN
    IF NEW.codigo_seguimiento IS NULL OR NEW.codigo_seguimiento = '' THEN
        UPDATE Orden_Reparacion
        SET codigo_seguimiento = 'R-' || (999 + NEW.id_orden)::text
        WHERE id_orden = NEW.id_orden;
    END IF;
    RETURN NEW;
END;
$*$* LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_asignar_codigo_seguimiento ON Orden_Reparacion;
CREATE TRIGGER tr_asignar_codigo_seguimiento
AFTER INSERT ON Orden_Reparacion
FOR EACH ROW EXECUTE FUNCTION generar_codigo_seguimiento();

-- ==========================================
-- 2. Actualización Automática de Inventario (TC-02)
CREATE OR REPLACE FUNCTION descontar_stock_reparacion()
RETURNS TRIGGER AS $*$*
BEGIN
    UPDATE Producto
    SET stock = stock - NEW.cantidad_usada
    WHERE id_producto = NEW.id_producto;
    
    -- Verificación de stock negativo
    IF (SELECT stock FROM Producto WHERE id_producto = NEW.id_producto) < 0 THEN
        RAISE EXCEPTION 'Error: Stock insuficiente para el producto seleccionado.';
    END IF;
    
    RETURN NEW;
END;
$*$* LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_actualizar_inventario_rep ON Detalle_Reparacion;
CREATE TRIGGER tr_actualizar_inventario_rep
AFTER INSERT ON Detalle_Reparacion
FOR EACH ROW EXECUTE FUNCTION descontar_stock_reparacion();

-- ==========================================
-- 3. Restricción de Entrega por Saldo Pendiente (TC-05)
CREATE OR REPLACE FUNCTION validar_pago_entrega()
RETURNS TRIGGER AS $*$*
BEGIN
    -- Si el estado cambia a 'Entregado'
    IF NEW.estado = 'Entregado' THEN
        -- Verifica si el anticipo es menor al costo total
        IF NEW.anticipo < NEW.costo THEN
            RAISE EXCEPTION 'No se puede entregar el equipo: Existe un saldo pendiente de liquidar.';
        END IF;
    END IF;
    RETURN NEW;
END;
$*$* LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_validar_pago_antes_entrega ON Orden_Reparacion;
CREATE TRIGGER tr_validar_pago_antes_entrega
BEFORE UPDATE OF estado ON Orden_Reparacion
FOR EACH ROW EXECUTE FUNCTION validar_pago_entrega();

-- ==========================================
-- 4. Asignación Automática de Garantía (RF-04)
INSERT INTO Garantia (id_garantia, descripcion, dias_duracion) 
VALUES (1, 'Garantía Original (30 días)', 30) ON CONFLICT DO NOTHING;

INSERT INTO Garantia (id_garantia, descripcion, dias_duracion) 
VALUES (2, 'Garantía Genérica (7 días)', 7) ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION calcular_periodo_garantia()
RETURNS TRIGGER AS $*$*
BEGIN
    -- Define la póliza a enlazar según tipo de refacción
    IF NEW.tipo_refaccion = 'Original' THEN
        NEW.id_garantia := 1;
    ELSE
        NEW.id_garantia := 2;
    END IF;
    
    RETURN NEW;
END;
$*$* LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_generar_garantia_auto ON Detalle_Reparacion;
CREATE TRIGGER tr_generar_garantia_auto
BEFORE INSERT ON Detalle_Reparacion
FOR EACH ROW EXECUTE FUNCTION calcular_periodo_garantia();

-- ==========================================
-- 5. Actualización Automática de Inventario por Ventas
-- ==========================================
CREATE OR REPLACE FUNCTION descontar_stock_venta()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Producto
    SET stock = stock - NEW.cantidad
    WHERE id_producto = NEW.id_producto;
    
    -- Verificación de stock bajo cero
    IF (SELECT stock FROM Producto WHERE id_producto = NEW.id_producto) < 0 THEN
        RAISE EXCEPTION 'Error: Stock insuficiente para el producto vendido.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_actualizar_inventario_venta ON Detalle_Venta;
CREATE TRIGGER tr_actualizar_inventario_venta
AFTER INSERT ON Detalle_Venta
FOR EACH ROW EXECUTE FUNCTION descontar_stock_venta();

-- ==========================================
-- 6. Registro Automático de Fecha de Entrega
-- ==========================================
CREATE OR REPLACE FUNCTION registrar_fecha_entrega()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'Entregado' AND (OLD.estado IS NULL OR OLD.estado <> 'Entregado') THEN
        NEW.fecha_entrega := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_registrar_fecha_entrega ON Orden_Reparacion;
CREATE TRIGGER tr_registrar_fecha_entrega
BEFORE UPDATE OF estado ON Orden_Reparacion
FOR EACH ROW EXECUTE FUNCTION registrar_fecha_entrega();

-- Sincronizar el secuenciador de la tabla Garantia para evitar conflictos con los IDs manuales 1 y 2
SELECT setval('garantia_id_garantia_seq', COALESCE((SELECT MAX(id_garantia) FROM Garantia), 2), true);
