require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors')

console.log()
// Crear el servidor de express

const app = express();

// db

dbConnection();

app.use(cors())

// dir publico

app.use(express.static('public'))

// lectura y parseo de json 
app.use(express.json())

// rutas

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'))


// escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})