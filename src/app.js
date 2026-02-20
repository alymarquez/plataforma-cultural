const express = require('express');
const cors = require('cors');
require ('dotenv').config();

const app = express();

const { authRoutes, reviewRoutes } = require('./routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

module.exports = app;