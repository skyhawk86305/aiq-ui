(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('factor', function() {
      return function (integer, decimalPlaces) {
        decimalPlaces = typeof decimalPlaces === 'number' ? decimalPlaces : 1;
        return typeof integer === 'number' ? integer.toFixed(decimalPlaces) + 'x' : '-';
      };
    });
})();
