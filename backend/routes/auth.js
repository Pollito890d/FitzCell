const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Registro básico (para pruebas)
router.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    // En un entorno real encriptaríamos la contraseña con bcrypt. 
    // Para simplificar la migración que pide el prototipo dejaremos el texto plano de momento.
    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, password, rol || 'tecnico']
        );
        res.status(201).json({ message: 'Usuario registrado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // En un entorno real se usaría JWT. Por ahora retornamos los datos básicos.
        res.json({ message: 'Login exitoso', user: users[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error durante el login' });
    }
});

module.exports = router;
