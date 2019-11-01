'use strict';

(function () {
  var LocationMap = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  /*
  var TITLES = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5'];*/
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  /**
  * Выбирает случайное целое число в заданном интервале чисел
  * @param {number} min - минимальная граница диапазона чисел
  * @param {number} max - максимальная граница диапазона чисел
  * @return {number} - случайное целое число
  */
  /* var generateRandomNumberFromRange = function (min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
  };*/

  /**
   * Выбирает случайный элемент массива
   * @param {Array} array - исходный массив
   * @return {*} - случайный элемент массива
   */
  /*  var getArrayElement = function (array) {
    var elementIndex = Math.round((Math.random() * (array.length - 1)));
    var randomElement = array[elementIndex];
    return randomElement;
  };*/

  /**
   * Генерирует объявления
   * @param {number} adsNumber - количество необходимых объявлений
   * @return {Array} - массив объявлений
   */
  /*  var generateAds = function (adsNumber) {
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

  var ads = generateAds(ADVERTISMENT_NUMBER);*/

  window.data = {
    /*  ads: ads,*/
    PHOTOS: PHOTOS,
    locationMap: LocationMap
  };

  /*  var onSuccess = function (data) {
    var advsa = data;
    console.log(advsa);
  };

   var onError = function (message) {
    console.error(message);
  };*/

})();
