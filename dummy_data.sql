-- ==========================================
-- EJEMPLOS DE DATOS PARA SUPABASE (FITZCELL)
-- ==========================================

-- 1. Insertar más Usuarios (Roles: tecnico, ventas)
INSERT INTO Usuario (nombre, email, password_hash, rol) VALUES 
('Carlos Técnico', 'carlos@fitzcell.com', 'tecnico123', 'tecnico'),
('Ana Ventas', 'ana@fitzcell.com', 'ventas123', 'ventas');

-- 2. Insertar Clientes
INSERT INTO Cliente (nombre_completo, telefono, correo_electronico) VALUES 
('Juan Pérez', '9511234567', 'juan@email.com'),
('María López', '9517654321', 'maria@email.com');

-- 3. Insertar Dispositivos de los Clientes
-- Nota: id_cliente 1 = Juan, id_cliente 2 = María
INSERT INTO Dispositivo (id_cliente, marca, modelo, color, contrasenia) VALUES 
(1, 'Apple', 'iPhone 13 Pro', 'Azul', '123456'),
(2, 'Samsung', 'Galaxy S22', 'Negro', 'Patrón L');

-- 4. Insertar Productos en el Inventario (Refacciones y Accesorios)
INSERT INTO Producto (nombre_producto, categoria, precio_compra, precio_venta, stock, modelos_compatibles, marcas_compatibles) VALUES 
('Pantalla OLED iPhone 13 Pro', 'Pantalla', 1500.00, 3000.00, 5, 'iPhone 13 Pro', 'Apple'),
('Batería Galaxy S22', 'Batería', 400.00, 900.00, 10, 'Galaxy S22', 'Samsung'),
('Cable USB-C de Carga Rápida', 'Accesorio', 50.00, 150.00, 50, 'Universal', 'Universal');

-- 5. Insertar Tipos de Garantías
INSERT INTO Garantia (descripcion, condiciones, dias_duracion) VALUES 
('Garantía de Pantalla', 'Cubre defectos de fábrica, fallos en el táctil. NO cubre golpes ni humedad.', 30),
('Garantía de Batería', 'Cubre desgaste prematuro o si el equipo se apaga solo.', 60);

-- 6. Insertar Órdenes de Reparación
-- Juan (Dispositivo 1) deja su iPhone por pantalla rota
INSERT INTO Orden_Reparacion (id_dispositivo, codigo_seguimiento, falla_reportada, diagnostico, anticipo, costo, estado) VALUES 
(1, 'FITZ-1001', 'Pantalla estrellada y mancha negra', 'Requiere cambio de módulo de pantalla completo.', 500.00, 3000.00, 'Reparando');

-- María (Dispositivo 2) deja su Samsung porque no dura la batería
INSERT INTO Orden_Reparacion (id_dispositivo, codigo_seguimiento, falla_reportada, diagnostico, anticipo, costo, estado) VALUES 
(2, 'FITZ-1002', 'Batería se descarga en 2 horas', 'Batería inflada, requiere reemplazo urgente.', 0.00, 900.00, 'Pendiente');

-- 7. Registrar qué piezas se utilizaron en una Orden (Ej: Se usó la pantalla en la orden de Juan)
-- id_orden 1 = iPhone de Juan, id_producto 1 = Pantalla OLED, id_garantia 1 = Garantía de Pantalla
INSERT INTO Detalle_Reparacion (id_orden, id_producto, id_garantia, tipo_refaccion, cantidad_usada) VALUES 
(1, 1, 1, 'Refacción Original', 1);

-- 8. Registrar una Venta (Ej: Un cliente entra y solo compra 2 cables USB-C sin reparar nada)
-- id_orden = NULL (Venta de mostrador directa)
INSERT INTO Venta (id_orden, total, subtotal, metodo_pago) VALUES 
(NULL, 300.00, 300.00, 'Efectivo');

-- 9. Detalle de esa Venta (Se vendió el Producto 3: Cable USB-C x2)
-- id_venta 1, id_producto 3
INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario) VALUES 
(1, 3, 2, 150.00);
