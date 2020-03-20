const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//Conectando a la base de datos
mongoose.connect('mongodb://localhost/Customers')
    .then(db => console.log('db Conectada'))
    .catch(err => console.log(err))


// importando rutas
const indexRoutes = require('./routes/index.js');

// configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json())


//rutas
app.use('/', indexRoutes);

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`El servidor esta corriendo en el puerto ${app.get('port')}`);
})