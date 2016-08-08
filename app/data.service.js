(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DataService', [
      '$http',
      'ApiLogService',
      DataService
    ]);

  function DataService($http, ApiLogService) {
    var dataService = {};

    dataService.callAPI = function(method, params) {
      params = params || {};
      var request = {method: method, params: params};
      ApiLogService.appendRequest(request);
      return $http.post('/v2/api', request)
        .then(function(response) {
          if (response.data.hasOwnProperty('error')) {
            ApiLogService.appendError(response.data.error);
            return response.data.error.message;
          } else {
            ApiLogService.appendResponse(response.data);
            return response.data.result;
          }
        })
        .catch(function(error) {
          ApiLogService.appendError(error.data);
          return error.data;
        });
    };

    return dataService;
  }
}());
