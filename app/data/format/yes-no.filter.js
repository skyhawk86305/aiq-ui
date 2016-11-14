(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('yesNo', function() {
      return function (boolean) {
        return boolean ? 'Yes' : 'No';
      };
    });
})();
