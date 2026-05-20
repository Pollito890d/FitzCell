const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Rutas
const reparacionesRoutes = require('./routes/reparaciones');
const inventarioRoutes = require('./routes/inventario');
const rmaRoutes = require('./routes/rma');
const crmRoutes = require('./routes/crm');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');
const ventasRoutes = require('./routes/ventas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Health
app.get('/api/health', (req, res) => {
  res.json({ message: 'Welcome to FitzCell API (Vercel Serverless)' });
});

// Rutas
app.use('/api/reparaciones', reparacionesRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/rma', rmaRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/ventas', ventasRoutes);

// Exportar en lugar de escuchar en un puerto (Requerido por Vercel)
module.exports = app;
