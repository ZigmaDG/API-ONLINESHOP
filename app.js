'use strict'


// Cargar modulos de node para crear servidor

var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();

// Cargar ficheros rutas

// Middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas

//Exportar modulo
app.get('/probando',(req,res) =>{



    return res.status(200).send({
        empresa: 'Tienda de cosas',
        autor: 'Guillermo Ramos',
        url: 'tienda.com'
    });
} );

module.exports = app;