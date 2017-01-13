(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('tableBadgeWearReserve', function() {
      return function (data) {
        if (data > 50) {
          return '<div class="table-badge -normal">' + data + '</div>';
        } if (data < 50 && data > 15) {
          return '<div class="table-badge -warning">' + data + '</div>';
        } else {
          return '<div class="table-badge -critical">' + data + '</div>';
        }
      };
    });
})();
