'use strict';

var ADVERTISMENT_NUMBER = 8;
var ENTER_KEYCODE = 13;
var LocationMap = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630
};

var Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

var MainPin = {
  WIDTH: 40,
  HEIGHT: 44,
  POINTER: 22
};

var TITLES = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var HouseTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var mapPinMain = document.querySelector('.map__pin--main');

var generateRandomNumberFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Выбирает случайный элемент массива
 * @param {Array} array - исходный массив
 * @return {*} - случайный элемент массива
 */
var getArrayElement = function (array) {
  var elementIndex = Math.round((Math.random() * (array.length - 1)));
  var randomElement = array[elementIndex];
  return randomElement;
};

/**
 * Генерирует объявления
 * @param {number} adsNumber - количество необходимых объявлений
 * @return {Array} - массив объявлений
 */

var generateAds = function (adsNumber) {
  var array = [];
  for (var i = 1; i <= adsNumber; i++) {
    var x = generateRandomNumberFromRange(LocationMap.MIN_X, LocationMap.MAX_X);
    var y = generateRandomNumberFromRange(LocationMap.MIN_Y, LocationMap.MAX_Y);
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: getArrayElement(TITLES),
        address: x + ', ' + y,
        price: generateRandomNumberFromRange(100, 1000),
        type: getArrayElement(TYPES),
        rooms: generateRandomNumberFromRange(1, 100),
        guests: generateRandomNumberFromRange(1, 20),
        checkin: getArrayElement(CHECKINS),
        checkout: getArrayElement(CHECKOUTS),
        features: getArrayElement(FEATURES),
        description: getArrayElement(DESCRIPTIONS),
        photos: PHOTOS,
      },
      location: {
        x: x,
        y: y
      }
    };
    array.push(advertisement);
  }
  return array;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var ads = generateAds(ADVERTISMENT_NUMBER);

/**
 * Отрисовывает метки на основе данных из массива объявлений
 * @param {Array} adsArray - массив объявлений полученный функцией generateAds
 */

var renderPins = function (adsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (adsArray[i].location.x - Pin.WIDTH / 2) + 'px; top: ' + (adsArray[i].location.y - Pin.HEIGHT) + 'px;';
    var pinImage = pin.querySelector('img');
    pinImage.src = adsArray[i].author.avatar;
    pinImage.alt = adsArray[i].offer.title;
    fragment.appendChild(pin);
  }
  mapPin.appendChild(fragment);
};

/**
 * Отрисовывает объявления на основе данных из массива объявлений
 * @param {Array} adsArray - массив объявлений полученный функцией generateAds
 */

var renderCards = function (adsArray) {
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = adsArray[i].author.avatar;
    card.querySelector('.popup__title').textContent = adsArray[i].offer.title;
    card.querySelector('.popup__text--address').textContent = adsArray[i].offer.address;
    card.querySelector('.popup__text--price').textContent = adsArray[i].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HouseTypes[adsArray[i].offer.type];
    card.querySelector('.popup__text--capacity').textContent = adsArray[i].offer.rooms + ' комнаты для ' + adsArray[i].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArray[i].offer.checkin + ', ' + 'выезд до ' + adsArray[i].offer.checkout;
    card.querySelector('.popup__features').textContent = adsArray[i].offer.features;
    card.querySelector('.popup__description').textContent = adsArray[i].offer.description;
    card.querySelector('.popup__photo').src = PHOTOS[0];

    var divPhotos = card.querySelector('.popup__photos');
    for (var j = 1; j < PHOTOS.length; j++) {
      var newImg = card.querySelector('.popup__photo').cloneNode(true);
      newImg.src = PHOTOS[j];
      divPhotos.appendChild(newImg);
    }

    cardFragment.appendChild(card);
  }
  map.appendChild(cardFragment);
};

var addressInput = document.querySelector('input[name=address]');
addressInput.setAttribute('readonly', 'readonly');

var xMuffin = parseInt(mapPinMain.style.left, 10);
var yMuffin = parseInt(mapPinMain.style.top, 10);

var setDefaultAddress = function (muffinLocationX, muffinLocationY) {
  var xMuffinInactive = muffinLocationX + MainPin.WIDTH / 2;
  var yMuffinInactive = muffinLocationY + MainPin.HEIGHT / 2;
  addressInput.value = xMuffinInactive + ', ' + yMuffinInactive;
};

setDefaultAddress(xMuffin, yMuffin);

var setAddress = function (muffinLocationX, muffinLocationY) {
  var xMuffinActive = muffinLocationX + MainPin.WIDTH / 2;
  var yMuffinActive = muffinLocationY + MainPin.HEIGHT + MainPin.POINTER;
  addressInput.value = xMuffinActive + ', ' + yMuffinActive;
};

var adForm = document.querySelector('.ad-form');

/* если форма в неактивном состоянии, т е при открытии страницы, на всех филдсетах стоит дизэйбл,
   если в активном состоянии, которое наступает после нажатия на кнопку миши или при энтере,
   атрибуты снимаются
*/

var fieldsets = document.querySelectorAll('fieldset');


window.addEventListener('load', function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
});

var activateForm = function () {
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].removeAttribute('disabled');
  }
};

var activatePage = function () {
  activateForm();
  renderPins(ads);
  renderCards(ads);
  setAddress(xMuffin, yMuffin);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

var onButtonPress = function () {
  activatePage();
  mapPinMain.removeEventListener('mousedown', onButtonPress);
};

var onButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
    mapPinMain.removeEventListener('keydown', onButtonEnterPress);
  }
};

mapPinMain.addEventListener('mousedown', onButtonPress);

mapPinMain.addEventListener('keydown', onButtonEnterPress);

var roomsSelect = document.querySelector('#room_number');
var guestsSelect = document.querySelector('#capacity');

roomsSelect.addEventListener('change', function () {
  if (roomsSelect.value === '1' && guestsSelect.value !== '1') {
    guestsSelect.setCustomValidity('для 1 гостя');
  } else if (roomsSelect.value === '2' && (guestsSelect.value === '3' || guestsSelect.value === '0')) {
    guestsSelect.setCustomValidity('для 1 гостя или для 2 гостей');
  } else if (roomsSelect.value === '3' && guestsSelect.value === '0') {
    guestsSelect.setCustomValidity('для 1 гостя, для 2 гостей или для 3 гостей');
  } else if (roomsSelect.value === '100' && guestsSelect.value !== '0') {
    guestsSelect.setCustomValidity('не для гостей');
  } else {
    guestsSelect.setCustomValidity('');
  }
});

guestsSelect.addEventListener('change', function () {
  if (guestsSelect.value === '1' && roomsSelect.value !== '1') {
    guestsSelect.setCustomValidity('для 1 гостя');

  } else if (guestsSelect.value === '2') {
    if (roomsSelect.value === '1') {
      guestsSelect.setCustomValidity('для 1 гостя');
    } else if (roomsSelect.value === '100') {
      guestsSelect.setCustomValidity('не для гостей');
    } else {
      guestsSelect.setCustomValidity('');
    }
  } else if (guestsSelect.value === '3') {
    if (roomsSelect.value === '1') {
      guestsSelect.setCustomValidity('для 1 гостя');
    } else if (roomsSelect.value === '2') {
      guestsSelect.setCustomValidity('для 2 гостей');
    } else if (roomsSelect.value === '100') {
      guestsSelect.setCustomValidity('не для гостей');
    } else {
      guestsSelect.setCustomValidity('');
    }
  } else {
    if (roomsSelect.value === '1') {
      guestsSelect.setCustomValidity('для 1 гостя');
    } else if (roomsSelect.value === '2') {
      guestsSelect.setCustomValidity('для 2 гостей');
    } else if (roomsSelect.value === '3') {
      guestsSelect.setCustomValidity('для 3 гостей');
    } else {
      guestsSelect.setCustomValidity('');
    }
  }
});

