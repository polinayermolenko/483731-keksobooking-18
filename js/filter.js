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
  var onFilterChange = function () {
    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPin.removeChild(pin);
    });
    window.pin.updatePins();
    window.card.removeCard();
  };

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
    for (var i = 0; i < adv.offer.features.length; i++) {
      if (checkedFeatures.indexOf(adv.offer.features[i]) !== -1) {
        filteredFeatures.push(adv.offer.features[i]);
      }
    }
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
