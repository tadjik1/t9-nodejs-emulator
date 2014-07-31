'use strict';

var log = require('libs/log')(module);
var async = require('async');
var fs = require('fs');
var tree = require('app/tree');

var loadDocs = function (doc, cb) {
    fs.readFile(doc.src, 'utf8', function(err, data) {
        if (err) {
            log.error(err);
            cb(err);
        }
        log.info('OK: ' + doc.src);
        tree.makeTree(data, doc.lang, app);
        cb();
    });
};

var app = {};

app.init = function () {
    this._buildTrees();
    log.info('app start');
};

app._buildTrees = function () {
    var docs = [{
            src: 'dictionaries/ru.txt',
            lang: 'ru'
        },
        {
            src: 'dictionaries/en.txt',
            lang: 'en'
        }];

    async.each(docs, loadDocs, function (err) {
        if (err) {
            log.error(err);
        }

        log.info('trees created');
    });
};

app.findWords = function (text, lang) {
    return tree.findWords(text, lang);
};

module.exports = app;