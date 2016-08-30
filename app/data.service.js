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
      var entry = ApiLogService.appendRequest(request);
      return $http.post('/v2/api', request)
        .then(function(response) {
          ApiLogService.appendResponse(entry, response.data);
          return response.data.result;
        })
        .catch(function(error) {
          ApiLogService.appendResponse(entry, error.data, true);
          return error.data;
        });
    };

    return dataService;
  }
}());
