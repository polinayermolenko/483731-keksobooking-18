'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var onPinClick = function (pinItem, cardItem) {
    pinItem.addEventListener('click', function () {

      if (window.map.mapClass.contains(window.cardNode)) {
        window.map.mapClass.removeChild(window.cardNode);
      }
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
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pins');

  var renderPins = function (advertisment) {
    var buttonPin = pinTemplate.cloneNode(true);
    buttonPin.style = 'left: ' + (advertisment.location.x - Pin.WIDTH / 2) + 'px; top: ' + (advertisment.location.y - Pin.HEIGHT) + 'px;';
    var pinImage = buttonPin.querySelector('img');
    pinImage.src = advertisment.author.avatar;
    pinImage.alt = advertisment.offer.title;

    onPinClick(buttonPin, advertisment);
    onEnterPress(buttonPin, advertisment);

    return buttonPin;
  };


  window.handleSuccessGetData = function (advertisments) {
    var fragment = document.createDocumentFragment();
    advertisments.forEach(function (adv) {
      fragment.appendChild(renderPins(adv));
    });
    mapPin.appendChild(fragment);
    window.card.renderCards(advertisments[0]);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
