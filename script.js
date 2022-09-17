var timer;
var stop = false;
var number;
var count = 0;

function ping() {
    count = 0;
    timer = undefined;
    stop = false;

    let url = $('#url').val();
    let i = url.indexOf('http');

    if (i == -1) {
        $('#pop-up').fadeIn(500);
        stop = true;
    } else {
        number = $('#number').val();
        if (number.length == 0) {
            number = undefined;
        } else {
            $('#test').css("display", "flex").hide().fadeIn(500);
        }
        $('#result').css("display", "flex").hide().fadeIn(500);
        $('#stop-button').fadeIn(500);
        setTime($('#inter').val());
    }
}

function setTime(time) {
    if (time == undefined || time < 1000) {
        time = 1000;
    }
    timer = setInterval(test, time);
}

function test() {
    if (stop == false && (count < number || number == undefined)) {
        let adress = $('#url').val();
        pinging(adress).then(function (result) {
            $('#ping').html(result + " ms");
            if (number != undefined) $('#count').html(count);
        });
        count++;
        if (count == number) {
            stop = true;
        }
    }
}

var request_image = function (url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject(url);
        };
        img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);

    });
};


var pinging = function (url, multiplier) {
    return new Promise(function (resolve, reject) {
        var start = (new Date()).getTime();
        var response = function () {
            var diff = ((new Date()).getTime() - start);
            diff *= (multiplier || 1);
            resolve(diff);
        };

        request_image(url).then(response).catch(response);
        setTimeout(function () {
            reject(Error('Timeout'));
        }, 5000);
    });
};


var inputUrl = document.getElementById('url');
var inputInter = document.getElementById('inter');
var inputNumber = document.getElementById('number');
var stop = document.getElementById('stop-button');

inputUrl.addEventListener('click', function () {
    $('#result').css("display", "none").hide().fadeOut(500);
    $('#pop-up').fadeOut(500);
    $('#test').fadeOut(500);
    $('#stop-button').fadeOut(500);

});
inputInter.addEventListener('click', function () {
    $('#result').fadeOut(500);
    $('#pop-up').fadeOut(500);
    $('#test').fadeOut(500);
    $('#stop-button').fadeOut(500);

});
inputNumber.addEventListener('click', function () {
    $('#result').fadeOut(500);
    $('#pop-up').fadeOut(500);
    $('#test').fadeOut(500);
    $('#stop-button').fadeOut(500);
});

stop.addEventListener('click', function () {
    stop = true;
});