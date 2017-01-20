(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('apiCollectionLink', ['$routeParams', '$location', function($routeParams, $location) {
      return function (data) {
        if (data && $routeParams.clusterID) {
          let path = `${$location.protocol()}://${$location.host()}:${$location.port()}/state/cluster/${$routeParams.clusterID}/${data}`;
          return `<a href="${path}" target="_blank" id="${data}Link">${data}</a>`;
        } else if(!$routeParams.clusterID) {
          return data;
        } else {
          return '-';
        }
      };
    }]);
})();
