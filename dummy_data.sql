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
INSERT INTO Dispositivo (id_cliente, marca, modelo, color, contrasenia) VALUES 
(1, 'Apple', 'iPhone 13 Pro', 'Azul', '123456'),
(2, 'Samsung', 'Galaxy S22', 'Negro', 'Patrón L');

-- 4. Insertar Productos en el Inventario (Refacciones y Accesorios)
INSERT INTO Producto (nombre_producto, categoria, precio_compra, precio_venta, stock, modelos_compatibles, marcas_compatibles) VALUES 
('Pantalla OLED iPhone 13 Pro', 'Pantalla', 1500.00, 3000.00, 5, 'iPhone 13 Pro', 'Apple'),
('Batería Original Galaxy S22', 'Batería', 400.00, 900.00, 10, 'Galaxy S22', 'Samsung'),
('Centro de carga Tipo C', 'Centro de carga', 50.00, 350.00, 20, 'Universal Tipo C', 'Universal'),
('Flex de carga iPhone 11', 'Flex de carga', 100.00, 450.00, 8, 'iPhone 11', 'Apple'),
('Flex de encendido Moto G', 'Flex de encendido', 40.00, 250.00, 15, 'Moto G', 'Motorola'),
('Tablilla de carga Xiaomi', 'Tablilla de carga', 80.00, 300.00, 12, 'Redmi Note 10', 'Xiaomi'),
('Cámara Trasera Principal', 'Cámaras', 500.00, 1200.00, 4, 'iPhone 12', 'Apple'),
('Cámara Frontal (Selfie)', 'Cámaras', 300.00, 800.00, 5, 'Galaxy A54', 'Samsung'),
('Altavoz (Bocina inferior)', 'Altavoz', 60.00, 250.00, 10, 'Universal', 'Varios'),
('Auricular (Llamadas)', 'Auricular', 45.00, 200.00, 15, 'Universal', 'Varios'),
('Micrófono de repuesto', 'Micrófono', 30.00, 150.00, 25, 'Universal', 'Varios'),
('Tapa trasera de cristal', 'Tapa trasera', 200.00, 600.00, 8, 'iPhone 11', 'Apple'),
('Chasis completo', 'Chasis', 400.00, 1000.00, 3, 'iPhone X', 'Apple'),
('Botones de Volumen/Power', 'Botones', 20.00, 150.00, 30, 'Varios', 'Varios'),
('Módulo Face ID', 'Face ID', 800.00, 1800.00, 2, 'iPhone 12 Pro', 'Apple'),
('Cable USB-C de Carga Rápida', 'Accesorio', 50.00, 150.00, 50, 'Universal', 'Universal'),
('Funda de Silicón', 'Accesorio', 40.00, 120.00, 30, 'iPhone 13', 'Apple');

-- 5. Insertar Tipos de Garantías
INSERT INTO Garantia (descripcion, condiciones, dias_duracion) VALUES 
('Garantía de Pantalla', 'Cubre defectos de fábrica, fallos en el táctil. NO cubre golpes ni humedad.', 30),
('Garantía de Batería', 'Cubre desgaste prematuro o si el equipo se apaga solo.', 60);

-- 6. Insertar Órdenes de Reparación
INSERT INTO Orden_Reparacion (id_dispositivo, codigo_seguimiento, falla_reportada, diagnostico, anticipo, costo, estado) VALUES 
(1, 'FITZ-1001', 'Pantalla estrellada y mancha negra', 'Requiere cambio de módulo de pantalla completo.', 500.00, 3000.00, 'Reparando'),
(2, 'FITZ-1002', 'Batería se descarga en 2 horas', 'Batería inflada, requiere reemplazo urgente.', 0.00, 900.00, 'Pendiente');

-- 7. Registrar qué piezas se utilizaron en una Orden
INSERT INTO Detalle_Reparacion (id_orden, id_producto, id_garantia, tipo_refaccion, cantidad_usada) VALUES 
(1, 1, 1, 'Refacción Original', 1);

-- 8. Registrar una Venta
INSERT INTO Venta (id_orden, total, subtotal, metodo_pago) VALUES 
(NULL, 300.00, 300.00, 'Efectivo');

-- 9. Detalle de esa Venta
INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario) VALUES 
(1, 16, 2, 150.00);
