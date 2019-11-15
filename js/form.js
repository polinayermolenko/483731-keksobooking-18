'use strict';

(function () {
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var titleInput = document.querySelector('input[name=title]');
  var descriptionInput = document.querySelector('textarea[name=description]');
  var resetButton = document.querySelector('.ad-form__reset');


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

  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  timeinSelect.addEventListener('change', function () {
    timeoutSelect.value = timeinSelect.value;
  });

  timeoutSelect.addEventListener('change', function () {
    timeinSelect.value = timeoutSelect.value;
  });


  var typeHouse = document.querySelector('#type');
  var price = document.querySelector('#price');

  var minHousePriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  typeHouse.addEventListener('change', function () {
    price.setAttribute('min', minHousePriceMap[typeHouse.value]);
    price.setAttribute('placeholder', minHousePriceMap[typeHouse.value]);
  });

  var resetForm = function () {
    window.map.setDefaultAddress(window.map.xMuffin, window.map.yMuffin);

    window.map.mapPinMain.style.left = window.map.MainPin.DEFAULTX + 'px';
    window.map.mapPinMain.style.top = window.map.MainPin.DEFAULTY + 'px';

    titleInput.value = '';

    descriptionInput.value = '';

    var typeHouseDefaultValue = typeHouse.querySelector('option[selected]').value;
    typeHouse.value = typeHouseDefaultValue;

    price.value = minHousePriceMap[typeHouse.value];
    price.setAttribute('min', minHousePriceMap[typeHouse.value]);

    var timeSelectDefaultValue = timeinSelect.querySelector('option[selected]').value;
    timeinSelect.value = timeSelectDefaultValue;
    timeoutSelect.value = timeSelectDefaultValue;

    var roomsSelectDefaultValue = roomsSelect.querySelector('option[selected]').value;
    roomsSelect.value = roomsSelectDefaultValue;

    var guestsSelectDefaultValue = guestsSelect.querySelector('option[selected]').value;
    guestsSelect.value = guestsSelectDefaultValue;

    var featuresCheckboxesList = document.querySelectorAll('.features input[name=features]:checked');
    featuresCheckboxesList.forEach(function (featuresCheckbox) {
      featuresCheckbox.checked = false;
    });

    var mapFilters = document.querySelectorAll('.map__filter');
    mapFilters.forEach(function (filter) {
      var filterDefaultValue = filter.querySelector('option[selected]').value;
      filter.value = filterDefaultValue;
    });

    var mapFeatures = document.querySelectorAll('.map__checkbox:checked');
    mapFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };

  resetButton.addEventListener('click', function () {
    resetForm();
    window.map.deactivatePage();

  });


  window.form = {
    resetForm: resetForm
  };
})();
