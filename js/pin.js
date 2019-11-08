'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var onPinClick = function (pinItem, cardItem) {
    pinItem.addEventListener('click', function () {

      if (window.map.mapClass.contains(window.card.cardNode)) {
        window.map.mapClass.removeChild(window.card.cardNode);
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

  var renderPin = function (advertisment) {
    var buttonPin = pinTemplate.cloneNode(true);
    buttonPin.style = 'left: ' + (advertisment.location.x - Pin.WIDTH / 2) + 'px; top: ' + (advertisment.location.y - Pin.HEIGHT) + 'px;';
    var pinImage = buttonPin.querySelector('img');
    pinImage.src = advertisment.author.avatar;
    pinImage.alt = advertisment.offer.title;

    onPinClick(buttonPin, advertisment);
    onEnterPress(buttonPin, advertisment);

    return buttonPin;
  };

  var render = function (advertisments) {
    var fragment = document.createDocumentFragment();
    advertisments.forEach(function (adv) {
      fragment.appendChild(renderPin(adv));
    });
    mapPin.appendChild(fragment);
  };

  var handleSuccessGetData = function (data) {
    render(data);
    window.card.renderCards(data[0]);
  };

  window.pin = {
    renderPin: renderPin,
    mapPin: mapPin,
    handleSuccessGetData: handleSuccessGetData,
    render: render
  };
})();
