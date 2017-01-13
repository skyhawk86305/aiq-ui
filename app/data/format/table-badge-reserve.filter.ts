(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('tableBadgeReserve', function() {
      return function (data) {
        if (data < 20) {
          return '<div class="table-badge -critical">' + data + '</div>';
        } if (data < 80) {
          return '<div class="table-badge -warning">' + data + '</div>';
        } else {
          return '<div class="table-badge -normal">' + data + '</div>';
        }
      };
    });
})();
