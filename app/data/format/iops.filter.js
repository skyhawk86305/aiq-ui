(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('iops', function() {
      return function (integer, decimalPlaces) {
        decimalPlaces = typeof decimalPlaces === 'number' ? decimalPlaces : 1;
        return typeof integer === 'number' ? (integer/1000).toFixed(decimalPlaces) + 'k' : '-';
      };
    });
})();