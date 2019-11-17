'use strict';
(function () {
  window.upload = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    window.handleData(xhr, onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
