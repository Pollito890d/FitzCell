const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedData() {
  console.log('Iniciando carga de datos de prueba...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sqlrt8064awx',
      database: process.env.DB_NAME || 'fitzcell'
    });

    const products = [
      ['Funda Silicona iPhone 13', 'Funda protectora de silicona suave con interior de microfibra.', 250.00, 15, 'Accesorios', '📱'],
      ['Cargador Carga Rápida 20W', 'Adaptador de corriente USB-C de 20W para carga eficiente.', 450.00, 10, 'Cargadores', '🔌'],
      ['Protector de Pantalla Cerámico', 'Mica de cerámica irrompible para máxima protección.', 150.00, 20, 'Protección', '🛡️'],
      ['Audífonos Bluetooth Pro', 'Audífonos inalámbricos con cancelación de ruido y estuche de carga.', 850.00, 5, 'Audio', '🎧']
    ];

    for (const product of products) {
      await connection.query(
        'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
        product
      );
      console.log(`Producto añadido: ${product[0]}`);
    }

    console.log('Sembrado de datos completado exitosamente.');
    await connection.end();
  } catch (error) {
    console.error('Error al sembrar datos:', error);
  }
}

seedData();
