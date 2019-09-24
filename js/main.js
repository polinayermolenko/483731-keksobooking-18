'use strict';

var ADVERTISMENT_NUMBER = 8;
var MAX_LOCATION_X = 1150;
var MIN_LOCATION_Y = 100;
var MAX_LOCATION_Y = 530;

var generateArray = function (number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    var avatar = {
      'avatar': 'img/avatars/user0' + Math.floor(Math.random() * ADVERTISMENT_NUMBER + 1) + '.png'
    };

    var location = {
      'x': Math.round(Math.random() * MAX_LOCATION_X),
      'y': MIN_LOCATION_Y + Math.round(Math.random() * MAX_LOCATION_Y)
    };

    var advertisement = {
      'author': avatar,
      'location': location
    };
    array.push(advertisement);
  }
  return array;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + array[i]['location']['x'] + 'px; top: ' + array[i]['location']['y'] + 'px;';
    var pinImage = pin.querySelector('img');
    pinImage.src = array[i]['author']['avatar'];
    fragment.appendChild(pin);
  }
  mapPin.appendChild(fragment);
};

renderPins(generateArray(ADVERTISMENT_NUMBER));

