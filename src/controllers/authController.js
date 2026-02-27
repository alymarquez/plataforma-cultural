const { Op } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar que no exista usuario (pasarlo a middleware posteriormente)
        const existingUser = await User.findOne({ where: {email} }) || await User.findOne({ where: {username} });
        
        if (existingUser) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Generar token JWT
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "Usuario registrado exitosamente", token });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
}

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Buscar usuario por email o username
        const user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user);
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el perfil del usuario" });
    }
}

module.exports = {
    register,
    login,
    getProfile
};
