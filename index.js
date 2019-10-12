const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const mongoose = require('mongoose');

/**
 * Importacion de las rutas a utilizar
 */
const authRoute = require('./routes/auth.js');
const personajeRoute = require('./routes/personaje.js');

/**
 * para leer el archivo .env
 * ademas de concatenar variables archivo .env
 */
var myEnv = dotenv.config();
dotenvExpand(myEnv);

/**
 * para conectarse a MongoDB Atlas
 */
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
const MongoDB = mongoose.connection;
MongoDB.on('error', function(err) { console.error(err.message); });
MongoDB.once('open', function() {
    console.info('mongodb connection open');
});

/**
 * Middlewares
 */
app.use(express.json());

/**
 * Routes Middlewares
 * autentificacion
 * consulta de personajes
 */
app.use('/api/user', authRoute);
app.use('/api/personaje', personajeRoute);

/**
 * ejecucion del server express
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.info('Server esta ejecutando'));