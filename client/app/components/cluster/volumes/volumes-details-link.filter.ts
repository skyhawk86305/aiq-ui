(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('volumesDetailsLink', ['$routeParams', function($routeParams) {
      return function (volumeID) {
        if (!$routeParams.clusterID || !volumeID) {
          return;
        }

        const url = buildURL($routeParams.clusterID, volumeID);
        return `<a class="view-details-link" href="${url}" aria-label="Leave this page to view selected volume details"><i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i></a>`;

        function buildURL(clusterID, volumeID) {
          return `#/cluster/${clusterID}/volume/${volumeID}`;
        }
      };
    }]);
})();

