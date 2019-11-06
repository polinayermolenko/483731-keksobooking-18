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

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardNode = cardTemplate.cloneNode(true);
  var cardClose = cardNode.querySelector('.popup__close');

  var closePopup = function (popup) {
    /* popup.classList.add('hidden');*/
    window.map.mapClass.removeChild(popup);
  };

  var clickCloseButton = function (setupClose, popup) {
    setupClose.addEventListener('click', function () {
      closePopup(popup);
    });
  };

  var pressEsc = function (setupClose, popup) {
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
  var addPhotos = function (node, data) {
    var divPhotos = node.querySelector('.popup__photos');
    for (var j = 1; j < data.offer.photos.length; j++) {
      var newImg = document.createElement('img');
      newImg.classList.add('popup__photo');
      newImg.width = '55px';
      newImg.height = '40px';
      newImg.src = data.offer.photos[j];
      divPhotos.appendChild(newImg);
    }
  };

  /**
   * Отрисовывает объявления на основе данных из массива объявлений
   * @param {Array} adsItem - одно объявление из массива объявлений, полученного функцией generateAds
   */

  var renderCards = function (adsItem) {
    clickCloseButton(cardClose, cardNode);
    pressEsc(cardClose, cardNode);

    if (adsItem.length) {
      adsItem = adsItem[0];
    }

    addPhotos(cardNode, adsItem);

    cardNode.querySelector('.popup__avatar').src = adsItem.author.avatar;
    cardNode.querySelector('.popup__title').textContent = adsItem.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = adsItem.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = adsItem.offer.price + '₽/ночь';
    cardNode.querySelector('.popup__type').textContent = houseTypes[adsItem.offer.type];
    cardNode.querySelector('.popup__text--capacity').textContent = adsItem.offer.rooms + ' комнаты для ' + adsItem.offer.guests + ' гостей';
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsItem.offer.checkin + ', ' + 'выезд до ' + adsItem.offer.checkout;
    cardNode.querySelector('.popup__features').textContent = adsItem.offer.features;
    cardNode.querySelector('.popup__description').textContent = adsItem.offer.description;
    cardNode.querySelector('.popup__photo').src = adsItem.offer.photos[0];

    window.map.mapClass.appendChild(cardNode);
  };
  window.card = {
    renderCards: renderCards,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    cardTemplate: cardTemplate,
    cardNode: cardNode
  };
})();
