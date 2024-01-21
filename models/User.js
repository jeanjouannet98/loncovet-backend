const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid').v4;

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'El nombre de usuario es requerido'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: [true, 'El rol es requerido'],
    default: 'user',
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
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

const User = mongoose.model('User', userSchema);

module.exports = User;
