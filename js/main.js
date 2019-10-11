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

var createImg = function (imgNumber) {
  var divPhotos = document.querySelectorAll('.popup__photos');
  for (var i = 0; i < divPhotos.length; i++) {
    for (var j = 1; j <= imgNumber; j++) {
      var newImg = '<img src=' + PHOTOS[j] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      divPhotos[i].insertAdjacentHTML('afterbegin', newImg);
    }
  }
};

/**
 * Отрисовывает объявления на основе данных из массива объявлений
 * @param {Array} adsArray - массив объявлений полученный функцией generateAds
 */

var renderCards = function (adsArray) {
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = adsArray[i].offer.title;
    card.querySelector('.popup__text--address').textContent = adsArray[i].offer.address;
    card.querySelector('.popup__text--price').textContent = adsArray[i].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HouseTypes[adsArray[i].offer.type];
    card.querySelector('.popup__text--capacity').textContent = adsArray[i].offer.rooms + ' комнаты для ' + adsArray[i].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArray[i].offer.checkin + ', ' + 'выезд до ' + adsArray[i].offer.checkout;
    card.querySelector('.popup__features').textContent = adsArray[i].offer.features;
    card.querySelector('.popup__description').textContent = adsArray[i].offer.description;
    card.querySelector('.popup__photo').src = PHOTOS[0];
    card.querySelector('.popup__avatar').src = adsArray[i].author.avatar;
    cardFragment.appendChild(card);
  }
  map.appendChild(cardFragment);
};

var addressInput = document.querySelector('input[name=address]');
addressInput.setAttribute('readonly', 'readonly');

var xMuffin = parseInt(document.querySelector('.map__pin--main').style.left, 10);
var yMuffin = parseInt(document.querySelector('.map__pin--main').style.top, 10);

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

var removeClassMapFaded = function () {
  map.classList.remove('map--faded');
};

var adForm = document.querySelector('.ad-form');

var removeClassDisabled = function () {
  adForm.classList.remove('ad-form--disabled');
};

var fieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', 'disabled');
}

var removeAttributeDisabled = function () {
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].removeAttribute('disabled');
  }
};

var onButtonPress = function () {
  removeAttributeDisabled();
  renderPins(generateAds(ADVERTISMENT_NUMBER));
  renderCards(generateAds(ADVERTISMENT_NUMBER));
  createImg(2);
  removeClassMapFaded();
  removeClassDisabled();
  setAddress(xMuffin, yMuffin);
  mapPinMain.removeEventListener('mousedown', onButtonPress);
};

var onButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    removeAttributeDisabled();
    renderPins(generateAds(ADVERTISMENT_NUMBER));
    renderCards(generateAds(ADVERTISMENT_NUMBER));
    createImg(2);
    removeClassMapFaded();
    removeClassDisabled();
    setAddress(xMuffin, yMuffin);
    mapPinMain.removeEventListener('keydown', onButtonEnterPress);
  }
};

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', onButtonPress);

mapPinMain.addEventListener('keydown', onButtonEnterPress);
