(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('access', ['$filter', function($filter) {
      return function (data) {
        return data === 'readWrite' ? 'Read / Write' : $filter('string')(data);
      };
    }]);
})();
