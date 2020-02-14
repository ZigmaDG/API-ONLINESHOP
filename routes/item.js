'use strict'

var express = require('express');
var ItemController = require('../controllers/item');

var router = express.Router();


// useful Routes

router.post('/save', ItemController.save);
router.get('/products/:last?', ItemController.getItems);
router.get('/product/:id', ItemController.getItem);
router.put('/product/:id', ItemController.update);
router.delete('/product/:id', ItemController.delete);

module.exports = router;