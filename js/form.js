'use strict';

(function () {
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var titleInput = document.querySelector('input[name=title]');
  var descriptionInput = document.querySelector('textarea[name=description]');


  roomsSelect.addEventListener('change', function () {
    if (roomsSelect.value === '1' && guestsSelect.value !== '1') {
      guestsSelect.setCustomValidity('для 1 гостя');
    } else if (roomsSelect.value === '2' && (guestsSelect.value === '3' || guestsSelect.value === '0')) {
      guestsSelect.setCustomValidity('для 1 гостя или для 2 гостей');
    } else if (roomsSelect.value === '3' && guestsSelect.value === '0') {
      guestsSelect.setCustomValidity('для 1 гостя, для 2 гостей или для 3 гостей');
    } else if (roomsSelect.value === '100' && guestsSelect.value !== '0') {
      guestsSelect.setCustomValidity('не для гостей');
    } else {
      guestsSelect.setCustomValidity('');
    }
  });

  guestsSelect.addEventListener('change', function () {
    if (guestsSelect.value === '1' && roomsSelect.value !== '1') {
      guestsSelect.setCustomValidity('для 1 гостя');

    } else if (guestsSelect.value === '2') {
      if (roomsSelect.value === '1') {
        guestsSelect.setCustomValidity('для 1 гостя');
      } else if (roomsSelect.value === '100') {
        guestsSelect.setCustomValidity('не для гостей');
      } else {
        guestsSelect.setCustomValidity('');
      }
    } else if (guestsSelect.value === '3') {
      if (roomsSelect.value === '1') {
        guestsSelect.setCustomValidity('для 1 гостя');
      } else if (roomsSelect.value === '2') {
        guestsSelect.setCustomValidity('для 2 гостей');
      } else if (roomsSelect.value === '100') {
        guestsSelect.setCustomValidity('не для гостей');
      } else {
        guestsSelect.setCustomValidity('');
      }
    } else {
      if (roomsSelect.value === '1') {
        guestsSelect.setCustomValidity('для 1 гостя');
      } else if (roomsSelect.value === '2') {
        guestsSelect.setCustomValidity('для 2 гостей');
      } else if (roomsSelect.value === '3') {
        guestsSelect.setCustomValidity('для 3 гостей');
      } else {
        guestsSelect.setCustomValidity('');
      }
    }
  });


  /* Синхронизация полей «Время заезда» и «Время выезда»*/
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  timeinSelect.addEventListener('change', function () {
    timeoutSelect.value = timeinSelect.value;
  });

  timeoutSelect.addEventListener('change', function () {
    timeinSelect.value = timeoutSelect.value;
  });

  /* Минимальное значение поля «Цена за ночь» зависит от значения поля «Тип жилья» */
  var typeHouse = document.querySelector('#type');
  var price = document.querySelector('#price');

  var minHousePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  typeHouse.addEventListener('change', function () {
    price.setAttribute('min', minHousePrice[typeHouse.value]);
    price.setAttribute('placeholder', minHousePrice[typeHouse.value]);
  });

  var resetForm = function () {
    /* установка дефолтных значений для поля «Адрес»*/
    window.map.setDefaultAddress(window.map.xMuffin, window.map.yMuffin);

    /* установка дефолтных значений для button.map__pin--main*/
    window.map.mapPinMain.style.left = window.map.MainPin.DEFAULTX + 'px';
    window.map.mapPinMain.style.top = window.map.MainPin.DEFAULTY + 'px';

    /* сброс значения для поля «Заголовок объевления»*/
    titleInput.value = '';

    /* сброс значения для поля «Описание»*/
    descriptionInput.value = '';

    /* установка дефолтного значения для дропдаун листа «Тип жилья»*/
    var typeHouseDefaultValue = typeHouse.querySelector('option[selected]').value;
    typeHouse.value = typeHouseDefaultValue;

    /* установка дефолтного значения для дропдаун листа «Цена за ночь»*/
    price.value = minHousePrice[typeHouse.value];
    price.setAttribute('min', minHousePrice[typeHouse.value]);

    /* установка дефолтных значений для дропдаун листов «Время заезда и выезда»*/
    var timeSelectDefaultValue = timeinSelect.querySelector('option[selected]').value;
    timeinSelect.value = timeSelectDefaultValue;
    timeoutSelect.value = timeSelectDefaultValue;

    /* установка дефолтных значений для дропдаун листа «Кол-во комнат»*/
    var roomsSelectDefaultValue = roomsSelect.querySelector('option[selected]').value;
    roomsSelect.value = roomsSelectDefaultValue;

    /* установка дефолтных значений для дропдаун листа «Количество гостей»*/
    var guestsSelectDefaultValue = guestsSelect.querySelector('option[selected]').value;
    guestsSelect.value = guestsSelectDefaultValue;

    /* установка дефолтных стилей для чекбоксов .features__checkbox*/
    var featuresCheckboxesList = document.querySelectorAll('.features input[name=features]:checked');
    featuresCheckboxesList.forEach(function (featuresCheckbox) {
      featuresCheckbox.checked = false;
    });
  };

  window.form = {
    resetForm: resetForm
  };
})();
