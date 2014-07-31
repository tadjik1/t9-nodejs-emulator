'use strict';

var mainTree = {
    en: {
        keyMap: {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'pqrs',
            8: 'tuv',
            9: 'wxyz'
        },
        tree: null
    },
    ru: {
        keyMap: {
            2: 'абвг',
            3: 'дежз',
            4: 'ийкл',
            5: 'мноп',
            6: 'рсту',
            7: 'фхцч',
            8: 'шщъы',
            9: 'ьэюя'
        },
        tree: null
    }
};

mainTree.makeTree = function (data, lang) {
    var words = data.split(/\s+/g);
    var currTree = {};

    // https://github.com/jrolfs/javascript-trie-predict/blob/master/predict.js
    words.forEach(function (word) {
        var letters = word.split('');
        var leaf = currTree;

        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i].toLowerCase();
            var existing = leaf[letter];
            var last = (i === letters.length - 1);

            // If child leaf doesn't exist, create it
            if (typeof(existing) === 'undefined') {
                // If we're at the end of the word, mark with number, don't create a leaf
                leaf = leaf[letter] = last ? 1 : {};

                // If final leaf exists already
            } else if (typeof(existing) === 'number') {
                // Increment end mark number, to account for duplicates
                if (last) {
                    leaf[letter]++;

                    // Otherwise, if we need to continue, create leaf object with '$' marker
                } else {
                    leaf = leaf[letter] = { $: existing };
                }

                // If we're at the end of the word and at a leaf object with an
                // end '$' marker, increment the marker to account for duplicates
            } else if (typeof(existing) === 'object' && last) {
                if (existing.hasOwnProperty('$')) {
                    leaf[letter].$++;
                } else {
                    leaf[letter] = existing;
                    leaf[letter].$ = 1;
                }

                // Just keep going
            } else {
                leaf = leaf[letter];
            }
        }
    });

    this[lang].tree = currTree;
};

mainTree.findWords = function (query, lang) {
    return this._findWords(query, this[lang].tree, lang);
};

mainTree._findWords = function (sequence, tree, lang, words, currentWord, depth) {
    var current = tree;

    words = words || [];
    currentWord = currentWord || '';
    depth = depth || 0;

    if (depth === sequence.length) {
        words.push(currentWord);
    } else {
        var letters = mainTree[lang].keyMap[sequence.charAt(depth)].split('');

        for (var i = 0; i < letters.length; i++) {
            var word = currentWord;
            var value = current[letters[i]];

            word += letters[i];

            if (typeof value === 'number' && word.length === sequence.length) {
                words.unshift(word);
            }

            if (typeof value === 'object') {
                mainTree._findWords(sequence, value, lang, words, word, depth + 1);
            }
        }
    }

    return words;
};

module.exports = mainTree;