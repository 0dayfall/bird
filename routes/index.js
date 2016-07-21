var express = require('express');
var router = express.Router();

var BSON = require('bson').BSONPure;
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var createModel = require('../model/createModel');
var birds = require('../model/birds');

//createModel();

router.get('/', function(req, res) {
  res.send('Stekta sparvar.. GET /birds')
});

router.get('/birds', birds.findAll);
router.get('/birds/:id', birds.findOne);
router.post('/birds', birds.addOne);
router.delete('/birds/:id', birds.deleteOne);

module.exports = router;