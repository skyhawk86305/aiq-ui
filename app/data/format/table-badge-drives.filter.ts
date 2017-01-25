(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('drivesTableBadge', ['$filter', function($filter) {
      return function (data, column) {

        if (data === null || data === undefined || data === '') {
          return '<div class="table-badge -empty">-</div>';                
        }

        if (typeof(data) === 'boolean') {
          return $filter('tableBadgeBoolean')(data);
        }

        var type = 'normal';

        if (column === 'reserve') {
          if (data < 1) {
            type = 'critical';
          } else if (data < 20) {
            type = 'warning';
          }
        }

        if (column === 'wear') {
          if (data < 10) {
            type = 'critical'
          } else if (data < 80) {
            type = 'warning';
          }
        }

        return '<div class="table-badge -' + type + '">' + data + '</div>';
      };
    }]);
})();
