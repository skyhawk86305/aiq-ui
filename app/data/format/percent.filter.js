(function () {
    'use strict';
    angular
        .module('aiqUi')
        .filter('percent', function () {
        return function (data, decimalPlaces, useFactor, isComputed, forHtml) {
            if (typeof data === 'number' || typeof data === 'string') {
                var number = typeof data === 'number' ? data : parseFloat(data), places = typeof decimalPlaces === 'number' ? decimalPlaces : 0, suffix = useFactor ? 'x' : '%';
                if (isComputed) {
                    number /= 100;
                }
                if (!useFactor) {
                    number *= 100;
                }
                if (forHtml) {
                    suffix = '<span class="units">' + suffix + '</span>';
                }
                return number || number === 0 ? number.toFixed(places) + suffix : '-';
            }
            else {
                return '-';
            }
        };
    });
})();
//# sourceMappingURL=percent.filter.js.map