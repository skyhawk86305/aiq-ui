/* globals angular */
(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DataService', ['$http', '$q', 'ApiLogService', DataService]);

  function DataService($http, $q, ApiLogService) {
    var dataService = {};

    dataService.callAPI = function(method, params) {
      var deferred = $q.defer(),
          request = {method: method, params: params};

      ApiLogService.appendRequest(request);
      $http.post('/v2/api', request)
        .then(function(response) {
          if (response.data.hasOwnProperty('error')) {
            ApiLogService.appendError(response.data.error);
            deferred.reject(response.data.error.message);
          } else {
            ApiLogService.appendResponse(response.data);
            deferred.resolve(response.data.result);
          }
        })
        .catch(function(error) {
          ApiLogService.appendError(error.data);
          deferred.reject(error.data);
        });

      return deferred.promise;
    };

    return dataService;
  }
}());
