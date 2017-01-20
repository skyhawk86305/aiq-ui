(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('tableBadgeWear', function() {
      return function (data) {
        if (data < 10) {
          return '<div class="table-badge -critical">' + data + '</div>';
        } else if (data < 80) {
          return '<div class="table-badge -warning">' + data + '</div>';
        } else {
          return '<div class="table-badge -normal">' + data + '</div>';
        }
      };
    });
})();
