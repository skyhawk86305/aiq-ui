(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('boolean', function() {
      return function (data, truthy, falsy) {
        return data ? truthy : falsy;
      };
    });
})();
