'use strict';

(function () {
  var MainPin = {
    WIDTH: 62,
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
  var setAddress = function (pin, shiftX, shiftY) {
    var mainPinX = pin.offsetLeft - shiftX;
    var mainPinY = pin.offsetTop - shiftY;


    if (mainPinY < window.data.locationMap.MIN_Y - (MainPin.HEIGHT + MainPin.POINTER)) {
      mapPinMain.style.top = window.data.locationMap.MIN_Y - (MainPin.HEIGHT + MainPin.POINTER) + 'px';
    } else if (mainPinY > window.data.locationMap.MAX_Y - (MainPin.HEIGHT + MainPin.POINTER)) {
      mapPinMain.style.top = window.data.locationMap.MAX_Y - (MainPin.HEIGHT + MainPin.POINTER) + 'px';
    } else {
      mapPinMain.style.top = mainPinY + 'px';
      mainPinY = mainPinY + MainPin.HEIGHT + MainPin.POINTER;
    }

    if (mainPinX < window.data.locationMap.MIN_X - MainPin.WIDTH / 2) {
      mapPinMain.style.left = window.data.locationMap.MIN_X - MainPin.WIDTH / 2 + 'px';
    } else if (mainPinX > window.data.locationMap.MAX_X - MainPin.WIDTH / 2) {
      mapPinMain.style.left = window.data.locationMap.MAX_X - MainPin.WIDTH / 2 + 'px';
    } else {
      mapPinMain.style.left = mainPinX + 'px';
      mainPinX = mainPinX + MainPin.WIDTH / 2;
    }

    addressInput.value = mainPinX + ', ' + mainPinY;
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
    window.load(window.pin.renderPins, errorHandler);
    window.load(window.card.renderCards, errorHandler);


    mapClass.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    mapPinMain.removeEventListener('mousedown', onMouseDown);
    mapPinMain.removeEventListener('keydown', onButtonEnterPress);
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    activatePage();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setAddress(mapPinMain, shift.x, shift.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      mapPinMain.addEventListener('mousedown', onMouseDown);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onButtonEnterPress = function (evt) {
    if (evt.keyCode === window.card.ENTER_KEYCODE) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', onMouseDown);

  mapPinMain.addEventListener('keydown', onButtonEnterPress);

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorContainer = errorTemplate.querySelector('.error__message');
    var errorButton = errorTemplate.querySelector('.error__button');

    errorContainer.textContent = errorMessage;

    errorButton.addEventListener('click', function () {
      errorTemplate.classList.add('hidden');
    });

    var error = errorTemplate.cloneNode(true);

    mapClass.appendChild(error);
  };

  window.map = {
    mapClass: mapClass
  };
})();
