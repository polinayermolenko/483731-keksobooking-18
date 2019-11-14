'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
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

    var onPinClick = function () {
      var activePin = window.map.mapClass.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      buttonPin.classList.add('map__pin--active');


      window.card.removeCard();
      window.card.renderCards(advertisment);
    };

    var onEnterPress = function (evt) {
      if (evt.keyCode === window.card.ENTER_KEYCODE) {
        window.card.renderCards(advertisment);
      }
    };

    buttonPin.addEventListener('click', onPinClick);
    buttonPin.addEventListener('keydown', onEnterPress);

    return buttonPin;
  };

  var render = function (advertisments) {
    var fragment = document.createDocumentFragment();
    advertisments.slice(0, 5).forEach(function (adv) {
      fragment.appendChild(renderPin(adv));
    });
    mapPin.appendChild(fragment);
  };

  var updatePins = function () {
    render(advs.filter(window.filter.filterByHouseType).filter(window.filter.filterByPrice).filter(window.filter.filterByRooms).filter(window.filter.filterByGuests).filter(window.filter.filterByFeatures));
  };

  var advs = [];

  var handleSuccessGetData = function (data) {
    advs = data;
    updatePins();
  };

  window.pin = {
    Pin: Pin,
    advs: advs,
    renderPin: renderPin,
    mapPin: mapPin,
    handleSuccessGetData: handleSuccessGetData,
    updatePins: updatePins
  };
})();
