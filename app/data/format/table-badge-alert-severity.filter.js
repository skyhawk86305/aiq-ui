(function () {
    'use strict';
    angular
        .module('aiqUi')
        .filter('tableBadgeAlertSeverity', function () {
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
                default:
                    return data;
            }
        };
    });
})();
//# sourceMappingURL=table-badge-alert-severity.filter.js.map