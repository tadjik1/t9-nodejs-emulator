//'use strict';
//
//var rus = require('dictionaries/ru.json');
//var _ = require('underscore');
//var fs = require('fs');
//
//var words = _.pluck(rus, 'lemma').join('\n');
//
//
//fs.writeFile('./dictionaries/ru.txt', words, function (err) {
//    if(err) {
//        console.log(err);
//    } else {
//        console.log("The file was saved!");
//    }
//});