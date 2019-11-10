'use strict';

(function () {
  var housingTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  /*
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');*/

  /*
  var filtredByHouse = window.advs;
  var filtredByPrice = window.advs;
  var filtredByRooms = window.advs;
  var filtredByGuests = window.advs;*/
  /*
  var houseMap = {
    'any': ['palace', 'flat', 'house', 'bungalo'],
    'palace': 'palace',
    'flat': 'flat',
    'house': 'house',
    'bungalo': 'bungalo'
  };*/

  var priceMap = {
    'any': 0,
    'middle': [10000, 50000],
    'low': 10000,
    'high': 50000
  };

  /*
  var roomsMap = {
     'any': 0,
     '1': 1,
     '2': 2,
     '3': 3,
  };

  var guestsMap = {
      'any': 0,
      '1': 1,
      '2': 2,
      '0': 0
  }

  var defaultSettings = {
    'house': houseMap[housingTypeFilter.value],
    'price': priceMap[priceFilter.value],
    'rooms': roomsMap[roomsFilter.value],
    'guests': guestsMap[guestsFilter.value]
  };
*/
  housingTypeFilter.addEventListener('change', function () {
    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPin.removeChild(pin);
    });

    /*
    var initial = window.advs.filter(function (it) {
      return it.offer.price === defaultSettings.price && it.offer.rooms === defaultSettings.rooms && it.offer.guests === defaultSettings.guests;
    });*/

    switch (housingTypeFilter.value) {
      case 'any':
        if (pins.length < window.advs.length) {
          window.pin.render(window.advs);
          window.card.removeCard();
        }
        break;
      default:
        var filteredAdvs = window.advs.filter(function (adv) {
          return adv.offer.type === housingTypeFilter.value;
        });
        window.pin.render(filteredAdvs);
        window.card.removeCard();
    }
  });

  priceFilter.addEventListener('change', function () {
    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPin.removeChild(pin);
    });

    switch (priceFilter.value) {
      case 'any':
        if (pins.length < window.advs.length) {
          window.pin.render(window.advs);
          window.card.removeCard();
        }
        break;
      case 'low':
        var filteredAdvertisments = window.advs.filter(function (adv) {
          return adv.offer.price < priceMap[priceFilter.value];
        });
        window.pin.render(filteredAdvertisments);
        window.card.removeCard();
        break;
      case 'high':
        var filteredAdvertisments = window.advs.filter(function (adv) {
          return adv.offer.price >= priceMap[priceFilter.value];
        });
        window.pin.render(filteredAdvertisments);
        window.card.removeCard();
        break;
      case 'middle':
        var filteredAdvertisments = window.advs.filter(function (adv) {
          return adv.offer.price >= priceMap[priceFilter.value][0] && adv.offer.price < priceMap[priceFilter.value][1];
        });
        window.pin.render(filteredAdvertisments);
        window.card.removeCard();
        break;

      default:
        var filteredAdvertisments = window.advs.filter(function (adv) {
          return adv.offer.price === priceFilter.value;
        });
        window.pin.render(filteredAdvertisments);
        window.card.removeCard();
    }
  });

})();
