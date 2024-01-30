const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid').v4;

const patientSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre de usuario es requerido'],
  },
  species: {
    type: String,
    required: [true, 'La especie es requerida'],
  },
  race: {
    type: String,
  },
  age: {
    type: String,
  },	
  history: {
    type: Object,
    default: {},
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

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
