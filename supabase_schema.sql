-- PostgreSQL para Supabase

-- Eliminar tablas si existen para poder ejecutar el script varias veces sin errores
DROP TABLE IF EXISTS Detalle_Venta;
DROP TABLE IF EXISTS Venta;
DROP TABLE IF EXISTS Detalle_Reparacion;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Garantia;
DROP TABLE IF EXISTS Orden_Reparacion;
DROP TABLE IF EXISTS Dispositivo;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Corte_Caja;


-- 1. Tabla de Usuarios (Roles)
CREATE TABLE Usuario (
    id_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('encargado', 'tecnico', 'ventas')) DEFAULT 'tecnico'
);

-- 2. Tabla de Clientes
CREATE TABLE Cliente (
    curp VARCHAR(18) PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    correo_electronico VARCHAR(100)
);

-- 3. Tabla de Dispositivos
CREATE TABLE Dispositivo (
    id_dispositivo SERIAL PRIMARY KEY,
    id_cliente VARCHAR(18) REFERENCES Cliente(curp) ON DELETE CASCADE,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    color VARCHAR(30),
    contrasenia VARCHAR(50),
    descripcion TEXT
);

-- 4. Tabla de Órdenes de Reparación
CREATE TABLE Orden_Reparacion (
    id_orden SERIAL PRIMARY KEY,
    id_dispositivo INT REFERENCES Dispositivo(id_dispositivo) ON DELETE CASCADE,
    codigo_seguimiento VARCHAR(20) UNIQUE,
    fecha_entrada TIMESTAMPTZ DEFAULT NOW(),
    fecha_entrega TIMESTAMPTZ,
    falla_reportada TEXT,
    diagnostico TEXT,
    anticipo DECIMAL(10,2) DEFAULT 0,
    costo DECIMAL(10,2) DEFAULT 0,
    estado VARCHAR(30) CHECK (estado IN ('Pendiente', 'Esperando Refacción', 'Reparando', 'Listo para entrega', 'Entregado')) DEFAULT 'Pendiente'
);

-- 5. Tabla de Garantías
CREATE TABLE Garantia (
    id_garantia SERIAL PRIMARY KEY,
    descripcion TEXT,
    condiciones TEXT,
    dias_duracion INT
);

-- 6. Tabla de Productos (Refacciones / Inventario)
CREATE TABLE Producto (
    codigo_barras VARCHAR(100) PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    precio_compra DECIMAL(10,2) DEFAULT 0,
    precio_venta DECIMAL(10,2) DEFAULT 0,
    stock INT DEFAULT 0,
    modelos_compatibles TEXT,
    marcas_compatibles TEXT
);

-- 7. Tabla de Detalles de Reparación
CREATE TABLE Detalle_Reparacion (
    id_detalle SERIAL PRIMARY KEY,
    id_orden INT REFERENCES Orden_Reparacion(id_orden) ON DELETE CASCADE,
    id_producto VARCHAR(100) REFERENCES Producto(codigo_barras) ON DELETE SET NULL,
    id_garantia INT REFERENCES Garantia(id_garantia) ON DELETE SET NULL,
    tipo_refaccion VARCHAR(100),
    cantidad_usada INT DEFAULT 1
);

-- 8. Tabla de Ventas (Punto de Venta Local)
CREATE TABLE Venta (
    id_venta SERIAL PRIMARY KEY,
    id_orden INT REFERENCES Orden_Reparacion(id_orden) ON DELETE SET NULL,
    fecha TIMESTAMPTZ DEFAULT NOW(),
    total DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50)
);

-- 9. Tabla de Detalles de Venta
CREATE TABLE Detalle_Venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INT REFERENCES Venta(id_venta) ON DELETE CASCADE,
    id_producto VARCHAR(100) REFERENCES Producto(codigo_barras) ON DELETE SET NULL,
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL
);

-- 10. Tabla de Cortes de Caja
CREATE TABLE Corte_Caja (
    id_corte VARCHAR(100) PRIMARY KEY,
    fecha TIMESTAMPTZ DEFAULT NOW(),
    cajero_nombre VARCHAR(150),
    ventas_efectivo DECIMAL(10,2) DEFAULT 0,
    ventas_transferencia DECIMAL(10,2) DEFAULT 0,
    efectivo_esperado DECIMAL(10,2) DEFAULT 0,
    observaciones TEXT
);
