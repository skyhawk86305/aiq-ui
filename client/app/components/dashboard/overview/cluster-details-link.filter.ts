(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('clusterDetailsLink', function() {
      return function (name, clusterID) {
        return `<a class="cluster-details-link" href="#/cluster/${clusterID}/">${name}</a>`;
        }
    });
})();
