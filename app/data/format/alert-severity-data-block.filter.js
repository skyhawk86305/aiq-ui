(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('alertSeverityBadge', function() {
      return function (data) {
        switch (data) {
          case 'Info':
            return '<div class="badge -info">INFO</div>';
          case 'Warning':
            return '<div class="badge -warning">WARNING</div>';
          case 'Error':
            return '<div class="badge -error">ERROR</div>';
          case 'Critical':
            return '<div class="badge -critical">CRITICAL</div>';
        }
      };
    });
})();
