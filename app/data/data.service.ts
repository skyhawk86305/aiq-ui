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
      'CacheFactory',
      DataService
    ]);

  function DataService($q, $http, $filter, $location, ApiLogService, CacheFactory) {
    // Check to make sure the cache doesn't already exist
    if (!CacheFactory.get('defaultCache')) {
      $http.defaults.cache = new CacheFactory('defaultCache', {
        maxAge: 10 * 1000, // Items added to this cache expire after 10 seconds
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
      });
    } else {
      $http.defaults.cache = CacheFactory.get('defaultCache');
    }

    return {
      callAPI: function(method, params) {
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
            CacheFactory.get('defaultCache').removeAll();
            let oldUrl = $location.url();
            $location.path('/login').search({url: oldUrl});
          }
          ApiLogService.appendResponse(entry, error.data, true);
          return error.data;
        });
      },

      callGuzzleAPI: function(method, params) {
        let guzzleAPI = '/state/cluster/' + params.clusterID +
            '/' + method;

        return $http.get(guzzleAPI, {cache: true})
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            if (error.status === 401) {
              CacheFactory.get('defaultCache').removeAll();
              let oldUrl = $location.url();
              $location.path('/login').search({url: oldUrl});
            }
            return $q.reject(error);
          });
      },

      callGraphAPI: function(graph, params) {
        var graphAPI = '/graph/cluster/' + params.clusterID +
          '/' + graph;
        if (params.snapshot) {
          graphAPI += '/snapshot';
        } else {
          graphAPI += '?startTime='+ params.start.toISOString() +
            '&endTime=' + params.end.toISOString() +
            '&resolution=' + $filter('graphResolution')(params.resolution, graph);
        }

        return $http.get(graphAPI, {cache: true})
        .then(function(response) {
          if (!params.snapshot) {
            response.data.timestamps = response.data.timestampSec.map(function(timestamp) { return timestamp * 1000; });
          }
          return response;
        })
        .catch(function(error) {
          if (error.status === 401) {
            CacheFactory.get('defaultCache').removeAll();
            let oldUrl = $location.url();
            $location.path('/login').search({url: oldUrl});
          }
          return $q.reject(error);
        });
      }
    };
  }
}());
