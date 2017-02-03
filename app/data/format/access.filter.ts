(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('access', ['$filter', function($filter) {
      return function (data) {
        switch (data) {
          case 'readWrite':
            return 'Read / Write';
          case 'readOnly':
            return 'Read Only';
          case 'locked':
            return 'Locked';
          case 'replicationTarget':
            return 'Replication Target';
          default:
        		return $filter('string')(data);
        }
      };
    }]);
})();
