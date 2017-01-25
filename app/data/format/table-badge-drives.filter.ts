(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('drivesTableBadge', ['$filter', function($filter) {
      return function (data, column) {

        if (typeof data !== 'number') {
          return '<div class="table-badge -empty">-</div>';                
        }

        var criticalThreshold = column === 'wear' ? 10 : 1;
        var warningThreshold = column === 'wear' ? 80 : 20;

        var type = 'normal';

        if (data < criticalThreshold) {
          type = 'critical';
        } else if (data < warningThreshold) {
          type = 'warning';
        }

        return '<div class="table-badge -' + type + '">' + data + '</div>';
      };
    }]);
})();
