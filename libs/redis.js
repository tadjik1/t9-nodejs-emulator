'use strict';

var redis = require("redis"),
    log = require('libs/log')(module),
    config = require('config');

var client = redis.createClient(config.get("redis:port"), config.get("redis:host"));

client.on('ready', function () {
    log.info('redis ready');
});

client.on('connect', function () {
    log.info('redis successfully connect to' + config.get("redis:host") + ':' + config.get("redis:port"));
});

client.on('error', function (err) {
    log.info('redis error', err);
});

client.on('end', function (err) {
    log.info('redis error', end);
});

module.exports = client;