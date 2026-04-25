const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Rutas
const reparacionesRoutes = require('./routes/reparaciones');
const inventarioRoutes = require('./routes/inventario');
const rmaRoutes = require('./routes/rma');
const crmRoutes = require('./routes/crm');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Main Route Check (moved after static to allow index.html to take precedence if desired, 
// or kept for API health check at /api)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Welcome to FitzCell API' });
});

// API Routes
app.use('/api/reparaciones', reparacionesRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/rma', rmaRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
