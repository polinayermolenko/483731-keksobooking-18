'use strict';

(function () {
  window.roomsSelect = document.querySelector('#room_number');
  window.guestsSelect = document.querySelector('#capacity');

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
  window.timeinSelect = document.querySelector('#timein');
  window.timeoutSelect = document.querySelector('#timeout');

  timeinSelect.addEventListener('change', function () {
    timeoutSelect.value = timeinSelect.value;
  });

  timeoutSelect.addEventListener('change', function () {
    timeinSelect.value = timeoutSelect.value;
  });

  /* Минимальное значение поля «Цена за ночь» зависит от значения поля «Тип жилья» */
  window.typeHouse = document.querySelector('#type');
  window.price = document.querySelector('#price');

  window.minHousePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  typeHouse.addEventListener('change', function () {
    price.setAttribute('min', minHousePrice[typeHouse.value]);
    price.setAttribute('placeholder', minHousePrice[typeHouse.value]);
  });
})();
