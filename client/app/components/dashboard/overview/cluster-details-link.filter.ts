(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('clusterDetailsLink', function() {
      return function (name, clusterID) {
        const url = buildURL(clusterID);
        return `<a class="cluster-details-link" href="${url}">${name}</a>`;
        function buildURL(clusterID) {
          return `#/cluster/${clusterID}`;
        }
      };
    });
})();
