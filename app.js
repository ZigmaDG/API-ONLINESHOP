'use strict'


// Cargar modulos de node para crear servidor

var express = require('express');
var bodyParser = require('body-parser');

// run express
var app = express();

// load routes file

var item_routes = require('./routes/item');

// Middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS



app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Add prefix to routes

app.use('/api', item_routes);

//Exportar modulo


module.exports = app;