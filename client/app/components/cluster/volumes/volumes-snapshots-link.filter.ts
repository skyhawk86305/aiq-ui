(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('volumesSnapshotsLink', ['$routeParams', '$httpParamSerializer', function($routeParams, $httpParamSerializer) {
      return function (data, volumeID) {
        if (!$routeParams.clusterID || !volumeID) {
          return;
        }
        if (!data) {
          return 0;
        }
        const url = buildURL($routeParams.clusterID, volumeID);
        return `<a id="${volumeID}snapshot-details" href="${url}">${data}</a>`;

        function buildURL(clusterID, volumeID) {
          const snapshotFilter = JSON.stringify({
            volumeID: {
              equals: [volumeID]
            }
          });
          const queryString = $httpParamSerializer({'snapshot-filters': snapshotFilter});
          return `#/cluster/${clusterID}/volumes/snapshots?${queryString}`;
        }
      };
    }]);
})();
