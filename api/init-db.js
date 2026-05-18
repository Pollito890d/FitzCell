const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
  console.log('Iniciando configuración de la base de datos...');
  try {
    // Connect to MySQL server without selecting a database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sqlrt8064awx',
    });

    console.log('Conexión al servidor MySQL exitosa.');

    // Read the SQL file
    const sqlScript = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf-8');
    
    // Split the script into individual queries
    // A simple split by ';' works for this script since there are no semicolons in text or routines
    const queries = sqlScript.split(';').map(q => q.trim()).filter(q => q.length > 0);

    for (let query of queries) {
        if(query) {
            console.log(`Ejecutando: ${query.substring(0, 50)}...`);
            await connection.query(query);
         }
    }

    console.log('Base de datos y tablas creadas exitosamente.');
    await connection.end();
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initDB();
