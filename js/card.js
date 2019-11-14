'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var houseTypeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var removeCard = function () {
    var currentCard = document.querySelector('.popup');

    if (currentCard) {
      var photos = currentCard.querySelectorAll('.popup__photo');
      var photosContainer = currentCard.querySelector('.popup__photos');
      photos.forEach(function (photo) {
        photosContainer.removeChild(photo);
      });
      window.map.mapClass.removeChild(currentCard);
    }
  };

  var deactivatePin = function () {
    var activePin = window.map.mapClass.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  var onButtonCloseClick = function () {
    deactivatePin();
    removeCard();
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      deactivatePin();
      removeCard();
    }
  };

  /*
   * Добавляет <img> в разметку
   * @param {node} - HTML node
   */

  var renderPhotos = function (data, node) {
    var divPhotos = node.querySelector('.popup__photos');
    for (var j = 1; j < data.offer.photos.length; j++) {
      var newImg = divPhotos.querySelector('.popup__photo').cloneNode(true);
      newImg.src = data.offer.photos[j];
      divPhotos.appendChild(newImg);
    }
  };

  /**
   * Отрисовывает объявления на основе данных из массива объявлений
   * @param {Array} adsItem - одно объявление из массива объявлений, полученного функцией generateAds
   */

  var renderCards = function (adsItem) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    var cardNode = cardTemplate.cloneNode(true);
    var cardClose = cardNode.querySelector('.popup__close');

    cardClose.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onEscPress);

    renderPhotos(adsItem, cardNode);

    cardNode.querySelector('.popup__avatar').src = adsItem.author.avatar;
    cardNode.querySelector('.popup__title').textContent = adsItem.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = adsItem.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = adsItem.offer.price + '₽/ночь';
    cardNode.querySelector('.popup__type').textContent = houseTypeMap[adsItem.offer.type];
    cardNode.querySelector('.popup__text--capacity').textContent = adsItem.offer.rooms + ' комнаты для ' + adsItem.offer.guests + ' гостей';
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsItem.offer.checkin + ', ' + 'выезд до ' + adsItem.offer.checkout;
    cardNode.querySelector('.popup__features').textContent = adsItem.offer.features;
    cardNode.querySelector('.popup__description').textContent = adsItem.offer.description;
    cardNode.querySelector('.popup__photo').src = adsItem.offer.photos[0];

    window.map.mapClass.appendChild(cardNode);
  };

  window.card = {
    removeCard: removeCard,
    renderCards: renderCards,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
