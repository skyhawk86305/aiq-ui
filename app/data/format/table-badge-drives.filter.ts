(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('drivesTableBadge', ['$filter', function($filter) {
      return function (data, column) {
        var criticalThreshold = column === 'wear' ? 10 : 1;
        var warningThreshold = column === 'wear' ? 80 : 20;
        var type = 'normal';

        if (isNaN(parseFloat(data))) {
          return '<div class="table-badge -empty">-</div>';                
        }

        if (data < criticalThreshold) {
          type = 'critical';
        } else if (data < warningThreshold) {
          type = 'warning';
        }

        return '<div class="table-badge -' + type + '">' + data + '</div>';
      };
    }]);
})();
