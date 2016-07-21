var BSON = require('bson').BSONPure;
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
//var createModel = require('./createModel');
var _ = require('underscore');

/*
 * open a database connection
 */
db = new Db('birds', new Server('localhost', '27017', {
	auto_reconnect: true
}, {}));

db.open(function(err, collection) {
	if (err) {
		return console.dir(err);
	}

	db.collection('birds', {
		strict: true
	}, function(err, collection) {
		if (err) {
			//console.log("The 'birds' collection doesn't exist. Creating it with sample data...");
			//createModel();
		}
	});
});

/*
 * find and return all visible birds as a body of json
 */
exports.findAll = function(req, res) {
	db.collection('birds', function(err, collection) {
		if (err) {
			return next(err);
		}

		collection.find({
			visible: true
		}).toArray(function(err, result) {
			res.json(result);
		});
	});
};

/*
 * find a specific bird
 */
exports.findOne = function(req, res) {
	db.collection('birds', function(err, collection) {
		if (err) {
			return next(err);
		}
		//Såna här sjuk grejer fastnade jag på, vad är BSON.ObjectID?!?! Va?!? Va?!?
		collection.findOne({
			'_id': new BSON.ObjectID(req.params.id)
		}, function(err, result) {
			if (err) {
				return next(err);
			}
			if (result == null) {
				res.status(404);
				var err = new Error('Not Found, zhe börd: ' + req.params.id);
				err.status = 404;
				res.json({
					message: err.status + ' ' + err
				});
			} else {
				res.json(result);
			}
		});
	});
};

/*
 * add a bird, look for which parameters are included, add the non mandatory ones
 * check if others are correct (only continents)
 */
exports.addOne = function(req, res) {
	if (req.body.added == null)
		req.body.added = new Date().toISOString().slice(0, 10);
	if (req.body.visible == null)
		req.body.visible = false;
	
	continents = _.uniq(req.body.continents).length;
	if(continents < req.body.continents.length) {
		res.sendStatus(400);
	} else {
		db.collection('birds', function(err, collection) {
			if (err) {
				return next(err);
			}
			collection.insert(req.body, {}, function(err, result) {
				if (err) {
					return next(err);
				}
				//res.status = 201;
				res.status(201).send(req.body);
			});
		});
	}
};

/*
 * delete a specific bird
 */
exports.deleteOne = function(req, res) {
	db.collection('birds', function(err, collection) {
		if (err) {
			return next(err);
		}
		collection.deleteOne({
			_id: new BSON.ObjectID(req.params.id)
		}, function(err, result) {
			if (err) {
				return next(err);
			}
			res.status = 200;
			res.send();
		});
	});
};