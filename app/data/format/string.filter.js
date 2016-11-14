(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('string', function() {
      return function (data, capitalize) {
        var string = typeof data === 'string' ? data : typeof data === 'number' ? data.toString() : '-';
        return capitalize ? string.charAt(0).toUpperCase() + string.slice(1) : string;
      };
    });
})();
