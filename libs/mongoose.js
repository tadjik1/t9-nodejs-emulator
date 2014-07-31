'use strict';

var mongoose = require('mongoose');
var config = require('config');
var log = require('libs/log')(module);

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    log.info('Mongoose default connection open to ' + config.get('mongoose:uri'));
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    log.info('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    log.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        log.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;