const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js'); // Asegúrate de que la ruta sea correcta
const appointmentRoutes = require('./routes/appointmentRoutes.js'); // Asegúrate de agregar y corregir la ruta
const patientRoutes = require('./routes/patientRoutes.js'); // Asegúrate de agregar y corregir la ruta
const mongoURI = 'mongodb+srv://jean:Coleraf1@cluster0.uvwyl3l.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json()); // Cambia 'json()' a 'express.json()' para parsear el cuerpo de las solicitudes en formato JSON
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/patient', patientRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection to MongoDB failed', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
