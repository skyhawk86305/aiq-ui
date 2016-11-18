(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('number', function() {
      return function (data, decimalPlaces) {
        if(typeof data === 'number' || typeof data === 'string') {
          var number = typeof data === 'number' ? data : parseFloat(data),
            places = typeof decimalPlaces === 'number' ? decimalPlaces : 0;

          return number || number === 0 ? number.toFixed(places) : '-';
        } else { return '-'; }
      };
    });
})();
