(function () {
    'use strict';
    angular
        .module('aiqUi')
        .filter('aiqNumber', ['$filter', function ($filter) {
            return function (data, decimalPlaces, hideCommas, dashZero) {
                if (typeof data === 'number' || typeof data === 'string') {
                    var number = typeof data === 'number' ? data : parseFloat(data), places = typeof decimalPlaces === 'number' ? decimalPlaces : 0, validNumber = number || number === 0, rounded;
                    if (!validNumber || (dashZero && number === 0)) {
                        return '-';
                    }
                    else {
                        rounded = number.toFixed(places);
                        return hideCommas ? rounded : $filter('number')(rounded);
                    }
                }
                else {
                    return '-';
                }
            };
        }]);
})();
//# sourceMappingURL=number.filter.js.map