(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('aiqData', ['$filter', aiqData]);

  function aiqData($filter) {
    return function (data, params) {
      var type = params && params.type || '';
      switch (type) {
        case ('integer'):
          return $filter('number')(data, 0);
        case ('boolean'):
          return data ? 'Yes' : 'No';
        case ('ratio'):
          return data ? typeof data === 'number' ? $filter('number')(data, 2) + 'x' : '-' : '-';
        case ('wholePercent'):
          return Math.round(data) + '%';
        case ('twoDecimalPercentage'):
          return data.toFixed(2) + '%';
        case ('date'):
          var formatString = 'yyyy-MM-dd HH:mm:ss';
          if (data) {
            var parsedDate = Date.parse(data);
            return isNaN(parsedDate) ? data : $filter('date')(parsedDate, formatString);
          }
          return '-';
        case ('time'):
          return $filter('date')(Date.parse(data), 'hh:mm:ss a');
        case ('string'):
          return data ? data : '-';
        case ('capitalize'):
          return data ? data.charAt(0).toUpperCase() + data.slice(1) : '-';
        case ('arraySize'):
          return data ? data.length : '0';
        default:
          return data;
      }
    };
  }
})();
