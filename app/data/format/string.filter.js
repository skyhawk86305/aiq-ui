(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('string', function() {
      return function (data, capitalize) {
        if(typeof data === 'number' || typeof data === 'string') {
          var string = typeof data === 'string' ? data : data.toString();
          return capitalize && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : string;
        } else if(typeof data === 'object' && data.length) {
          return data.map(function(d) {
            return d + ' ';
          });
        } else { return '-'; }
      };
    });
})();
