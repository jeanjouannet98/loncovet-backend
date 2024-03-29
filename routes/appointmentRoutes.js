const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Verifica la ruta al modelo
const {
  createAppointment,
  deleteAppointment,
  listAppointments
} = require('../services/appointmentService'); // Verifica la ruta al servicio

// Ruta para crear una nueva cita
router.post('/', async (req, res) => {
  try {
    const newAppointment = await createAppointment(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar una cita
router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await deleteAppointment(req.params.id);
    res.status(200).json(deletedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para listar todas las citas
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const { appointments, totalPages } = await listAppointments(page, limit);
    res.status(200).json({ appointments, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
