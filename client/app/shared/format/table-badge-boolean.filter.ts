(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('tableBadgeBoolean', function() {
      return function (data) {
        if (data) {
          return '<div class="table-badge -normal">YES</div>';
        } else {
          return '<div class="table-badge -critical">NO</div>';
        }
      };
    });
})();
