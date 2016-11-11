(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DataService', [
      '$http',
      '$location',
      'ApiLogService',
      DataService
    ]);

  function DataService($http, $location, ApiLogService) {
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
          if (error.status === 401) {
            $location.path('/login');
          }
          ApiLogService.appendResponse(entry, error.data, true);
          return error.data;
        });
    };

    dataService.callGraphAPI = function(graph, params) {
      var graphAPI = '/graph/cluster/' + params.clusterID +
        '/' + graph +
        '?startTime='+ params.start +
        '&endTime=' + params.end +
        '&resolution=' + params.res;

      return $http.get(graphAPI)
        .catch(function(error) {
          if (error.status === 401) {
            $location.path('/login');
          }
          return error;
        });
    };

    return dataService;
  }
}());
