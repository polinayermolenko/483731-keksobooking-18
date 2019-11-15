'use strict';

(function () {
  var filerForm = document.querySelector('.map__filters');
  var housingTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');


  var priceMap = {
    'any': 0,
    'middle': [10000, 50000],
    'low': 10000,
    'high': 50000
  };

  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onFilterChange = debounce(function () {
    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPin.removeChild(pin);
    });
    window.pin.updatePins();
    window.card.removeCard();
  });

  filerForm.addEventListener('change', onFilterChange);

  var filterByHouseType = function (adv) {
    switch (housingTypeFilter.value) {
      case 'any':
        return adv.offer.type === 'palace' || adv.offer.type === 'flat' || adv.offer.type === 'house' || adv.offer.type === 'bungalo';
      default:
        return adv.offer.type === housingTypeFilter.value;
    }
  };

  var filterByPrice = function (adv) {
    switch (priceFilter.value) {
      case 'any':
        return adv.offer.price > priceMap[priceFilter.value];
      case 'low':
        return adv.offer.price < priceMap[priceFilter.value];
      case 'high':
        return adv.offer.price >= priceMap[priceFilter.value];
      default:
        return adv.offer.price >= priceMap[priceFilter.value][0] && adv.offer.price < priceMap[priceFilter.value][1];
    }
  };

  var filterByRooms = function (adv) {
    switch (roomsFilter.value) {
      case 'any':
        return adv.offer.rooms >= 0;
      default:
        return adv.offer.rooms === parseInt(roomsFilter.value, 10);
    }
  };

  var filterByGuests = function (adv) {
    switch (guestsFilter.value) {
      case 'any':
        return adv.offer.guests >= 0;
      default:
        return adv.offer.guests === parseInt(guestsFilter.value, 10);
    }
  };

  var filterByFeatures = function (adv) {
    var selectedCheckboxes = featuresFilter.querySelectorAll('input:checked');

    var checkedFeatures = Array.from(selectedCheckboxes).map(function (checkbox) {
      return checkbox.value;
    });
    var filteredFeatures = [];
    adv.offer.features.forEach(function (feature) {
      if (checkedFeatures.indexOf(feature) !== -1) {
        filteredFeatures.push(feature);
      }
    });
    return filteredFeatures.length === checkedFeatures.length;
  };

  window.filter = {
    filterByHouseType: filterByHouseType,
    filterByPrice: filterByPrice,
    filterByRooms: filterByRooms,
    filterByGuests: filterByGuests,
    filterByFeatures: filterByFeatures
  };
})();
