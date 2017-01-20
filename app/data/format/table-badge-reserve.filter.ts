(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('tableBadgeReserve', function() {
      return function (data) {
        if (data < 1) {
          return '<div class="table-badge -critical">' + data + '</div>';
        } else if (data < 20) {
          return '<div class="table-badge -warning">' + data + '</div>';
        } else {
          return '<div class="table-badge -normal">' + data + '</div>';
        }
      };
    });
})();
