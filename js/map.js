'use strict';

(function () {
  var MainPin = {
    WIDTH: 62,
    HEIGHT: 44,
    POINTER: 22,
    DEFAULTX: 570,
    DEFAULTY: 375
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapClass = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var addressInput = document.querySelector('input[name=address]');
  var titleInput = document.querySelector('input[name=title]');
  var descriptionInput = document.querySelector('textarea[name=description]');
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


  var activateForm = function (enable) {
    var fieldsets = document.querySelectorAll('fieldset');
    var filters = document.querySelectorAll('.map__filter');

    fieldsets.forEach(function (fieldset) {
      enable ? fieldset.removeAttribute('disabled') : fieldset.setAttribute('disabled', 'disabled');
    });

    filters.forEach(function (filter) {
      enable ? filter.removeAttribute('disabled') : filter.setAttribute('disabled', 'disabled');
    });
  };

  var activatePage = function () {
    activateForm(true);
    window.load(handleSuccessGetData, handleErrorMessage);

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
    var errorButton = errorTemplate.querySelector('.error__button');
    var error = errorTemplate.cloneNode(true);
    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.textContent = errorMes;
    mapClass.appendChild(error);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        mapClass.removeChild(error);
      }
    });

    document.addEventListener('click', function () {
      mapClass.removeChild(error);
    });

    errorButton.addEventListener('click', function () {
      mapClass.removeChild(error);
    });
  };

  var resetForm = function () {
    /*установка дефолтных значений для поля «Адрес»*/
    setDefaultAddress(xMuffin, yMuffin);

    /*установка дефолтных значений для button.map__pin--main*/
    mapPinMain.style.left = MainPin.DEFAULTX + 'px';
    mapPinMain.style.top = MainPin.DEFAULTY + 'px';

    /*сброс значения для поля «Заголовок объевления»*/
    titleInput.value = '';

    /*сброс значения для поля «Описание»*/
    descriptionInput.value = '';

    /*установка дефолтного значения для дропдаун листа «Тип жилья»*/
    var typeHouseDefaultValue = window.typeHouse.querySelector('option[selected]').value;
    window.typeHouse.value = typeHouseDefaultValue;

    /*установка дефолтного значения для дропдаун листа «Цена за ночь»*/
    window.price.value = window.minHousePrice[window.typeHouse.value];
    window.price.setAttribute('min', minHousePrice[typeHouse.value]);

    /*установка дефолтных значений для дропдаун листов «Время заезда и выезда»*/
    var timeSelectDefaultValue = window.timeinSelect.querySelector('option[selected]').value;
    window.timeinSelect.value = timeSelectDefaultValue;
    window.timeoutSelect.value = timeSelectDefaultValue;

    /*установка дефолтных значений для дропдаун листа «Кол-во комнат»*/
    var roomsSelectDefaultValue = window.roomsSelect.querySelector('option[selected]').value;
    window.roomsSelect.value = roomsSelectDefaultValue;

    /*установка дефолтных значений для дропдаун листа «Количество гостей»*/
    var guestsSelectDefaultValue = window.guestsSelect.querySelector('option[selected]').value;
    window.guestsSelect.value = guestsSelectDefaultValue;

    /*установка дефолтных стилей для чекбоксов .features__checkbox*/
    var featuresCheckboxesList = document.querySelectorAll('.features input[name=features]:checked');
    featuresCheckboxesList.forEach(function (featuresCheckbox) {
      featuresCheckbox.checked = false;
    });
  };

  var deactivatePage = function () {
    activateForm(false);
    mapClass.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    var pins = window.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.mapPin.removeChild(pin);
    });

    mapClass.removeChild(window.cardNode);
  };

  var handleSuccessSubmitForm = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successNode = successTemplate.cloneNode(true);
    window.map.mapClass.appendChild(successNode);

    document.addEventListener('click', function () {
      window.map.mapClass.removeChild(successNode);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        window.map.mapClass.removeChild(successNode);
    };
    });
    deactivatePage();
    resetForm();
  };

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), handleSuccessSubmitForm, handleErrorMessage);
    evt.preventDefault();
  });

  window.map = {
    mapClass: mapClass
  };

  activateForm(false);
})();
