-- ==========================================
-- EJEMPLOS DE DATOS PARA SUPABASE (FITZCELL)
-- ==========================================
-- 1. Insertar más Usuarios (Roles: tecnico, ventas)
INSERT INTO Usuario (nombre, email, password_hash, rol) VALUES 
('Dueño FitzCell', 'admin@fitzcell.com', 'admin123', 'encargado'),
('Carlos Técnico', 'carlos@fitzcell.com', 'tecnico123', 'tecnico'),
('Ana Ventas', 'ana@fitzcell.com', 'ventas123', 'ventas');

-- 2. Insertar Clientes
INSERT INTO Cliente (nombre_completo, telefono, correo_electronico) VALUES 
('Juan Pérez', '9511234567', 'juan@email.com'),
('María López', '9517654321', 'maria@email.com'),
('Alejandro Gomez', '9511112233', 'alejandro.gomez@email.com'),
('Sofia Rodriguez', '9512223344', 'sofia.rod@email.com'),
('Diego Hernandez', '9513334455', 'diego.h@email.com'),
('Lucia Martinez', '9514445566', 'lucia.mtz@email.com'),
('Carlos Lopez', '9515556677', 'carlos.l@email.com'),
('Ana Villanueva', '9516667788', 'ana.villa@email.com'),
('Luis Fernando Torres', '9517778899', 'luis.torres@email.com'),
('Elena Ruiz', '9518889900', 'elena.ruiz@email.com'),
('Javier Morales', '9519990011', 'javier.m@email.com'),
('Valeria Sanchez', '9510001122', 'valeria.s@email.com'),
('Fernando Diaz', '9511230001', 'fernando.d@email.com'),
('Camila Flores', '9511230002', 'camila.f@email.com'),
('Ricardo Jimenez', '9511230003', 'ricardo.j@email.com'),
('Gabriela Alvarez', '9511230004', 'gabriela.a@email.com'),
('Manuel Romero', '9511230005', 'manuel.r@email.com'),
('Daniela Acosta', '9511230006', 'daniela.a@email.com'),
('Jorge Herrera', '9511230007', 'jorge.h@email.com'),
('Adriana Medina', '9511230008', 'adriana.m@email.com'),
('Raul Castro', '9511230009', 'raul.c@email.com'),
('Mariana Vargas', '9511230010', 'mariana.v@email.com'),
('Andres Guzman', '9511230011', 'andres.g@email.com'),
('Natalia Mendez', '9511230012', 'natalia.m@email.com'),
('Pedro Salazar', '9511230013', 'pedro.s@email.com'),
('Paola Rios', '9511230014', 'paola.r@email.com'),
('Eduardo Ortega', '9511230015', 'eduardo.o@email.com'),
('Clara Delgado', '9511230016', 'clara.d@email.com'),
('Roberto Benitez', '9511230017', 'roberto.b@email.com'),
('Isabella Silva', '9511230018', 'isabella.s@email.com'),
('Guillermo Mendoza', '9511230019', 'guillermo.m@email.com'),
('Alicia Rojas', '9511230020', 'alicia.r@email.com'),
('Francisco Cruz', '9511230021', 'francisco.c@email.com'),
('Beatriz Reyes', '9511230022', 'beatriz.r@email.com'),
('Santiago Morales', '9511230023', 'santiago.m@email.com'),
('Jimena Ramos', '9511230024', 'jimena.r@email.com'),
('Antonio Castillo', '9511230025', 'antonio.c@email.com'),
('Laura Peña', '9511230026', 'laura.p@email.com'),
('Sergio Miranda', '9511230027', 'sergio.m@email.com'),
('Marta Campos', '9511230028', 'marta.c@email.com'),
('Alejandra Fuentes', '9511230029', 'alejandra.f@email.com'),
('Hector Carrillo', '9511230030', 'hector.c@email.com'),
('Patricia Espinoza', '9511230031', 'patricia.e@email.com'),
('Arturo Cabrera', '9511230032', 'arturo.c@email.com'),
('Veronica Mora', '9511230033', 'veronica.m@email.com'),
('Ruben Vega', '9511230034', 'ruben.v@email.com'),
('Silvia Fuentes', '9511230035', 'silvia.f@email.com'),
('Hugo Sandoval', '9511230036', 'hugo.s@email.com'),
('Lorena Pardo', '9511230037', 'lorena.p@email.com'),
('Oscar Navarro', '9511230038', 'oscar.n@email.com'),
('Monica Solis', '9511230039', 'monica.s@email.com'),
('Enrique Soto', '9511230040', 'enrique.s@email.com'),
('Yolanda Luna', '9511230041', 'yolanda.l@email.com'),
('Ramon Pacheco', '9511230042', 'ramon.p@email.com'),
('Claudia Valenzuela', '9511230043', 'claudia.v@email.com'),
('Vicente Godoy', '9511230044', 'vicente.g@email.com'),
('Teresa Bravo', '9511230045', 'teresa.b@email.com'),
('Gerardo Gallardo', '9511230046', 'gerardo.g@email.com'),
('Gloria Peralta', '9511230047', 'gloria.p@email.com'),
('Marcos Valencia', '9511230048', 'marcos.v@email.com'),
('Estela Marin', '9511230049', 'estela.m@email.com'),
('Julio Cortazar', '9511230050', 'julio.c@email.com'),
('Rosa Quintanilla', '9511230051', 'rosa.q@email.com'),
('Alfredo Palacios', '9511230052', 'alfredo.p@email.com'),
('Carmen Salinas', '9511230053', 'carmen.s@email.com'),
('Felipe Calderon', '9511230054', 'felipe.c@email.com'),
('Sara Maldonado', '9511230055', 'sara.m@email.com'),
('Tomas Berlanga', '9511230056', 'tomas.b@email.com'),
('Cecilia Paredes', '9511230057', 'cecilia.p@email.com'),
('Cesar Montenegro', '9511230058', 'cesar.m@email.com'),
('Guadalupe Soria', '9511230059', 'guadalupe.s@email.com'),
('Jaime Lozano', '9511230060', 'jaime.l@email.com'),
('Leticia Lazaro', '9511230061', 'leticia.l@email.com'),
('Adolfo Ruiz', '9511230062', 'adolfo.r@email.com'),
('Regina Esquivel', '9511230063', 'regina.e@email.com'),
('Gustavo Villarreal', '9511230064', 'gustavo.v@email.com'),
('Diana Rosales', '9511230065', 'diana.r@email.com'),
('Armando Casas', '9511230066', 'armando.c@email.com'),
('Karla Barbera', '9511230067', 'karla.b@email.com'),
('Samuel Santos', '9511230068', 'samuel.s@email.com'),
('Lourdes Aguilar', '9511230069', 'lourdes.a@email.com'),
('Benjamin Olvera', '9511230070', 'benjamin.o@email.com'),
('Irene Cisneros', '9511230071', 'irene.c@email.com'),
('Rogelio Funes', '9511230072', 'rogelio.f@email.com'),
('Blanca Estela', '9511230073', 'blanca.e@email.com'),
('Mauricio Garces', '9511230074', 'mauricio.g@email.com'),
('Miriam Tovar', '9511230075', 'miriam.t@email.com'),
('Alvaro Obregon', '9511230076', 'alvaro.o@email.com'),
('Ximena Juarez', '9511230077', 'ximena.j@email.com'),
('Salvador Dali', '9511230078', 'salvador.d@email.com'),
('Liliana Velez', '9511230079', 'liliana.v@email.com'),
('Ignacio Allende', '9511230080', 'ignacio.a@email.com'),
('Vanessa Cardenas', '9511230081', 'vanessa.c@email.com'),
('Rodolfo Valentino', '9511230082', 'rodolfo.v@email.com'),
('Ofelia Guajardo', '9511230083', 'ofelia.g@email.com'),
('Abelardo Nuñez', '9511230084', 'abelardo.n@email.com'),
('Rocio Durcal', '9511230085', 'rocio.d@email.com'),
('Erick Elías', '9511230086', 'erick.e@email.com'),
('Josefina Vazquez', '9511230087', 'josefina.v@email.com'),
('Moises Munoz', '9511230088', 'moises.m@email.com'),
('Araceli Arambula', '9511230089', 'araceli.a@email.com'),
('Gonzalo Pizarro', '9511230090', 'gonzalo.p@email.com');

-- 3. Insertar Dispositivos de los Clientes
INSERT INTO Dispositivo (id_cliente, marca, modelo, color, contrasenia, descripcion) VALUES 
(1, 'Apple', 'iPhone 13 Pro', 'Azul Sierra', '123456', 'Rayones leves en la tapa trasera. Pantalla táctil en perfecto estado.'),
(2, 'Samsung', 'Galaxy S22', 'Negro', 'Maria123', 'Tapa trasera de cristal rota tras caída. Requiere reemplazo de batería inflada.'),
(3, 'Apple', 'iPhone 14', 'Negro', '112233', 'Pantalla estrellada de una esquina, touch funciona.'),
(4, 'Samsung', 'Galaxy A54', 'Blanco', '1-2-3-5-7-8-9', 'No enciende tras dejarse cargando toda la noche.'),
(5, 'Xiaomi', 'Redmi Note 11', 'Azul', '1-4-7-8-9', 'Centro de carga flojo, hay que mover el cable para que cargue.'),
(6, 'Motorola', 'Moto G22', 'Gris', '0000', 'Se mojo en el baño. No da imagen pero si vibra.'),
(7, 'Apple', 'iPhone 11', 'Blanco', 'asdfgh', 'Batería condición 72%, solicita reemplazo.'),
(8, 'Samsung', 'Galaxy S23 Ultra', 'Verde', '3-5-7-8-9', 'Cristal de cámara trasera roto. Sensor funciona.'),
(9, 'Huawei', 'P30 Light', 'Negro', '1-5-9-6-3', 'Tapa trasera despegada por batería inflada.'),
(10, 'Xiaomi', 'Poco X3 Pro', 'Gris', '7-4-1-2-3-6-9', 'Muerte súbita, se apago usando Facebook y ya no encendió.'),
(11, 'Motorola', 'Edge 30', 'Plata', 'pass123', 'Botón de encendido sumido, no hace clic.'),
(12, 'Apple', 'iPhone XR', 'Amarillo', '888888', 'Pantalla genérica previa rota, solicita un cambio de pantalla original.'),
(13, 'Samsung', 'Galaxy A32', 'Azul', '1-2-5-8-9', 'Altavoz no se escucha, auricular de llamadas si funciona.'),
(14, 'Xiaomi', 'Redmi 10', 'Gris', '4-5-6-8', 'Micrófono no funciona en llamadas, solo en altavoz.'),
(15, 'Huawei', 'Y9 Prime', 'Verde', 'manuel88', 'Cámara pop-up frontal atorada, no sube.'),
(16, 'Apple', 'iPhone 12 Pro', 'Dorado', 'dani2024', 'Fallas en Face ID después de una caída leve.'),
(17, 'Samsung', 'Galaxy Note 20', 'Bronce', '7-5-3-2-1', 'El S-Pen no lo detecta la pantalla.'),
(18, 'Motorola', 'Moto G60', 'Plata', '1-2-3-6-5-4', 'Pantalla parpadea intermitentemente.'),
(19, 'Xiaomi', 'Redmi Note 12', 'Azul', 'raulito', 'No lee la tarjeta SIM.'),
(20, 'Apple', 'iPhone 13', 'Rosa', 'mari13', 'Filtro del auricular muy sucio, casi no se escucha al llamar.'),
(21, 'Samsung', 'Galaxy A14', 'Negro', '2-5-8-7', 'Sufrió caída, chasis muy doblado.'),
(22, 'Huawei', 'Nova 9', 'Azul', '1-4-5-6-9', 'Táctil loco, se presiona solo.'),
(23, 'Motorola', 'Moto G8 Power', 'Azul', 'pedro88', 'Falla en el jack de audífonos, no los detecta.'),
(24, 'Xiaomi', 'Mi 11 Lite', 'Rosa', '3-6-9-8-7', 'Se calienta demasiado al cargar.'),
(25, 'Apple', 'iPhone 11 Pro', 'Gris Espacial', 'edu11', 'Cámara trasera vibra y hace ruido al enfocar.'),
(26, 'Samsung', 'Galaxy S21 FE', 'Blanco', '1-5-9-8-7', 'Mancha negra en la pantalla LCD.'),
(27, 'Motorola', 'Moto G52', 'Negro', '7-8-9-6-3', 'WiFi no activa, se queda cargando.'),
(28, 'Xiaomi', 'Redmi Note 10 Pro', 'Bronce', '1-2-3-5-4', 'Falla de lector de huella lateral.'),
(29, 'Apple', 'iPhone 7', 'Negro Mate', '7777', 'No da audio en llamadas, botón de altavoz gris (Falla codec).'),
(30, 'Samsung', 'Galaxy A22', 'Gris', '1-4-8-9', 'No pasa del logo de inicio.'),
(31, 'Huawei', 'P40 Pro', 'Plata', 'fran123', 'Cristal trasero estrellado por completo.'),
(32, 'Motorola', 'Moto E7', 'Azul', 'betty7', 'Puerto de carga micro-USB roto internamente.'),
(33, 'Xiaomi', 'Poco F4', 'Negro', '1-5-9', 'Se reinicia constantemente cada 5 segundos.'),
(34, 'Apple', 'iPhone 14 Pro', 'Morado Oscuro', 'jime14', 'Cristal trasero roto, requiere cambio con láser.'),
(35, 'Samsung', 'Galaxy S22 Ultra', 'Negro', '1-2-3-6-5-8', 'Pantalla con línea verde vertical en medio.'),
(36, 'Motorola', 'Moto G200', 'Azul', '7-4-5-6-3', 'No funcionan los botones de volumen.'),
(37, 'Xiaomi', 'Redmi A2', 'Verde', 'sergio2', 'Equipo muy lento, solicita software completo.'),
(38, 'Apple', 'iPhone 8 Plus', 'Rojo', 'marta8', 'No agarra señal celular, se queda en buscando.'),
(39, 'Samsung', 'Galaxy A73', 'Blanco', '1-4-7-5-3', 'El sensor de proximidad no apaga la pantalla al acercar la oreja.'),
(40, 'Huawei', 'Mate 20 Lite', 'Negro', 'hectorC', 'Batería inflada levantó el display.'),
(41, 'Motorola', 'Moto G13', 'Rosa', '4-5-2-1-3', 'Pantalla rota sin dar imagen.'),
(42, 'Xiaomi', 'Redmi Note 11S', 'Azul', '2-5-8-9', 'Se cayó al agua, no enciende.'),
(43, 'Apple', 'iPhone XS Max', 'Plata', 'veroXS', 'Pantalla rota y líneas de colores.'),
(44, 'Samsung', 'Galaxy A52s', 'Negro', '1-4-7-8-5', 'Puerto de carga tipo C sulfatado por humedad.'),
(45, 'Huawei', 'P30 Pro', 'Aurora', 'silviaF', 'Enfoque de cámara principal dañado.'),
(46, 'Motorola', 'Moto E22', 'Gris', 'hugo22', 'Tapa trasera rayada y centro de carga sucio.'),
(47, 'Xiaomi', 'Poco X4 Pro', 'Amarillo', '9-8-7-5-1', 'Falla de software tras actualización fallida.'),
(48, 'Apple', 'iPhone 11 Pro Max', 'Verde Midnight', 'oscar11', 'Cristal frontal roto, LCD original intacto (cambio de glass).'),
(49, 'Samsung', 'Galaxy S20 FE', 'Azul', '3-2-1-5-9', 'Pantalla despegada de un lado.'),
(50, 'Motorola', 'Moto G32', 'Plata', 'enriqueS', 'Auricular suena muy distorsionado.'),
(51, 'Xiaomi', 'Redmi 9C', 'Naranja', '1-2-3-6-9', 'No detecta redes WiFi de 5Ghz.'),
(52, 'Apple', 'iPhone 12', 'Azul', 'ramon12', 'Error al restaurar en iTunes (Error 4013).'),
(53, 'Samsung', 'Galaxy A04', 'Negro', '7-4-5-2-3', 'Touch no responde en la zona inferior.'),
(54, 'Huawei', 'Nova Y70', 'Azul', 'vicenteG', 'No carga, pin interno roto.'),
(55, 'Motorola', 'Moto G42', 'Rosa', 'teresaB', 'Falla del botón power, no bloquea.'),
(56, 'Xiaomi', 'Redmi Note 9', 'Blanco', '1-5-9-6', 'Sensor de huella física roto de la cinta flex.'),
(57, 'Apple', 'iPhone 13 Pro Max', 'Plata', 'gloriaP', 'Pantalla en blanco por completo (falla de flex IC).'),
(58, 'Samsung', 'Galaxy M53', 'Verde', '3-5-7-4-1', 'Equipo mojado en agua salada de mar.'),
(59, 'Huawei', 'P40 Lite', 'Verde', 'estelaM', 'Pantalla estrellada por golpe directo.'),
(60, 'Motorola', 'Moto G72', 'Negro', 'julioC', 'No reconoce audífonos tipo C.'),
(61, 'Xiaomi', 'Poco M4 Pro', 'Azul', '1-4-5-2', 'Altavoz estéreo inferior no suena.'),
(62, 'Apple', 'iPhone SE 2020', 'Rojo', 'alfredoP', 'Batería inflada, pantalla se levantó.'),
(63, 'Samsung', 'Galaxy A23', 'Blanco', '7-8-5-2-3', 'Flash de la cámara trasera no enciende.'),
(64, 'Huawei', 'Y7a', 'Rosa', 'felipeC', 'Se traba en el logo de Huawei.'),
(65, 'Motorola', 'Moto G9 Play', 'Azul', '1-5-9-8', 'Centro de carga quemado por usar cargador genérico malo.'),
(66, 'Xiaomi', 'Redmi Note 12 Pro', 'Gris', 'tomasB', 'Tapa de cristal trasera rota.'),
(67, 'Apple', 'iPhone 14 Plus', 'Azul', 'ceci14', 'Cámara trasera principal se ve borrosa.'),
(68, 'Samsung', 'Galaxy S21 Ultra', 'Plata', '9-6-3-2-1', 'Pantalla parpadea en color verde.'),
(69, 'Huawei', 'Mate 30 Pro', 'Plata', '1-2-5-4-7', 'Pantalla curva rota en los bordes.'),
(70, 'Motorola', 'Moto E20', 'Azul', 'jaimeL', 'Pantalla rota y touch loco.'),
(71, 'Xiaomi', 'Redmi 12C', 'Gris', 'letyL', 'No da audio por altavoz ni auriculares.'),
(72, 'Apple', 'iPhone X', 'Gris Espacial', 'adolfoR', 'Face ID deshabilitado por golpe.'),
(73, 'Samsung', 'Galaxy A34', 'Grafito', '1-4-7-8-9', 'Puerto tipo C mojado, muestra alerta de humedad continua.'),
(74, 'Huawei', 'P Smart 2021', 'Negro', 'gustavoV', 'Batería dura menos de 3 horas.'),
(75, 'Motorola', 'Moto G23', 'Blanco', '2-5-6-3', 'Táctil roto de la parte central.'),
(76, 'Xiaomi', 'Redmi Note 11 Pro', 'Blanco', 'armandoC', 'Se apaga solo al llegar al 20% de batería.'),
(77, 'Apple', 'iPhone 11', 'Negro', 'karlaB', 'No graba notas de voz (micrófono dañado).'),
(78, 'Samsung', 'Galaxy S20 Ultra', 'Gris', '1-5-9', 'Cristal frontal muy astillado.'),
(79, 'Huawei', 'Y9 2019', 'Azul', 'lourdesA', 'Pantalla rota genérica, solicita cambio.'),
(80, 'Motorola', 'Moto G50', 'Verde', 'benjaO', 'No lee la tarjeta de memoria micro SD.'),
(81, 'Xiaomi', 'Poco X5 Pro', 'Negro', '7-5-3-6-9', 'Se congela la pantalla al abrir la cámara.'),
(82, 'Apple', 'iPhone 12 Mini', 'Verde', 'rogelioF', 'Batería condición 75%, se apaga con el frío.'),
(83, 'Samsung', 'Galaxy A53', 'Azul', '1-2-3-5-8', 'Chasis de plástico cuarteado.'),
(84, 'Huawei', 'Nova 8i', 'Plata', 'mauG', 'Display sin retroiluminación (daño en placa de luz).'),
(85, 'Motorola', 'Moto G8 Plus', 'Rojo', 'miriamT', 'Centro de carga flojo.'),
(86, 'Xiaomi', 'Redmi 10A', 'Gris', '4-5-6-9', 'Pantalla rota por caída de escaleras.'),
(87, 'Apple', 'iPhone 13 Pro', 'Grafito', 'ximenaJ', 'No funciona la carga inalámbrica MagSafe.'),
(88, 'Samsung', 'Galaxy Note 10+', 'Aura Glow', '1-5-9-8-7', 'Pantalla rota con mancha y líneas.'),
(89, 'Huawei', 'P20 Pro', 'Azul', 'liliV', 'Tapa trasera estrellada y batería gastada.'),
(90, 'Motorola', 'Moto Edge 40', 'Verde', '3-6-5-4-7', 'Pantalla curva rota en esquina inferior derecha.'),
(91, 'Xiaomi', 'Redmi Note 12S', 'Negro', 'vanessaC', 'No se escucha la bocina de llamadas.'),
(92, 'Apple', 'iPhone XS', 'Dorado', '1-2-5-8', 'Pantalla rota, touch no jala.'),
(93, 'Samsung', 'Galaxy A72', 'Negro', 'ofeliaG', 'El teléfono no enciende ni da señales al conectar cargador.'),
(94, 'Huawei', 'Nova Y90', 'Azul', '7-8-9-5-1', 'Pantalla estrellada.'),
(95, 'Motorola', 'Moto G14', 'Gris', 'rocioD', 'Touch no funciona tras mojarse levemente con lluvia.'),
(96, 'Xiaomi', 'Poco F5', 'Blanco', '1-4-5-6', 'Se calienta el procesador y se apaga.'),
(97, 'Apple', 'iPhone 11', 'Morado', 'josefinaV', 'Cámara trasera se ve totalmente en negro.'),
(98, 'Samsung', 'Galaxy M33', 'Azul', '3-2-5-8-7', 'Lector de huella no lee bien los dedos.'),
(99, 'Huawei', 'Y6 2019', 'Marrón', 'araceliA', 'Entrada de audífonos atascada con mugre.'),
(100, 'Motorola', 'Moto E40', 'Gris', '1-5-9-6-3', 'Pantalla parpadea y tiene líneas blancas.');

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
('Funda de Silicón', 'Accesorio', 40.00, 120.00, 30, 'iPhone 13', 'Apple'),
('Pantalla Incell iPhone 11', 'Pantalla', 450.00, 1200.00, 15, 'iPhone 11', 'Apple'),
('Pantalla OLED Galaxy A54', 'Pantalla', 900.00, 2200.00, 6, 'Galaxy A54', 'Samsung'),
('Batería Premium iPhone 11', 'Batería', 250.00, 650.00, 20, 'iPhone 11', 'Apple'),
('Batería Premium iPhone XR', 'Batería', 220.00, 600.00, 12, 'iPhone XR', 'Apple'),
('Centro de carga Moto G22', 'Centro de carga', 45.00, 350.00, 10, 'Moto G22', 'Motorola'),
('Tapa trasera Cristal iPhone 14 Pro', 'Tapa trasera', 300.00, 900.00, 5, 'iPhone 14 Pro', 'Apple'),
('Cristal de Cámara S23 Ultra', 'Cristal Cámara', 35.00, 250.00, 8, 'Galaxy S23 Ultra', 'Samsung'),
('Mica de Cerámica de Privacidad', 'Accesorio', 25.00, 120.00, 100, 'Universal', 'Varios'),
('Mica de Cristal Templado 9D', 'Accesorio', 15.00, 80.00, 150, 'Universal', 'Varios'),
('Cargador Completo 20W Carga Rápida', 'Accesorio', 120.00, 350.00, 40, 'iPhone 11/12/13/14', 'Apple'),
('Cargador Turbo Power 33W', 'Accesorio', 130.00, 380.00, 30, 'Universal Tipo C', 'Motorola / Xiaomi'),
('Audífonos Alámbricos Lightning', 'Accesorio', 80.00, 250.00, 25, 'iPhone', 'Apple'),
('Audífonos Bluetooth In-Ear Pro', 'Accesorio', 180.00, 450.00, 15, 'Universal', 'Genérico'),
('Soporte Magnético para Auto', 'Accesorio', 40.00, 150.00, 20, 'Universal', 'Genérico');

-- 5. Insertar Tipos de Garantías Adicionales
INSERT INTO Garantia (id_garantia, descripcion, condiciones, dias_duracion) VALUES 
(1, 'Garantía Original (30 días)', 'Cubre defectos de fabricación.', 30),
(2, 'Garantía Genérica (7 días)', 'Cubre defectos de funcionamiento básico.', 7),
(3, 'Garantía de Pantalla', 'Cubre defectos de fábrica, fallos en el táctil. NO cubre golpes ni humedad.', 30),
(4, 'Garantía de Batería', 'Cubre desgaste prematuro o si el equipo se apaga solo.', 60)
ON CONFLICT (id_garantia) DO NOTHING;

-- 6. Insertar Órdenes de Reparación (codigo_seguimiento se deja en NULL para que actúe el trigger autogenerador)
INSERT INTO Orden_Reparacion (id_dispositivo, codigo_seguimiento, fecha_entrada, fecha_entrega, falla_reportada, diagnostico, anticipo, costo, estado) VALUES
(1, NULL, NOW(), NULL, 'Pantalla estrellada y mancha negra', 'Requiere cambio de módulo de pantalla completo.', 500.00, 3000.00, 'Reparando'),
(2, NULL, NOW(), NULL, 'Batería se descarga en 2 horas', 'Batería inflada, requiere reemplazo urgente.', 0.00, 900.00, 'Pendiente'),
(3, NULL, NOW() - INTERVAL '3 days', NULL, 'Pantalla estrellada de una esquina, touch funciona.', 'Requiere cambio de pantalla completa.', 500.00, 2500.00, 'Reparando'),
(4, NULL, NOW() - INTERVAL '5 days', NULL, 'No enciende tras dejarse cargando toda la noche.', 'Corto circuito en línea principal de carga (IC de carga).', 0.00, 850.00, 'Esperando Refacción'),
(5, NULL, NOW() - INTERVAL '2 days', NULL, 'Centro de carga flojo, hay que mover el cable para que cargue.', 'Cambio de tablilla de carga tipo C.', 100.00, 350.00, 'Reparando'),
(6, NULL, NOW() - INTERVAL '4 days', NULL, 'Se mojo en el baño. No da imagen pero si vibra.', 'Sulfatación severa en conector FPC de pantalla. Requiere limpieza ultrasónica.', 200.00, 600.00, 'Pendiente'),
(7, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '4 days', 'Batería condición 72%, solicita reemplazo.', 'Se realiza cambio de batería premium.', 650.00, 650.00, 'Entregado'),
(8, NULL, NOW() - INTERVAL '1 day', NULL, 'Cristal de cámara trasera roto. Sensor funciona.', 'Cambio de cristal de cámara externa.', 0.00, 250.00, 'Listo para entrega'),
(9, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days', 'Tapa trasera despegada por batería inflada.', 'Batería inflada dañada, requiere cambio de batería urgente.', 900.00, 900.00, 'Entregado'),
(10, NULL, NOW() - INTERVAL '3 days', NULL, 'Muerte súbita, se apago usando Facebook y ya no encendió.', 'Falla en soldadura de memoria/procesador (Reballing).', 0.00, 1500.00, 'Pendiente'),
(11, NULL, NOW() - INTERVAL '2 days', NULL, 'Botón de encendido sumido, no hace clic.', 'Cambio de flex interno de encendido.', 150.00, 250.00, 'Reparando'),
(12, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', 'Pantalla genérica previa rota, solicita un cambio de pantalla original.', 'Cambio de módulo de pantalla completa.', 1200.00, 1200.00, 'Entregado'),
(13, NULL, NOW() - INTERVAL '1 day', NULL, 'Altavoz no se escucha, auricular de llamadas si funciona.', 'Cambio de componente de altavoz inferior.', 0.00, 250.00, 'Pendiente'),
(14, NULL, NOW() - INTERVAL '2 days', NULL, 'Micrófono no funciona en llamadas, solo en altavoz.', 'Limpieza de canales de audio y cambio de micrófono secundario.', 150.00, 300.00, 'Listo para entrega'),
(21, NULL, NOW() - INTERVAL '5 days', NULL, 'Sufrió caída, chasis muy doblado.', 'Enderezado de chasis y revisión de soldaduras.', 300.00, 600.00, 'Esperando Refacción'),
(25, NULL, NOW() - INTERVAL '3 days', NULL, 'Cámara trasera vibra y hace ruido al enfocar.', 'Estabilizador óptico dañado, requiere cambio de módulo de cámara.', 500.00, 1200.00, 'Reparando'),
(26, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', 'Mancha negra en la pantalla LCD.', 'Cambio de pantalla LCD completa.', 2200.00, 2200.00, 'Entregado'),
(29, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '10 days', 'No da audio en llamadas, botón de altavoz gris (Falla codec).', 'Reparación de micro soldadura en IC de Audio en placa base.', 1500.00, 1500.00, 'Entregado'),
(32, NULL, NOW() - INTERVAL '1 day', NULL, 'Puerto de carga micro-USB roto internamente.', 'Soldadura de nuevo pin de carga micro-USB.', 100.00, 300.00, 'Reparando'),
(34, NULL, NOW() - INTERVAL '2 days', NULL, 'Cristal trasero roto, requiere cambio con láser.', 'Remoción de cristal e instalación de nueva tapa trasera.', 400.00, 900.00, 'Reparando'),
(35, NULL, NOW() - INTERVAL '8 days', NULL, 'Pantalla con línea verde vertical en medio.', 'Daño en el flex del display. Requiere cambio de pantalla completa.', 1000.00, 4500.00, 'Esperando Refacción'),
(40, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', 'Batería inflada levantó el display.', 'Cambio de batería y pegado preventivo de display.', 900.00, 900.00, 'Entregado'),
(41, NULL, NOW() - INTERVAL '1 day', NULL, 'Pantalla rota sin dar imagen.', 'Cambio de display completo.', 200.00, 1100.00, 'Pendiente'),
(44, NULL, NOW() - INTERVAL '3 days', NULL, 'Puerto de carga tipo C sulfatado por humedad.', 'Limpieza química profunda y resoldado de puerto.', 150.00, 350.00, 'Listo para entrega'),
(48, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 'Cristal frontal roto, LCD original intacto (cambio de glass).', 'Separación de cristal dañado e instalación de nuevo Gorilla Glass.', 1000.00, 1000.00, 'Entregado'),
(53, NULL, NOW() - INTERVAL '2 days', NULL, 'Touch no responde en la zona inferior.', 'Cambio de cristal táctil/pantalla completa.', 0.00, 800.00, 'Pendiente'),
(57, NULL, NOW() - INTERVAL '6 days', NULL, 'Pantalla en blanco por completo (falla de flex IC).', 'Puenteo de líneas de video en flex de pantalla.', 500.00, 1800.00, 'Reparando'),
(62, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', 'Batería inflada, pantalla se levantó.', 'Instalación de batería nueva y mantenimiento.', 650.00, 650.00, 'Entregado'),
(65, NULL, NOW() - INTERVAL '3 days', NULL, 'Centro de carga quemado por usar cargador genérico malo.', 'Cambio de puerto micro-USB.', 0.00, 350.00, 'Reparando'),
(70, NULL, NOW() - INTERVAL '1 day', NULL, 'Pantalla rota y touch loco.', 'Reemplazo de pantalla completa.', 300.00, 950.00, 'Pendiente'),
(73, NULL, NOW() - INTERVAL '2 days', NULL, 'Puerto tipo C mojado, muestra alerta de humedad continua.', 'Mantenimiento preventivo contra humedad y sulfato.', 150.00, 250.00, 'Listo para entrega'),
(77, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 'No graba notas de voz (micrófono dañado).', 'Cambio de flex inferior de carga y micrófonos.', 450.00, 450.00, 'Entregado'),
(82, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', 'Batería condición 75%, se apaga con el frío.', 'Cambio de batería.', 600.00, 600.00, 'Entregado'),
(85, NULL, NOW() - INTERVAL '1 day', NULL, 'Centro de carga flojo.', 'Cambio de pin de carga.', 0.00, 350.00, 'Pendiente'),
(86, NULL, NOW() - INTERVAL '3 days', NULL, 'Pantalla rota por caída de escaleras.', 'Reemplazo de pantalla completa.', 400.00, 900.00, 'Reparando'),
(92, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '4 days', 'Pantalla rota, touch no jala.', 'Cambio de módulo de pantalla completa.', 1400.00, 1400.00, 'Entregado'),
(97, NULL, NOW() - INTERVAL '2 days', NULL, 'Cámara trasera se ve totalmente en negro.', 'Reemplazo de módulo de cámaras traseras.', 300.00, 1200.00, 'Reparando');

-- 7. Registrar qué piezas se utilizaron en una Orden (el tipo_refaccion se define como 'Original' para coincidir con el trigger de garantía)
INSERT INTO Detalle_Reparacion (id_orden, id_producto, id_garantia, tipo_refaccion, cantidad_usada) VALUES 
(1, 1, 1, 'Original', 1),
(3, 18, NULL, 'Original', 1), -- Usa Pantalla Incell iPhone 11 (A modo de prueba de relación)
-- Orden 5 (Dispositivo 5 -> Redmi Note 11, usa Centro de carga Tipo C)
(5, 3, NULL, 'Genérico', 1),
-- Orden 7 (Dispositivo 7 -> iPhone 11, usa Batería Premium iPhone 11)
(7, 20, NULL, 'Original', 1),
-- Orden 8 (Dispositivo 8 -> S23 Ultra, usa Cristal de cámara)
(8, 24, NULL, 'Genérico', 1),
-- Orden 9 (Dispositivo 9 -> P30 Light, usa Batería Genérica/Universal)
(9, 2, NULL, 'Genérico', 1), -- Batería Galaxy S22 simulando salida
-- Orden 11 (Dispositivo 11 -> Edge 30, usa Flex de encendido Moto G)
(11, 5, NULL, 'Genérico', 1),
-- Orden 12 (Dispositivo 12 -> iPhone XR, usa Batería Premium XR)
(12, 21, NULL, 'Original', 1),
-- Orden 13 (Dispositivo 13 -> Galaxy A32, usa Altavoz Universal)
(13, 9, NULL, 'Genérico', 1),
-- Orden 14 (Dispositivo 14 -> Redmi 10, usa Micrófono de repuesto)
(14, 11, NULL, 'Genérico', 1),
-- Orden 17 (Dispositivo 32 -> Moto E7, usa Centro de Carga Tipo C / Micro)
(17, 3, NULL, 'Genérico', 1),
-- Orden 18 (Dispositivo 34 -> iPhone 14 Pro, usa Tapa trasera de cristal)
(18, 23, NULL, 'Original', 1),
-- Orden 20 (Dispositivo 40 -> Mate 20 Lite, usa Batería)
(20, 2, NULL, 'Genérico', 1),
-- Orden 22 (Dispositivo 44 -> Galaxy A52s, usa Mantenimiento químico/sin pieza o centro de carga)
(22, 3, NULL, 'Genérico', 1),
-- Orden 25 (Dispositivo 53 -> Galaxy A04, usa Pantalla)
(25, 19, NULL, 'Genérico', 1),
-- Orden 27 (Dispositivo 62 -> iPhone SE 2020, usa Batería)
(27, 20, NULL, 'Genérico', 1),
-- Orden 28 (Dispositivo 65 -> Moto G9 Play, usa Centro de carga)
(28, 3, NULL, 'Genérico', 1),
-- Orden 30 (Dispositivo 73 -> Galaxy A34, usa Centro de carga/Mantenimiento)
(30, 3, NULL, 'Genérico', 1),
-- Orden 31 (Dispositivo 77 -> iPhone 11, usa Flex de carga)
(31, 4, NULL, 'Original', 1),
-- Orden 32 (Dispositivo 82 -> iPhone 12 Mini, usa Batería)
(32, 20, NULL, 'Genérico', 1),
-- Orden 33 (Dispositivo 85 -> Moto G8 Plus, usa Centro de carga)
(33, 3, NULL, 'Genérico', 1),
-- Orden 35 (Dispositivo 97 -> iPhone 11, usa Cámara Trasera Principal)
(35, 7, NULL, 'Original', 1);

-- 8. Registrar una Venta
INSERT INTO Venta (id_venta, id_orden, fecha, subtotal, total, metodo_pago) VALUES
(1, NULL, NOW() - INTERVAL '7 days 4 hours', 300.00, 300.00, 'Efectivo'),
(2, NULL, NOW() - INTERVAL '7 days 2 hours', 200.00, 200.00, 'Efectivo'),
-- DÍA 2 (Hace 6 days)
(3, NULL, NOW() - INTERVAL '6 days 5 hours', 350.00, 350.00, 'Efectivo'),
(4, 7,    NOW() - INTERVAL '6 days 2 hours', 650.00,   650.00,   'Efectivo'),
-- DÍA 3 (Hace 5 días)
(5, NULL, NOW() - INTERVAL '5 days 6 hours', 450.00, 450.00, 'Transferencia'),
(6, NULL, NOW() - INTERVAL '5 days 3 hours', 120.00, 120.00, 'Efectivo'),
(7, 9,    NOW() - INTERVAL '5 days 1 hour',  900.00,   900.00,   'Efectivo'),

-- DÍA 4 (Hace 4 días)
(8, 12,   NOW() - INTERVAL '4 days 6 hours', 1200.00,   1200.00,   'Transferencia'),
(9, 15,   NOW() - INTERVAL '4 days 4 hours', 600.00, 600.00, 'Efectivo'),
(10, NULL,NOW() - INTERVAL '4 days 2 hours', 150.00, 150.00, 'Efectivo'),
(24, NULL,NOW() - INTERVAL '4 days 1 hour',  160.00, 160.00, 'Efectivo'),
-- DÍA 5 (Hace 3 días)
(11, 20,  NOW() - INTERVAL '3 days 7 hours', 900.00, 900.00, 'Efectivo'),
(12, NULL,NOW() - INTERVAL '3 days 5 hours', 240.00, 240.00, 'Efectivo'),
(13, 27,  NOW() - INTERVAL '3 days 3 hours', 1800.00, 1800.00, 'Efectivo'),
(17, NULL,NOW() - INTERVAL '3 days 2 hours', 150.00, 150.00, 'Efectivo'),
(18, 5,    NOW() - INTERVAL '3 days 1 hour',  350.00, 350.00, 'Efectivo'),
-- DÍA 6 (Hace 2 días)
(14, 31,  NOW() - INTERVAL '2 days 8 hours', 250.00, 250.00, 'Transferencia'),
(19, NULL,NOW() - INTERVAL '2 days 6 hours', 380.00, 380.00, 'Transferencia'),
(20, 8,    NOW() - INTERVAL '2 days 4 hours', 250.00, 250.00, 'Transferencia'),
(25, 3,    NOW() - INTERVAL '2 days 3 hours', 2500.00, 2500.00, 'Efectivo'),
(26, NULL,NOW() - INTERVAL '2 days 2 hours', 350.00, 350.00, 'Transferencia'),
(27, 4,    NOW() - INTERVAL '2 days 1 hour',  850.00, 850.00, 'Efectivo'),
-- DÍA 7 (Hace 1 día)
(28, NULL,NOW() - INTERVAL '1 day 7 hours',  240.00, 240.00, 'Efectivo'),
(29, 6,    NOW() - INTERVAL '1 day 6 hours',  600.00, 600.00, 'Efectivo'),
(21, NULL,NOW() - INTERVAL '1 day 4 hours',  200.00, 200.00, 'Efectivo'),
(22, 11,   NOW() - INTERVAL '1 day 3 hours',  250.00, 250.00, 'Efectivo'),
(32, NULL,NOW() - INTERVAL '1 day 2 hours',  120.00, 120.00, 'Efectivo'),
(33, 13,   NOW() - INTERVAL '1 day 1 hour',   250.00, 250.00, 'Efectivo'),
-- DÍA 8 (Hoy)
(15, NULL,NOW() - INTERVAL '5 hours',        700.00, 700.00, 'Efectivo'),
(16, 32,  NOW() - INTERVAL '4 hours',        450.00, 450.00, 'Efectivo'),
(23, NULL,NOW() - INTERVAL '3 hours',        350.00, 350.00, 'Efectivo'),
(30, NULL,NOW() - INTERVAL '2 hours',        450.00, 450.00, 'Transferencia'),
(31, 10,  NOW() - INTERVAL '1 hour',         1500.00, 1500.00, 'Efectivo'),
(34, NULL,NOW() - INTERVAL '45 minutes',     700.00, 700.00, 'Efectivo'),
(35, 17,  NOW() - INTERVAL '15 minutes',     2200.00, 2200.00, 'Efectivo');

-- Sincronizar secuenciador de Ventas para evitar colisiones futuras en el sistema web
SELECT setval('venta_id_venta_seq', COALESCE((SELECT MAX(id_venta) FROM Venta), 35), true);

-- 9. Detalle de esa Venta
INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario) VALUES 
(1, 16, 2, 150.00),
(2, 16, 2, 100.00),
(3, 18, 1, 350.00),
(5, 21, 1, 450.00),
(6, 16, 1, 120.00),
(10, 22, 1, 150.00),
(12, 16, 2, 120.00),
(15, 18, 2, 350.00),
(17, 22, 1, 150.00),
(19, 19, 1, 380.00),
(21, 16, 2, 100.00),
(23, 18, 1, 350.00),
(24, 17, 2, 80.00),
(26, 18, 1, 350.00),
(28, 16, 2, 120.00),
(30, 21, 1, 450.00),
(32, 16, 1, 120.00),
(34, 18, 2, 350.00);
-- 10. Sincronizar el secuenciador de la tabla Garantia para evitar conflictos en futuras inserciones
-- Esto evita que el sistema web truene al crear una nueva garantía desde la interfaz gráfica.
SELECT setval('garantia_id_garantia_seq', COALESCE((SELECT MAX(id_garantia) FROM Garantia), 4), true);

-- 11. Registrar Cortes de Caja de ejemplo
INSERT INTO Corte_Caja (fecha, cajero_nombre, ventas_efectivo, ventas_transferencia, efectivo_esperado, efectivo_real, diferencia, observaciones) VALUES
(NOW() - INTERVAL '7 days', 'Ana Ventas', 500.00, 0.00, 500.00, 500.00, 0.00, 'Corte de caja sin novedades.'),
-- Corte Día 2 (Ventas 3, 4)
(NOW() - INTERVAL '6 days', 'Ana Ventas', 350.00, 0.00, 350.00, 350.00, 0.00, 'Corte de caja sin novedades.'),
-- Corte Día 3 (Ventas 5, 6, 7)
(NOW() - INTERVAL '5 days', 'Ana Ventas', 120.00, 450.00, 120.00, 120.00, 0.00, 'Corte de caja sin novedades.'),
-- Corte Día 4 (Ventas 8, 9, 10, 24)
(NOW() - INTERVAL '4 days', 'Ana Ventas', 310.00, 0.00, 310.00, 310.00, 0.00, 'Corte de caja sin novedades.'),
-- Corte Día 5 (Ventas 11, 12, 13, 17, 18)
(NOW() - INTERVAL '3 days', 'Ana Ventas', 390.00, 0.00, 390.00, 390.00, 0.00, 'Todo cuadrado.'),
-- Corte Día 6 (Ventas 14, 19, 20, 25, 26, 27)
(NOW() - INTERVAL '2 days', 'Ana Ventas', 0.00, 730.00, 0.00, 0.00, 0.00, 'Solo cobros por transferencia hoy.'),
-- Corte Día 7 (Ventas 28, 29, 21, 22, 32, 33)
(NOW() - INTERVAL '1 day', 'Ana Ventas', 560.00, 0.00, 560.00, 560.00, 0.00, 'Cierre de caja sin novedades.'),
-- Corte Día 8 (Hoy) (Ventas 15, 16, 23, 30, 31, 34, 35)
(NOW(), 'Ana Ventas', 1750.00, 450.00, 1750.00, 1750.00, 0.00, 'Corte de caja sin novedades.');




