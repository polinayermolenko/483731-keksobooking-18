'use strict';

var ADVERTISMENT_NUMBER = 8;
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1200;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var TITLE = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3'];
var PRICE = [100, 230, 550, 680];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 10, 15];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание 1', 'Описание 2', 'Описание 3'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var houseTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
/**
 *Генерирует случайную координату метки по оси х в заданном диапазоне чисел
 *@param {number} minLocation - минимальное значение
 *@param {number} maxLocation - максимальное значение
 *@return {number} - случайная координата метки по оси х
*/
var generateLocationX = function (minLocation, maxLocation) {
  var locationX = minLocation + Math.round(Math.random() * maxLocation);
  return locationX;
};

/**
 *Генерирует случайную координату метки по оси y в заданном диапазоне чисел
 *@param {number} minLocation - минимальное значение
 *@param {number} maxLocation - максимальное значение
 *@return {number} - случайная координата метки по оси y
*/
var generateLocationY = function (minLocation, maxLocation) {
  var locationY = minLocation + Math.round(Math.random() * (maxLocation - minLocation));
  return locationY;
};

/**
 *Выбирает случайный элемент массива
 *@param {Array} array - исходный массив
 *@return {*} - случайный элемент массива
*/
var getArrayElement = function (array) {
  var elementIndex = Math.round((Math.random() * (array.length - 1)));
  var randomElement = array[elementIndex];
  return randomElement;
};

/**
*Генирурует путь до аватара пользователя
*@param {number} number - число, входящее в название фотографии
*@return {String} - путь до аватара
*/
var generateAvatar = function (number) {
  var avatar = 'img/avatars/user0' + number + '.png';
  return avatar;
};

/**
*Генерирует текст объявления
*@param {Array} title - массив заголовков объявления
*@param {number} minX - минимальное значение координаты x
*@param {number} maxX - максимальное значение координаты x
*@param {number} minY - минимальное значение координаты y
*@param {number} maxY - максимальное значение координыты y
*@param {Array} price - массив цен
*@param {Array} type - массив типов домов
*@param {Array} rooms - массив с количеством комнат
*@param {Array} guests - массив с количеством гостей
*@param {Array} checkin - массив с временем заселения
*@param {Array} checkout - массив с временем выселения
*@param {Array} features - массив с удобствами проживания
*@param {Array} description - массив с описанием жилья
*@param {Array} photos - массив с фото
*@return {Object} - текст объявления
*/
var generateOffer = function (title, minX, maxX, minY, maxY, price, type, rooms, guests, checkin, checkout, features, description, photos) {
  var offer = {
    'title': getArrayElement(title),
    'address': generateLocationX(minX, maxX) + ', ' + generateLocationY(minY, maxY),
    'price': getArrayElement(price),
    'type': getArrayElement(type),
    'rooms': getArrayElement(rooms),
    'guests': getArrayElement(guests),
    'checkin': getArrayElement(checkin),
    'checkout': getArrayElement(checkout),
    'features': getArrayElement(features),
    'description': getArrayElement(description),
    'photos': getArrayElement(photos)
  };
  return offer;
};

/**
 *Генерирует объявления
 *@param {number} adsNumber - количество необходимых объявлений
 *@return {Array} - массив объявлений
*/
var generateAds = function (adsNumber) {
  var array = [];
  for (var i = 1; i <= adsNumber; i++) {
    var advertisement = {
      'author': {
        'avatar': generateAvatar(i)
      },
      'offer': generateOffer(TITLE, MIN_LOCATION_X, MAX_LOCATION_X, MIN_LOCATION_Y, MAX_LOCATION_Y, PRICE, TYPE, ROOMS, GUESTS, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS),
      'location': {
        'x': generateLocationX(MIN_LOCATION_X, MAX_LOCATION_X),
        'y': generateLocationY(MIN_LOCATION_Y, MAX_LOCATION_Y)
      }
    };
    array.push(advertisement);
  }
  return array;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

/**
*Отрисовывает метки на основе данных из массива объявлений
*@param {Array} adsArray - массив объявлений полученный функцией generateAds
*/
var renderPins = function (adsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (adsArray[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (adsArray[i].location.y - PIN_HEIGHT) + 'px;';
    var pinImage = pin.querySelector('img');
    pinImage.src = adsArray[i].author.avatar;
    pinImage.alt = adsArray[i].offer.title;
    fragment.appendChild(pin);
  }
  mapPin.appendChild(fragment);
};

renderPins(generateAds(ADVERTISMENT_NUMBER));

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
*Отрисовывает объявления на основе данных из массива объявлений
*@param {Array} adsArray - массив объявлений полученный функцией generateAds
*/
var renderCards = function (adsArray) {
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = adsArray[i].offer.title;
    card.querySelector('.popup__text--address').textContent = adsArray[i].offer.address;
    card.querySelector('.popup__text--price').textContent = adsArray[i].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = houseTypes[adsArray[i].offer.type];
    card.querySelector('.popup__text--capacity').textContent = adsArray[i].offer.rooms + ' комнаты для ' + adsArray[i].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArray[i].offer.checkin + ', ' + 'выезд до ' + adsArray[i].offer.checkout;
    card.querySelector('.popup__features').textContent = adsArray[i].offer.features;
    card.querySelector('.popup__description').textContent = adsArray[i].offer.description;
    card.querySelector('.popup__photo').src = adsArray[i].offer.photos;
    card.querySelector('.popup__avatar').src = adsArray[i].author.avatar;
    cardFragment.appendChild(card);
  }
  map.appendChild(cardFragment);
};

renderCards(generateAds(ADVERTISMENT_NUMBER));
