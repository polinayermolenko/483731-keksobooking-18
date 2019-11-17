'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PhotoSize = {
    WIDTH: '70',
    HEIGHT: '70'
  };

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var picChooser = document.querySelector('.ad-form__input');
  var picWrapper = document.querySelector('.ad-form__photo');

  var createImg = function (parentNode, text, width, height) {
    if (parentNode.childElementCount > 0) {
      parentNode.removeChild(parentNode.firstChild);
    }
    var childNode = document.createElement('img');
    childNode.width = width;
    childNode.height = height;
    childNode.alt = text;
    parentNode.appendChild(childNode);

    var pic = parentNode.querySelector('img');
    return pic;


  };

  var readImg = function (photo, chooser) {
    var file = chooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photo.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  avatarChooser.addEventListener('change', function () {
    readImg(avatar, avatarChooser);
  });

  picChooser.addEventListener('change', function () {
    readImg(createImg(picWrapper, 'Фото жилья', PhotoSize.WIDTH, PhotoSize.HEIGHT), picChooser);
  });

  window.photo = {
    avatar: avatar,
    picWrapper: picWrapper
  };
})();
