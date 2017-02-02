(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('aiqJson', ['$filter', function($filter) {
      return function (data) {
        if(data === '""' || !data) {
          return '-';
        } else {
          return $filter('json')(data);
        }
      };
    }]);
})();
