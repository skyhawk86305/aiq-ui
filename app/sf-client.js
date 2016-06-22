(function () {
  'use strict';

  angular
    .module('elementUiPerNode')
    .factory('SFClient', ['Solidfire', 'ApiLogService', '$q', '$rootScope', '$location', '$window', sfClientFactory]);

  function sfClientFactory(Solidfire, ApiLogService, $q, $rootScope, $location, $window) {
    var version = '9.0',
      sfClient = new Solidfire({
        version: version,
        useBrowserAuthentication: true,
        requestCB: ApiLogService.appendRequest,
        responseCB: ApiLogService.appendResponse,
        errorCB: function(error) {
          ApiLogService.appendError(error);
          checkIfClusterUnreachable(error);
        }
      });

    function checkIfClusterUnreachable(error) {
      if (error.errorCode >= 500 && error.errorCode <= 511) {
        var origin = $window.location.origin,
          path = $window.location.pathname.split('index.htm')[0] + 'logout.html',
          query = $location.search('error', JSON.stringify(error)).url().replace($location.path(), '');
        $window.location = origin + path + '#/' + query;
      }
    }

    return sfClient;
  }

})();
