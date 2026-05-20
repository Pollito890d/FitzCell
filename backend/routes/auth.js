const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// Registro básico (conectado a Supabase)
router.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('usuario')
            .insert([
                { nombre, email, password_hash: password, rol: rol || 'tecnico' }
            ])
            .select();

        if (error) {
            console.error(error);
            return res.status(400).json({ message: 'Error al registrar usuario en Supabase', error: error.message });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: data[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Login (conectado a Supabase con JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consultar el usuario en Supabase (Ojo con las mayúsculas en 'Usuario')
        const { data: user, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('email', email)
            .eq('password_hash', password)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: error ? 'DB ERROR: ' + error.message : 'Credenciales inválidas (No user found)' });
        }

        // Generar Token JWT válido por 8 horas
        const token = jwt.sign(
            { id_usuario: user.id_usuario, rol: user.rol, email: user.email },
            process.env.JWT_SECRET || 'secret_fallback',
            { expiresIn: '8h' }
        );

        res.json({ message: 'Login exitoso', token, rol: user.rol, nombre: user.nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor durante el login' });
    }
});

// Obtener todos los empleados (sin retornar contraseña por seguridad)
router.get('/users', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('usuario')
            .select('id_usuario, nombre, email, rol')
            .order('nombre', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los empleados' });
    }
});

module.exports = router;


