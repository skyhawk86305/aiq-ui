(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('aiqDate', [
      '$filter',
      AiqDateFilter
      ]);

  function AiqDateFilter($filter) {
    return function (data, format) {
      return data ? $filter('date')(data, format) : '-';
    };
  }
})();
