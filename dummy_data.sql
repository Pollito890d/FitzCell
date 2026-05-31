-- ==========================================
-- EJEMPLOS DE DATOS PARA SUPABASE (FITZCELL)
-- ==========================================

-- 1. Insertar más Usuarios (Roles: tecnico, ventas, encargado)
INSERT INTO Usuario (nombre, email, password_hash, rol) VALUES 
('Dueño FitzCell', 'admin@fitzcell.com', 'admin123', 'encargado'),
('Carlos Técnico', 'carlos@fitzcell.com', 'tecnico123', 'tecnico'),
('Ana Ventas', 'ana@fitzcell.com', 'ventas123', 'ventas');

-- 2. Insertar Clientes (CURP de 18 caracteres como Llave Primaria Natural)
INSERT INTO Cliente (curp, nombre_completo, telefono, correo_electronico) VALUES 
('PERJ880101HDFLMN01', 'Juan Pérez', '9511234567', 'juan@email.com'),
('LOPM900202MDFLNS02', 'María López', '9517654321', 'maria@email.com'),
('GOMA920303HDFGRS03', 'Alejandro Gomez', '9511112233', 'alejandro.gomez@email.com'),
('RODS940404MDFRDR04', 'Sofia Rodriguez', '9512223344', 'sofia.rod@email.com'),
('HERD960505HDFHRN05', 'Diego Hernandez', '9513334455', 'diego.h@email.com'),
('MARL980606MDFMTN06', 'Lucia Martinez', '9514445566', 'lucia.mtz@email.com'),
('LOPC800707HDFLPC07', 'Carlos Lopez', '9515556677', 'carlos.l@email.com'),
('VILA820808MDFVLN08', 'Ana Villanueva', '9516667788', 'ana.villa@email.com'),
('TORL840909HDFTRN09', 'Luis Fernando Torres', '9517778899', 'luis.torres@email.com'),
('RUIE861010MDFRZR10', 'Elena Ruiz', '9518889900', 'elena.ruiz@email.com'),
('MORM881111HDFMRS11', 'Javier Morales', '9519990011', 'javier.m@email.com'),
('SANS901212MDFSNC12', 'Valeria Sanchez', '9510001122', 'valeria.s@email.com'),
('DIAF920101HDFDZN13', 'Fernando Diaz', '9511230001', 'fernando.d@email.com'),
('FLOC940202MDFFLN14', 'Camila Flores', '9511230002', 'camila.f@email.com'),
('JIMR960303HDFJMN15', 'Ricardo Jimenez', '9511230003', 'ricardo.j@email.com'),
('ALVG980404MDFLVR16', 'Gabriela Alvarez', '9511230004', 'gabriela.a@email.com'),
('ROMM800505HDFRMR17', 'Manuel Romero', '9511230005', 'manuel.r@email.com'),
('ACOD820606MDFCTS18', 'Daniela Acosta', '9511230006', 'daniela.a@email.com'),
('HERJ840707HDFHRR19', 'Jorge Herrera', '9511230007', 'jorge.h@email.com'),
('MEDA860808MDFMDN20', 'Adriana Medina', '9511230008', 'adriana.m@email.com'),
('CASR880909HDFCSN21', 'Raul Castro', '9511230009', 'raul.c@email.com'),
('VARM901010MDFVRG22', 'Mariana Vargas', '9511230010', 'mariana.v@email.com'),
('GUZA921111HDFGZN23', 'Andres Guzman', '9511230011', 'andres.g@email.com'),
('MENN941212MDFMND24', 'Natalia Mendez', '9511230012', 'natalia.m@email.com'),
('SALP960101HDFSZR25', 'Pedro Salazar', '9511230013', 'pedro.s@email.com'),
('RIOP980202MDFFRS26', 'Paola Rios', '9511230014', 'paola.r@email.com'),
('ORTE800303HDFRTG27', 'Eduardo Ortega', '9511230015', 'eduardo.o@email.com'),
('DELC820404MDFDLG28', 'Clara Delgado', '9511230016', 'clara.d@email.com'),
('BENR840505HDFBNT29', 'Roberto Benitez', '9511230017', 'roberto.b@email.com'),
('SILI860606MDFSLV30', 'Isabella Silva', '9511230018', 'isabella.s@email.com');

-- 3. Insertar Dispositivos (Asociados por CURP en id_cliente)
INSERT INTO Dispositivo (id_cliente, marca, modelo, color, contrasenia, descripcion) VALUES 
('PERJ880101HDFLMN01', 'Apple', 'iPhone 13', 'Azul Sierra', '1234', 'Detalle: Rayones leves en pantalla'),
('LOPM900202MDFLNS02', 'Samsung', 'Galaxy S22 Ultra', 'Negro', 'Patrón: 1-4-7-8-9', 'Detalle: Sin tapa trasera'),
('GOMA920303HDFGRS03', 'Xiaomi', 'Redmi Note 11', 'Gris', '0000', 'Detalle: Pantalla totalmente estrellada'),
('RODS940404MDFRDR04', 'Motorola', 'Moto G60', 'Plateado', '1995', 'Detalle: Centro de carga dañado'),
('HERD960505HDFHRN05', 'Apple', 'iPhone 11', 'Blanco', '8888', 'Detalle: Pantalla rota y mojado'),
('MARL980606MDFMTN06', 'Huawei', 'P30 Pro', 'Aurora', '1478', 'Detalle: Batería inflada'),
('LOPC800707HDFLPC07', 'Samsung', 'Galaxy A53', 'Azul', '2580', 'Detalle: No enciende'),
('VILA820808MDFVLN08', 'Apple', 'iPhone 14 Pro Max', 'Morado', 'Patrón: 2-5-8', 'Detalle: Estrellado de atrás'),
('TORL840909HDFTRN09', 'Xiaomi', 'Poco X3 Pro', 'Azul', '9999', 'Detalle: Muerte súbita, sin encender'),
('RUIE861010MDFRZR10', 'Apple', 'iPhone XR', 'Rojo', '1111', 'Detalle: Pantalla fantasma');

-- 4. Insertar Garantías
INSERT INTO Garantia (id_garantia, descripcion, condiciones, dias_duracion) VALUES 
(1, 'Garantía Original (30 días)', 'Cubre defectos de fabricación.', 30),
(2, 'Garantía Genérica (7 días)', 'Cubre defectos de funcionamiento básico.', 7),
(3, 'Sin Garantía', 'No existe garantía para este tipo de piezas', 30);
ON CONFLICT (id_garantia) DO NOTHING;

-- 5. Insertar Productos / Refacciones (Llave Primaria: codigo_barras de texto)
INSERT INTO Producto (codigo_barras, nombre_producto, categoria, precio_compra, precio_venta, stock, modelos_compatibles, marcas_compatibles) VALUES 
('750100000001', 'Pantalla OLED iPhone 13 Original', 'Pantalla', 1200.00, 2200.00, 15, 'iPhone 13', 'Apple'),
('750100000002', 'Batería Genérica iPhone 11', 'Batería', 300.00, 650.00, 20, 'iPhone 11', 'Apple'),
('750100000003', 'Centro de Carga Samsung S22 Ultra', 'Centro de carga', 150.00, 450.00, 10, 'Galaxy S22 Ultra', 'Samsung'),
('750100000004', 'Flex de Carga Motorola G60', 'Flex de carga', 80.00, 250.00, 12, 'Moto G60', 'Motorola'),
('750100000005', 'Pantalla LCD Redmi Note 11 Genérica', 'Pantalla', 450.00, 950.00, 8, 'Redmi Note 11', 'Xiaomi'),
('750100000006', 'Batería Original Huawei P30 Pro', 'Batería', 400.00, 850.00, 5, 'P30 Pro', 'Huawei'),
('750100000007', 'Tapa Trasera iPhone 14 Pro Max', 'Tapa trasera', 350.00, 750.00, 6, 'iPhone 14 Pro Max', 'Apple'),
('750100000008', 'Cámara Trasera Original iPhone XR', 'Cámaras', 500.00, 1100.00, 4, 'iPhone XR', 'Apple'),
('750100000009', 'Altavoz Samsung A53', 'Altavoz', 50.00, 150.00, 18, 'Galaxy A53', 'Samsung'),
('750100000010', 'Flex de Encendido Poco X3 Pro', 'Flex de encendido', 40.00, 150.00, 25, 'Poco X3 Pro', 'Xiaomi'),
('750100000011', 'Pantalla Original iPhone 11 Pro', 'Pantalla', 1000.00, 1950.00, 8, 'iPhone 11 Pro', 'Apple'),
('750100000012', 'Batería Genérica Samsung S20', 'Batería', 250.00, 550.00, 14, 'Galaxy S20', 'Samsung'),
('750100000013', 'Centro de Carga Moto G30', 'Centro de carga', 70.00, 200.00, 30, 'Moto G30', 'Motorola'),
('750100000014', 'Pantalla LCD Redmi 9A', 'Pantalla', 300.00, 700.00, 12, 'Redmi 9A', 'Xiaomi'),
('750100000015', 'Tapa Trasera Samsung S21', 'Tapa trasera', 180.00, 400.00, 7, 'Galaxy S21', 'Samsung'),
('750100000016', 'Batería Genérica iPhone 12', 'Batería', 320.00, 700.00, 10, 'iPhone 12', 'Apple'),
('750100000017', 'Cámara Frontal iPhone 11', 'Cámaras', 200.00, 450.00, 5, 'iPhone 11', 'Apple'),
('750100000018', 'Auricular Samsung S10', 'Auricular', 40.00, 120.00, 15, 'Galaxy S10', 'Samsung'),
('750100000019', 'Micrófono Universal SMD', 'Micrófono', 10.00, 50.00, 100, 'Todos', 'Universal'),
('750100000020', 'Cristal de Cámara iPhone 13 Pro', 'Accesorio', 30.00, 120.00, 40, 'iPhone 13 Pro', 'Apple');

-- 6. Insertar Órdenes de Reparación
INSERT INTO Orden_Reparacion (id_dispositivo, codigo_seguimiento, fecha_entrada, fecha_entrega, falla_reportada, diagnostico, anticipo, costo, estado) VALUES 
(1, 'R-1001', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 'Falla en visualización, pantalla negra', 'Cambio de pantalla completa original.', 500.00, 2700.00, 'Entregado'),
(2, 'R-1002', NOW() - INTERVAL '4 days', NULL, 'Reinicios constantes en el logotipo', 'Falla de software y centro de carga sucio.', 200.00, 650.00, 'Listo para entrega'),
(3, 'R-1003', NOW() - INTERVAL '3 days', NULL, 'Pantalla estrellada y no responde el táctil', 'Requiere cambio de pantalla LCD completa.', 0.00, 1450.00, 'Reparando'),
(4, 'R-1004', NOW() - INTERVAL '2 days', NULL, 'No carga al conectar cable', 'Cambio de flex de carga.', 100.00, 450.00, 'Pendiente'),
(5, 'R-1005', NOW() - INTERVAL '1 days', NULL, 'No enciende tras mojarse', 'Cortocircuito en placa principal, en revisión.', 0.00, 0.00, 'Esperando Refacción'),
(6, 'R-1006', NOW() - INTERVAL '12 hours', NULL, 'Tapa despegada y batería dura muy poco', 'Cambio de batería original.', 150.00, 1000.00, 'Listo para entrega');

-- 7. Insertar Detalles de Reparaciones (Uso de códigos de barras)
INSERT INTO Detalle_Reparacion (id_orden, id_producto, id_garantia, tipo_refaccion, cantidad_usada) VALUES 
(1, '750100000001', 1, 'Original', 1),
(2, '750100000003', 1, 'Original', 1),
(3, '750100000005', 2, 'Genérica', 1),
(6, '750100000006', 1, 'Original', 1);

-- 8. Insertar Ventas (POS local y Reparaciones entregadas)
-- Ajustados los totales para no tener ventas de $0.00.
INSERT INTO Venta (id_venta, id_orden, fecha, subtotal, total, metodo_pago) VALUES 
(1, 1, NOW() - INTERVAL '4 days', 2700.00, 2700.00, 'Efectivo'),
(2, NULL, NOW() - INTERVAL '3 days', 650.00, 650.00, 'Efectivo'),
(3, NULL, NOW() - INTERVAL '2 days', 1300.00, 1300.00, 'Transferencia'),
(4, NULL, NOW() - INTERVAL '1 days', 250.00, 250.00, 'Efectivo'),
(5, NULL, NOW(), 850.00, 850.00, 'Transferencia');

-- 9. Insertar Detalles de Ventas (Para ventas directas)
INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario) VALUES 
(2, '750100000002', 1, 650.00),
(3, '750100000002', 2, 650.00),
(4, '750100000004', 1, 250.00),
(5, '750100000006', 1, 850.00);

-- 10. Insertar Cortes de Caja (Identificador Natural no incremental)
INSERT INTO Corte_Caja (id_corte, fecha, cajero_nombre, ventas_efectivo, ventas_transferencia, efectivo_esperado, efectivo_real, diferencia, observaciones) VALUES 
('CORTE-20260527-180000-ANAVENTAS', NOW() - INTERVAL '3 days', 'Ana Ventas', 2700.00, 0.00, 2700.00, 2700.00, 0.00, 'Caja cuadrada perfectamente, ingresos por entrega de R-1001'),
('CORTE-20260528-180000-ANAVENTAS', NOW() - INTERVAL '2 days', 'Ana Ventas', 650.00, 1300.00, 650.00, 650.00, 0.00, 'Ventas de mostrador fluidas'),
('CORTE-20260529-180000-ANAVENTAS', NOW() - INTERVAL '1 days', 'Ana Ventas', 250.00, 0.00, 250.00, 250.00, 0.00, 'Poco movimiento de efectivo hoy');

-- 11. Sincronizar secuencias para llaves primarias artificiales (SERIAL) después de los inserts manuales
SELECT setval(pg_get_serial_sequence('dispositivo', 'id_dispositivo'), COALESCE(MAX(id_dispositivo), 1), true) FROM dispositivo;
SELECT setval(pg_get_serial_sequence('orden_reparacion', 'id_orden'), COALESCE(MAX(id_orden), 1), true) FROM orden_reparacion;
SELECT setval(pg_get_serial_sequence('garantia', 'id_garantia'), COALESCE(MAX(id_garantia), 1), true) FROM garantia;
SELECT setval(pg_get_serial_sequence('detalle_reparacion', 'id_detalle'), COALESCE(MAX(id_detalle), 1), true) FROM detalle_reparacion;
SELECT setval(pg_get_serial_sequence('venta', 'id_venta'), COALESCE(MAX(id_venta), 1), true) FROM venta;
SELECT setval(pg_get_serial_sequence('detalle_venta', 'id_detalle'), COALESCE(MAX(id_detalle), 1), true) FROM detalle_venta;

