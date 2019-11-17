'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.handleData = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
  };


  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    window.handleData(xhr, onSuccess, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

})();
