'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var houseTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
  };

  var onButtonCloseClick = function (setupClose, popup) {
    setupClose.addEventListener('click', function () {
      closePopup(popup);
    });
  };

  var onEscPress = function (setupClose, popup) {
    setupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup(popup);
      }
    });
  };

  /*
 * Добавляет <img> в разметку
 * @param {node} - HTML node
 */
  var addPhotos = function (node) {
    var divPhotos = node.querySelector('.popup__photos');
    for (var j = 1; j < window.data.PHOTOS.length; j++) {
      var newImg = node.querySelector('.popup__photo').cloneNode(true);
      newImg.src = window.data.PHOTOS[j];
      divPhotos.appendChild(newImg);
    }
  };

  /**
 * Отрисовывает объявления на основе данных из массива объявлений
 * @param {Array} adsItem - одно объявление из массива объявлений, полученного функцией generateAds
 */

  window.card = {
    renderCards: function (adsItem) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
      var card = cardTemplate.cloneNode(true);
      var cardClose = card.querySelector('.popup__close');

      onButtonCloseClick(cardClose, card);
      onEscPress(cardClose, card);

      addPhotos(card);
      card.querySelector('.popup__avatar').src = adsItem.author.avatar;
      card.querySelector('.popup__title').textContent = adsItem.offer.title;
      card.querySelector('.popup__text--address').textContent = adsItem.offer.address;
      card.querySelector('.popup__text--price').textContent = adsItem.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = houseTypes[adsItem.offer.type];
      card.querySelector('.popup__text--capacity').textContent = adsItem.offer.rooms + ' комнаты для ' + adsItem.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsItem.offer.checkin + ', ' + 'выезд до ' + adsItem.offer.checkout;
      card.querySelector('.popup__features').textContent = adsItem.offer.features;
      card.querySelector('.popup__description').textContent = adsItem.offer.description;
      card.querySelector('.popup__photo').src = window.data.PHOTOS[0];

      window.map.mapClass.appendChild(card);
    },
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
