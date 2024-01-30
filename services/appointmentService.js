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

const listAppointments = async (page = 1, limit = 5) => {
  try {
    const skip = (page - 1) * limit;

    // Contar el número total de citas
    const totalCitas = await Appointment.countDocuments({});

    // Obtener las citas para la página actual
    const appointments = await Appointment.find({}).skip(skip).limit(limit);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalCitas / limit);

    // Devolver las citas y el número total de páginas
    console.log(page, limit, skip, totalCitas, totalPages)
    return { appointments, totalPages };
  } catch (error) {
    throw new Error(`Error al obtener las citas: ${error.message}`);
  }
};


module.exports = {
  createAppointment,
  deleteAppointment,
  listAppointments,
};
