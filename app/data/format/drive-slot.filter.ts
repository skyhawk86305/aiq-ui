(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('driveSlot', ['$filter', function($filter) {
      return function (data) {
        if(typeof data === 'number' || typeof data === 'string') {
          var number = typeof data === 'number' ? data : parseInt(data),
            validNumber = number || number === 0;

          if(data === -1) { return 'internal'; }
          else if(validNumber) { return $filter('number')(number); }
          else { return '-'; }
        } else { return '-'; }
      };
    }]);
})();
