-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS fitzcell;
USE fitzcell;

-- Tabla de Usuarios (Administradores/Técnicos)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'tecnico') DEFAULT 'tecnico',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Clientes (CRM)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    notas TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reparaciones
CREATE TABLE IF NOT EXISTS reparaciones (
    folio VARCHAR(20) PRIMARY KEY,
    cliente_id INT,
    modelo VARCHAR(100) NOT NULL,
    imei VARCHAR(25),
    falla TEXT NOT NULL,
    costo DECIMAL(10, 2) DEFAULT 0.00,
    anticipo DECIMAL(10, 2) DEFAULT 0.00,
    deuda DECIMAL(10, 2) DEFAULT 0.00,
    sellos TEXT,
    estado ENUM('Diagnóstico', 'En proceso', 'Listo', 'Entregado', 'Cancelado') DEFAULT 'Diagnóstico',
    fecha_ingreso DATE,
    fecha_estimada DATE,
    garantia_dias INT DEFAULT 30,
    notas TEXT,
    tecnico_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de Inventario
CREATE TABLE IF NOT EXISTS inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cantidad INT DEFAULT 0,
    minimo INT DEFAULT 1,
    proveedor VARCHAR(100),
    precio DECIMAL(10, 2) DEFAULT 0.00,
    categoria ENUM('Pantalla', 'Batería', 'Conector', 'Cámara', 'Audio', 'Señal', 'Insumo', 'Otro') DEFAULT 'Otro',
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de RMA (Garantías)
CREATE TABLE IF NOT EXISTS rma (
    id VARCHAR(20) PRIMARY KEY,
    pieza_id INT,
    proveedor VARCHAR(100),
    motivo TEXT NOT NULL,
    fecha_devolucion DATE,
    reparacion_folio VARCHAR(20),
    estado ENUM('Pendiente', 'Cambiado', 'Reembolsado', 'Rechazado') DEFAULT 'Pendiente',
    monto DECIMAL(10, 2) DEFAULT 0.00,
    notas TEXT,
    FOREIGN KEY (pieza_id) REFERENCES inventario(id) ON DELETE SET NULL,
    FOREIGN KEY (reparacion_folio) REFERENCES reparaciones(folio) ON DELETE SET NULL
);

-- Tabla de Productos (Tienda Pública)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoria VARCHAR(100),
    imagen_url VARCHAR(255),
    destacado BOOLEAN DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Carritos de Compra (Asociando sesiones o clientes)
CREATE TABLE IF NOT EXISTS carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT, -- Puede ser NULL si es un usuario no registrado
    session_id VARCHAR(100), -- Para usuarios invitados
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Tabla de Detalles del Carrito (Productos en el carrito)
CREATE TABLE IF NOT EXISTS carrito_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Tabla de Pedidos / Órdenes
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    direccion_envio TEXT NOT NULL,
    metodo_pago VARCHAR(50),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);

-- Tabla de Detalles de Pedidos
CREATE TABLE IF NOT EXISTS pedido_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);
