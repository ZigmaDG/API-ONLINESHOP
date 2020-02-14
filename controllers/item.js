'use strict'


var validator = require('validator');
var Item = require('../models/item');


var controller = {

    //save method through post
    save: (req, res) => {
        //get params through post

        var params = req.body;

        //validate data (validator)

        try {

            var validate_name = !validator.isEmpty(params.name);
            var validate_category = !validator.isEmpty(params.category);
            var validate_price = !validator.isEmpty(params.price);
            var validate_brand = !validator.isEmpty(params.brand);
            var validate_description = !validator.isEmpty(params.description);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });
        }

        if (validate_name && validate_category && validate_price && validate_brand && validate_description) {
           
            //Create the object to save

            var item = new Item();

            //assign values

            item.name = params.name;
            item.category = params.category;
            item.price = params.price;
            item.brand = params.brand;
            item.description = params.description;
            item.image = null;

            //Save item

            item.save((err, itemStored) => {

                if (err || !itemStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el item no se ha guardado'
                    });
                }

                //Return a response
                return res.status(200).send({
                    status: 'success',
                    item: itemStored
                });
            });


        }else{
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son válidos'
            })
        }
    },
    
    // get all items stored in the DB
    getItems: (req, res) => {
            var query = Item.find({})

            var last = req.params.last;

            if(last || last != undefined){
                query.limit(5);
            }

            query.sort('-_id').exec((err, items)=>{

                if(err){
                    return res.status(500).send({
                        status:'error',
                        message:'error al devolver los productos'
                    });
                }


                if(!items){
                    return res.status(404).send({
                        status: 'error',
                        message:'no hay productos que mostrar!!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    items
                });

            });
    },


    // get a specific item
    getItem: (req, res) =>{

        //get the id through the url

        var itemId = req.params.id;


        // verify if the item exist

        if(!itemId || itemId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'el producto no existe!!'
            });
        }

        //search the item

        Item.findById(itemId,(err,item) =>{

            if(err || !item){
                return res.status(404).send({
                    status: 'error',
                    message: 'el producto no existe'
                });
            }

            // Return the item

            return res.status(200).send({
                status: 'success',
                item
            });
        });



    },

    // Update a specific item

    update: (req,res ) =>{

        //get the id through the URL

        var itemId = req.params.id;

        //get the data that arrives by put

        var params =req.body;

        // validate the data

        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_category = !validator.isEmpty(params.category);
            var validate_price = !validator.isEmpty(params.price);
            var validate_brand = !validator.isEmpty(params.brand);
            var validate_description = !validator.isEmpty(params.description);
        }catch(err){
            return res.status(404).send({
                status: 'error',
                message: 'faltan datos por enviar!'
            });

        }

        if(validate_name && validate_category && validate_price && validate_brand && validate_description)
        {
           
            // Find and update
            Item.findByIdAndUpdate({_id: itemId}, params, {new:true}, (err, itemUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar!!'
                    });
                }

                if(!itemUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el producto'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    itemUpdated
                });
            });



        }else{
            return res.status(200).send({
                status: 'success',
                message: 'la validación no ha sido correcta!'
            });
        }

    },

    delete: (req, res) =>{

        // get the item id through URL

        var itemId = req.params.id;

        // Find and delete

        Item.findOneAndDelete({_id: itemId}, (err, itemRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borra!!'
                });

            }

            if(!itemRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'El producto no existe'
                });

            }

            return res.status(200).send({
                status: 'success',
                item: itemRemoved
            });
        });

    },

}//End controller

module.exports = controller;