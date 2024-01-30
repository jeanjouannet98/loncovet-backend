const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addPatientHistory
} = require('../services/patientService');

router.get('/:id', async (req, res) => {
    try {
      const patient = await getPatientById(req.params.id);
      res.json(patient);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newPatient = await createPatient(req.body);
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedPatient = await updatePatient(req.params.id, req.body);
      res.json(updatedPatient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const patients = await getAllPatients();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      await deletePatient(req.params.id);
      res.status(200).json({ message: 'Paciente eliminado' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.patch('/:id/history', async (req, res) => {
    try {
      const patientWithHistory = await addPatientHistory(req.params.id, req.body);
      res.json(patientWithHistory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;

  