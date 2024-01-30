const Patient = require('../models/Patient');

const createPatient = async (patientData) => {
    try {
      const patient = new Patient(patientData);
      await patient.save();
      return patient;
    } catch (error) {
      throw new Error(`Error al crear el paciente: ${error.message}`);
    }
  };

  const getPatientById = async (id) => {
    try {
      const patient = await Patient.findById(id);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error(`Error al obtener el paciente: ${error.message}`);
    }
  };
  
  const updatePatient = async (id, updateData) => {
    try {
      const patient = await Patient.findByIdAndUpdate(id, updateData, { new: true });
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error(`Error al actualizar el paciente: ${error.message}`);
    }
  };
  
  const deletePatient = async (id) => {
    try {
      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error(`Error al eliminar el paciente: ${error.message}`);
    }
  };
  
  const addPatientHistory = async (id, historyData) => {
    try {
      const patient = await Patient.findById(id);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
  
      patient.history = { ...patient.history, ...historyData };
      await patient.save();
  
      return patient;
    } catch (error) {
      throw new Error(`Error al agregar historial al paciente: ${error.message}`);
    }
  };

  const getAllPatients = async () => {
    try {
      const patients = await Patient.find({});
      return patients;
    } catch (error) {
      throw new Error(`Error al obtener los pacientes: ${error.message}`);
    }
  };
  
  module.exports = {
    getAllPatients,
    createPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    addPatientHistory,
  };
  