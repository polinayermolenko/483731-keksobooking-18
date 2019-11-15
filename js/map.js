'use strict';

(function () {
  var MainPin = {
    WIDTH: 62,
    HEIGHT: 44,
    POINTER: 22,
    DEFAULTX: 570,
    DEFAULTY: 375
  };

  var LocationMap = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapClass = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');


  var addressInput = document.querySelector('input[name=address]');

  addressInput.setAttribute('readonly', 'readonly');

  var xMuffin = parseInt(mapPinMain.style.left, 10);
  var yMuffin = parseInt(mapPinMain.style.top, 10);

  var setDefaultAddress = function (muffinLocationX, muffinLocationY) {
    var xMuffinInactive = muffinLocationX + MainPin.WIDTH / 2;
    var yMuffinInactive = muffinLocationY + MainPin.HEIGHT / 2;
    addressInput.value = xMuffinInactive + ', ' + yMuffinInactive;
  };

  setDefaultAddress(xMuffin, yMuffin);

  var setAddress = function (pin, shiftX, shiftY) {
    var mainPinX = pin.offsetLeft - shiftX;
    var mainPinY = pin.offsetTop - shiftY;


    if (mainPinY < LocationMap.MIN_Y - (MainPin.HEIGHT + MainPin.POINTER)) {
      mapPinMain.style.top = LocationMap.MIN_Y - (MainPin.HEIGHT + MainPin.POINTER) + 'px';
    } else if (mainPinY > LocationMap.MAX_Y - (MainPin.HEIGHT + MainPin.POINTER)) {
      mapPinMain.style.top = LocationMap.MAX_Y - (MainPin.HEIGHT + MainPin.POINTER) + 'px';
    } else {
      mapPinMain.style.top = mainPinY + 'px';
      mainPinY = mainPinY + MainPin.HEIGHT + MainPin.POINTER;
    }

    if (mainPinX < LocationMap.MIN_X - MainPin.WIDTH / 2) {
      mapPinMain.style.left = LocationMap.MIN_X - MainPin.WIDTH / 2 + 'px';
    } else if (mainPinX > LocationMap.MAX_X - MainPin.WIDTH / 2) {
      mapPinMain.style.left = LocationMap.MAX_X - MainPin.WIDTH / 2 + 'px';
    } else {
      mapPinMain.style.left = mainPinX + 'px';
      mainPinX = mainPinX + MainPin.WIDTH / 2;
    }

    addressInput.value = mainPinX + ', ' + mainPinY;
  };


  var activateForm = function (enable) {
    var fieldsets = document.querySelectorAll('fieldset');
    var filters = document.querySelectorAll('.map__filter');

    fieldsets.forEach(function (fieldset) {
      if (enable) {
        fieldset.removeAttribute('disabled');
      } else {
        fieldset.setAttribute('disabled', 'disabled');
      }
    });

    filters.forEach(function (filter) {
      if (enable) {
        filter.removeAttribute('disabled');
      } else {
        filter.setAttribute('disabled', 'disabled');
      }
    });
  };

  var activatePage = function () {
    activateForm(true);
    window.load(window.pin.handleSuccessGetData, handleErrorMessage);

    mapClass.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    mapPinMain.removeEventListener('mousedown', onMouseDown);
    mapPinMain.removeEventListener('keydown', onButtonEnterPress);
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    if (mapClass.classList.contains('map--faded')) {
      activatePage();
    }

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

  var handleErrorMessage = function (errorMes) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('.error__button');
    var errorMessage = error.querySelector('.error__message');
    errorMessage.textContent = errorMes;
    mapClass.appendChild(error);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        mapClass.removeChild(error);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target !== errorButton) {
        mapClass.removeChild(error);
      }
    });

    errorButton.addEventListener('click', function () {
      mapClass.removeChild(error);
    });
  };


  var deactivatePage = function () {
    activateForm(false);
    mapClass.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPin.removeChild(pin);
    });

    window.card.removeCard();

  };

  var handleSuccessSubmitForm = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successNode = successTemplate.cloneNode(true);
    mapClass.appendChild(successNode);

    document.addEventListener('click', function () {
      mapClass.removeChild(successNode);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        mapClass.removeChild(successNode);
      }
    });

    deactivatePage();
    window.form.resetForm();
  };

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), handleSuccessSubmitForm, handleErrorMessage);
    evt.preventDefault();
  });

  window.map = {
    mapClass: mapClass,
    mapPinMain: mapPinMain,
    MainPin: MainPin,
    xMuffin: xMuffin,
    yMuffin: yMuffin,
    setDefaultAddress: setDefaultAddress,
    deactivatePage: deactivatePage
  };

  activateForm(false);
})();
