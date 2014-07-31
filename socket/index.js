'use strict';

var log = require('libs/log')(module);
var app = require('app');
var util = require('util');

var socket = {};

var totalCount = 0;

// total: ms
var statistics = {};

var counter = 0;
var totalCounter = 0;

socket.start = function (port, cb) {
    var io = require('socket.io')(port);

    io.on('connection', function (socket) {
        totalCount++;
        socket.on('question', function (data) {
            counter++;
            totalCounter++;

            if (counter === 1000) {
                console.time('question start');
                var now = new Date();
            }

            var words;
            if (!/\D|1/ig.test(data.text)) {
                words = app.findWords(data.text, data.lang);
            } else {
                words = [];
            }

            if (counter === 1000) {
                log.info(util.inspect(process.memoryUsage()));
                log.info("Total Count: " + totalCount);
                console.timeEnd('question start');
                log.info('Total requests is: ' + totalCounter);
                var end = new Date();
                statistics[totalCounter] = end - now;
                console.log(statistics);
                counter = 0;
            }

            socket.emit('answer', words);
        });

        socket.on('disconnect', function () {
            totalCount--;
        });

        socket.on('error', function (err) {
            console.log(err);
        });
    });

    cb(null);
};


module.exports = socket;