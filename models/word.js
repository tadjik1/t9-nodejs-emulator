'use strict';

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = Schema({
    lemma: String,
    pos: String,
    freq: Number,
    r: Number,
    d: Number,
    doc: Number
});

exports.Word = mongoose.model('Word', schema);