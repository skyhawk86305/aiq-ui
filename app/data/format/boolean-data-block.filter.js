(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('booleanDataBlock', function() {
      return function (data) {
        if (data) {
          return '<div class="data-block -normal">YES</div>';
        } else {
          return '<div class="data-block -critical">NO</div>';
        }
      };
    });
})();
