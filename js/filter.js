'use strict';

(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  housingTypeFilter.addEventListener('change', function () {
    var pins = window.pin.mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    switch (housingTypeFilter.value) {
      case 'any':
        if (pins.length < window.advs.length) {
          window.pin.render(window.advs);
          window.card.removeCard();
          window.card.renderCards(window.advs[0]);
        }
        break;
      default:
        pins.forEach(function (pin) {
          window.pin.mapPin.removeChild(pin);
        });

        var filteredAdvs = window.advs.filter(function (adv) {
          return adv.offer.type === housingTypeFilter.value;
        });
        window.pin.render(filteredAdvs);
        window.card.removeCard();
        window.card.renderCards(filteredAdvs[0]);
    }
  });
})();
