(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('alertSeverityDataBlock', function() {
      return function (data) {
        switch (data) {
          case 'Info':
            return '<div class="data-block -info">INFO</div>';
          case 'Warning':
            return '<div class="data-block -warning">WARNING</div>';
          case 'Error':
            return '<div class="data-block -error">ERROR</div>';
          case 'Critical':
            return '<div class="data-block -critical">CRITICAL</div>';
        }
      };
    });
})();
