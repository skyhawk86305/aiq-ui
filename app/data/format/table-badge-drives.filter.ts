(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('DrivesTableBadge', function() {
      return function (data, column) {

        var type = 'normal';

        if (data === null || data === undefined) {
          data = '-';
          type = 'empty';                   
        }

        if (typeof(data) === 'boolean') {
          if (data) {
            data = 'true';
            type = 'normal';
          } else {
            data = 'false';
            type = 'critical';                   
          }
        }

        if (column === 'reserve') {
          if (data < 1) {
            type = 'critical';
          } else if (data < 20) {
            type = 'warning';
          } else {
            type = 'normal';
          }
        }

        if (column === 'wear') {
          if (data < 10) {
            type = 'critical'
          } else if (data < 80) {
            type = 'warning';
          } else {
            type = 'normal';
          }
        }

        return '<div class="table-badge -' + type + '">' + data + '</div>';
      };
    });
})();
