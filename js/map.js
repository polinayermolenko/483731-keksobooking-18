'use strict';

(function () {
  var MainPin = {
    WIDTH: 40,
    HEIGHT: 44,
    POINTER: 22
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapClass = document.querySelector('.map');

  var addressInput = document.querySelector('input[name=address]');
  addressInput.setAttribute('readonly', 'readonly');

  var xMuffin = parseInt(mapPinMain.style.left, 10);
  var yMuffin = parseInt(mapPinMain.style.top, 10);

  /*
   * Устанавливает координаты главной метки при неактивном режиме страницы
   * @param {number} muffinLocationX - координата по оси х
   * @param {number} muffinLocationY - координата по оси у
   */
  var setDefaultAddress = function (muffinLocationX, muffinLocationY) {
    var xMuffinInactive = muffinLocationX + MainPin.WIDTH / 2;
    var yMuffinInactive = muffinLocationY + MainPin.HEIGHT / 2;
    addressInput.value = xMuffinInactive + ', ' + yMuffinInactive;
  };

  setDefaultAddress(xMuffin, yMuffin);

  /*
 * Устанавливает координаты главной метки при активном режиме страницы
 * @param {number} muffinLocationX - координата по оси х
 * @param {number} muffinLocationY - координата по оси у
 */
  var setAddress = function (muffinLocationX, muffinLocationY) {
    var xMuffinActive = muffinLocationX + MainPin.WIDTH / 2;
    var yMuffinActive = muffinLocationY + MainPin.HEIGHT + MainPin.POINTER;
    addressInput.value = xMuffinActive + ', ' + yMuffinActive;
  };

  var adForm = document.querySelector('.ad-form');

  var activateForm = function (enable) {
    var fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(function (fieldset) {
      if (enable) {
        fieldset.removeAttribute('disabled');
      } else {
        fieldset.setAttribute('disabled', 'disabled');
      }
    });
  };

  var activatePage = function () {
    activateForm(true);
    window.pin.renderPins(window.data.ads);
    window.card.renderCards(window.data.ads[0]);
    setAddress(xMuffin, yMuffin);
    mapClass.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var onButtonPress = function () {
    activatePage();
    mapPinMain.removeEventListener('mousedown', onButtonPress);
  };

  var onButtonEnterPress = function (evt) {
    if (evt.keyCode === window.card.ENTER_KEYCODE) {
      activatePage();
      mapPinMain.removeEventListener('keydown', onButtonEnterPress);
    }
  };

  mapPinMain.addEventListener('mousedown', onButtonPress);

  mapPinMain.addEventListener('keydown', onButtonEnterPress);

  window.map = {
    mapClass: mapClass
  };
})();
