const Appointment = require('../models/Appointment');

const createAppointment = async (appointmentData) => {
  try {
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    return appointment;
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new Error(`Error de validación: ${error.message}`);
    }
    throw new Error(`Error al guardar la cita: ${error.message}`);
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      throw new Error("Cita no encontrada para eliminar");
    }
    return appointment;
  } catch (error) {
    if (error.name === "CastError") {
      throw new Error("Id de cita inválido");
    }
    throw new Error(`Error al eliminar la cita: ${error.message}`);
  }
};

const listAppointments = async () => {
  try {
    return await Appointment.find({});
  } catch (error) {
    throw new Error(`Error al obtener las citas: ${error.message}`);
  }
};

const getAppointmentsByUser = async (userUuid) => {
  try {
    const appointments = await Appointment.find({ user: userUuid });
    return appointments;
  } catch (error) {
    throw new Error(`Error al obtener las citas del usuario: ${error.message}`);
  }
};

module.exports = {
  createAppointment,
  deleteAppointment,
  listAppointments,
  getAppointmentsByUser
};
