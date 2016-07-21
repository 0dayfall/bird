var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

BirdProvider = function(host, port) {
	this.db = new Db('bird', new Server(host, port, {
		auto_reconnect: true
	}, {}));
	this.db.open(function() {});
};

BirdProvider.prototype.getCollection = function(callback) {
	this.db.collection('birds', function(error, article_collection) {
		if (error) callback(error);
		else callback(null, article_collection);
	});
};

BirdProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, article_collection) {
		if (error) callback(error)
		else {
			article_collection.find().toArray(function(error, results) {
				if (error) callback(error)
				else callback(null, results)
			});
		}
	});
};


BirdProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, article_collection) {
		if (error) callback(error)
		else {
			article_collection.findOne({
				_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)
			}, function(error, result) {
				if (error) callback(error)
				else callback(null, result)
			});
		}
	});
};

BirdProvider.prototype.save = function(articles, callback) {
	this.getCollection(function(error, article_collection) {
		if (error) callback(error)
		else {
			if (typeof(articles.length) == "undefined")
				articles = [articles];

			for (var i = 0; i < articles.length; i++) {
				article = articles[i];
				article.created_at = new Date();
				if (article.comments === undefined) article.comments = [];
				for (var j = 0; j < article.comments.length; j++) {
					article.comments[j].created_at = new Date();
				}
			}

			article_collection.insert(articles, function() {
				callback(null, articles);
			});
		}
	});
};

/* Lets bootstrap with dummy data */
new BirdProvider().save([{
	name: 'Trast',
	family: 'Trastar',
	continents: ['Africa', 'Europa'
	},
	added: new Date(),
	visible: true
}]
}, {
name: 'Sparv',
family: 'Sparvar',
continents: ['USA', 'Mexico'
},
added: new Date(),
visible: false
}]
}, {
	name: 'Örn',
	family: 'Örnar',
	continents: ['Kina', 'Ryssland'
	},
	added: new Date(),
	visible: true
}]
},
],
function(error, articles) {});


exports.BirdProvider = BirdProvider;