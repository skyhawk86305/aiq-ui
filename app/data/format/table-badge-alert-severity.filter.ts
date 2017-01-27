(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('tableBadgeAlertSeverity', function() {
      return function (data) {
        switch (data) {
          case 'Info':
            return '<div class="table-badge -info">INFO</div>';
          case 'Warning':
            return '<div class="table-badge -warning">WARNING</div>';
          case 'Error':
            return '<div class="table-badge -error">ERROR</div>';
          case 'Critical':
            return '<div class="table-badge -critical">CRITICAL</div>';
          case 'info':
            return '<div class="table-badge -info">INFO</div>';
          case 'warning':
            return '<div class="table-badge -warning">WARNING</div>';
          case 'error':
            return '<div class="table-badge -error">ERROR</div>';
          case 'critical':
            return '<div class="table-badge -critical">CRITICAL</div>';
          default:
            return data;
        }
      };
    });
})();
