'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var onPinClick = function (pinItem, cardItem) {
    pinItem.addEventListener('click', function () {
      window.card.renderCards(cardItem);
    });
  };

  var onEnterPress = function (pinItem, cardItem) {
    pinItem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ENTER_KEYCODE) {
        window.card.renderCards(cardItem);
      }
    });
  };

  /**
   * Отрисовывает метки на основе данных из массива объявлений
   * @param {Array} adsArray - массив объявлений полученный функцией generateAds
   */
  window.pin = {
    renderPins: function (adsArray) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var mapPin = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < adsArray.length; i++) {
        var pin = pinTemplate.cloneNode(true);
        pin.style = 'left: ' + (adsArray[i].location.x - Pin.WIDTH / 2) + 'px; top: ' + (adsArray[i].location.y - Pin.HEIGHT) + 'px;';
        var pinImage = pin.querySelector('img');
        pinImage.src = adsArray[i].author.avatar;
        pinImage.alt = adsArray[i].offer.title;
        fragment.appendChild(pin);

        onPinClick(pin, adsArray[i]);
        onEnterPress(pin, adsArray[i]);
      }
      mapPin.appendChild(fragment);
    }
  };
})();
