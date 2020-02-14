'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_shop', {useNewUrlParser: true})
        .then(() =>{
            console.log('La conexión a la Base de datos se ha realizado bien!!');

            //Crear servidor

            app.listen(port,() => {
                console.log('servidor corriendo en http://localhost:' + port);
            });
        });

