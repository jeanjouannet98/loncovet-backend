const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  try {
    console.log(userData);
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error(`Error de validación: ${error.message}`);
    }
    throw new Error(`Error al guardar el usuario: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Id de usuario inválido');
    }
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      throw new Error('Usuario no encontrado para actualizar');
    }
    return user;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Id de usuario inválido');
    }
    throw new Error(`Error al actualizar el usuario: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('Usuario no encontrado para eliminar');
    }
    return user;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Id de usuario inválido');
    }
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
};

const findUserByUsernameAndPassword = async (username, password) => {
  try {
    // Primero, encuentra el usuario por su nombre de usuario
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Luego, compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // Si la contraseña coincide, devuelve el usuario
    return user;
  } catch (error) {
    throw new Error(`Error al buscar el usuario: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByUsernameAndPassword
};
