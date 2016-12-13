(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DataService', [
      '$q',
      '$http',
      '$filter',
      '$location',
      'ApiLogService',
      DataService
    ]);

  function DataService($q, $http, $filter, $location, ApiLogService) {
    var dataService = {};

    dataService.callAPI = function(method, params) {
      params = params || {};
      var request = {method: method, params: params};
      var entry = ApiLogService.appendRequest(request);
      return $http.post('/json-rpc/2.0', request)
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
        '/' + graph;
      if (params.snapshot) {
        graphAPI += '/snapshot';
      } else {
        graphAPI += '?startTime='+ params.start.toISOString() +
        '&endTime=' + params.end.toISOString() +
        '&resolution=' + $filter('graphResolution')(params.resolution, graph);
      }

      return $http.get(graphAPI)
        .then(function(response) {
          if (!params.snapshot) {
            response.data.timestamps = response.data.timestampSec.map(function(timestamp) { return timestamp * 1000; });
          }
          return response;
        })
        .catch(function(error) {
          if (error.status === 401) {
            $location.path('/login');
          }
          return $q.reject(error);
        });
    };

    return dataService;
  }
}());
