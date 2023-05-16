
require('dotenv').config();


const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Midellewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use(require('./routes/index')); // Importa todas las rutas del archivo index.js

// Static Content

app.use(express.static(path.join(__dirname, './public')));

app.listen(3000);
console.log('Server on port 3000');

