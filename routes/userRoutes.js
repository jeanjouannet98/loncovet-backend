const express = require('express');
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

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
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

router.get('/appointments/:uuid', async (req, res) => {
  try {
    const userUuid = req.params.uuid;
    const appointments = await appointmentService.getAppointmentsByUser(userUuid);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... otras rutas ...

module.exports = router;
