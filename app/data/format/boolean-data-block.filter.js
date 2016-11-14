(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('booleanBadge', function() {
      return function (data) {
        if (data) {
          return '<div class="badge -normal">YES</div>';
        } else {
          return '<div class="badge -critical">NO</div>';
        }
      };
    });
})();
