(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('aiqData', ['$filter', aiqData]);

  function aiqData($filter) {
    return function (data, type) {
      switch (type) {
        case ('integer'):
          return $filter('number')(data, 0);
        case ('ratio'):
          return data ? typeof data === 'number' ? $filter('number')(data, 2) + 'x' : '-' : '-';
        case ('wholePercent'):
          return Math.round(data) + '%';
        case ('twoDecimalPercentage'):
          return data.toFixed(2) + '%';
        case ('bytes'):
          return $filter('bytes')(parseInt(data), false, 1);
        case ('json'):
          return $filter('json')(data, 0);
        case ('access'):
          return data ? $filter('access')(data) : '-';
        case ('date'):
          var formatString = 'yyyy-MM-dd HH:mm:ss';
          if (data) {
            var parsedDate = Date.parse(data);
            return isNaN(parsedDate) ? data : $filter('date')(parsedDate, formatString);
          } else {
            return '-';
          }
          break;
        case ('time'):
          return $filter('date')(Date.parse(data), 'hh:mm:ss a');
        case ('attribute'):
          return data ? $filter('attribute')(data) : '-';
        case ('string'):
          return data ? data : '-';
        case ('list'):
          return data && data.length ? $filter('list')(data) : '-';
        case ('kiloCase'):
          return data ? data%1000 ? $filter('kiloCase')(data, 1, false) : $filter('kiloCase')(data, 0, false) : '-';
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
