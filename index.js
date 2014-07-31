'use strict';

var config = require('config');
var log = require('libs/log')(module);

//require('libs/mongoose');
//require('libs/redis');

var app = require('app');


var server = require('socket');

server.start(config.get("server:port"), function (err) {
    if (err) {
        log.error('server not started', err);
    }
    app.init();
    log.info('server start successfully');
});