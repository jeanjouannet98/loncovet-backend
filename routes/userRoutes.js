const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Verifica la ruta al modelo
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  findUserByUsernameAndPassword
} = require('../services/userService'); // Cambia 'appointmentService' por 'userService'
const appointmentService = require('../services/appointmentService');
const saltRounds = 10;

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, password, role, name } = req.body; // Incluye role y name
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Pasa un objeto que incluya todas las propiedades necesarias
    const newUser = await createUser({ username, password: hashedPassword, role, name });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener un usuario por su username y password
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsernameAndPassword(username, password);
    if (user) {
      res.json({ message: 'Autenticación exitosa', user });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await appointmentService.listAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... otras rutas ...

module.exports = router;
