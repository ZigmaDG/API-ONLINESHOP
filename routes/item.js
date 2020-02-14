'use strict'

var express = require('express');
var ItemController = require('../controllers/item');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/items'});


// useful Routes

router.post('/save', ItemController.save);
router.get('/products/:last?', ItemController.getItems);
router.get('/product/:id', ItemController.getItem);
router.put('/product/:id', ItemController.update);
router.delete('/product/:id', ItemController.delete);
router.post('/upload-image/:id', md_upload, ItemController.upload);
router.get('/get-image/:image', ItemController.getImage);
router.get('/search/:search', ItemController.search);

module.exports = router;