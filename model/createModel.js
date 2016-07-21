var mongoClient = require('mongodb').MongoClient;
var db = require('mongodb').Db;
var connection = require('mongodb').Connection;
var server = require('mongodb').Server;

var createModel = function() {

    var birds = [{
        name: "Trast",
        family: "Fågel",
        continents: ['Africa', 'Europa'],
        added: new Date().toISOString().slice(0, 10),
        visible: true
    }, {
        name: 'Sparv',
        family: 'Sparvar',
        continents: ['USA', 'Mexico'],
        added: new Date().toISOString().slice(0, 10),
        visible: false
    }, {
        name: 'Örn',
        family: 'Örnar',
        continents: ['Kina', 'Ryssland'],
        added: new Date().toISOString().slice(0, 10),
        visible: true
    }];

    mongoClient.connect("mongodb://localhost:27017/birds", function(err, db) {
        if (err) {
            return console.dir(err);
        }

        db.collection('birds', function(err, collection) {
            if (err) {
                return console.dir(err);
            }

            collection.insert(birds, function(err, result) {
                if (err) {
                    return console.dir(err);
                }
            });
        });

    });
};

module.exports = createModel;