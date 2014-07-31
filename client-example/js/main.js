window.onerror = function () {
    console.warn(arguments);
};

$(function () {
    var socket = io.connect('http://localhost:3000');

    var currLang = 'en';
    var currentWord = '';
    var currentPredictions = [];
    var currentPredictionsIndex = 0;
    var num = '';

    function getWords (word) {
        socket.emit('question', { text: word, lang: currLang });
    };

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('answer', function (words) {
        currentPredictions = words;
        currentPredictionsIndex = 0;
        if(currentPredictions.length > 0){
            $('.current-text').text(currentPredictions[0]);
        }
        else {
            $('.current-text').text($('.current-text').text() + num);
        }
    });

    $('button.key').on('click', function(event){
        var value = $(this).val();
        if(value == 'space'){
            currentWord = '';
            currentPredictions = [];
            currentPredictionsIndex = 0;
            var previousText = $('.prev-text').text() + ' ' + $('.current-text').text() + ' ';
            $('.prev-text').text(previousText);
            $('.current-text').text('');
        }

        if(isNaN(parseInt(value)))
            return;

        currentWord += value;
        num = value;

        getWords(currentWord);
    });

    $('.controller .prediction-cycle').on('click', function(event){
        if(currentPredictions.length > 0){
            if (++currentPredictionsIndex >= currentPredictions.length)
                currentPredictionsIndex = 0;

            $('.current-text').text(currentPredictions[currentPredictionsIndex]);
        }
    });

    $('.controller .lang').on('click', function(event){
        var lang = currLang === 'en' ? 'ru' : 'en';

        $('.keypad.' + currLang).hide();
        $('.keypad.' + lang).show();

        currLang = lang;

        $('.controller .lang').text('lang:' + currLang);
    });

    $('.controller .delete').on('click', function(event){
        if(currentWord == ''){
            var previousText = $('.prev-text').text();
            previousText = previousText.slice(0, previousText.length-1);
            $('.prev-text').text(previousText);
            return;
        }

        currentWord = currentWord.slice(0, currentWord.length-1);
        getWords(currentWord);

    });


});