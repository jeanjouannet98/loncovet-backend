const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es requerido'],
    },
    rut: {
        type: String,
        unique: true,
        required: [true, 'El rut es requerido'],
    },
    phone: {
        type: String,
        required: [true, 'El teléfono es requerido'],
    },
    date: {
        type: Date,
        required: [true, 'La fecha es requerida'],
    },
    hour: {
        type: String,
        required: [true, 'La hora es requerida'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

