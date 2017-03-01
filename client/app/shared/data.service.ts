export function DataService($q, $http, $filter, $location, CacheFactory) {
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
    callAPI(method, params = {}) {
      const request = {method: method, params: params};
      return $http.post('/json-rpc/2.0', request)
        .then( response => {
          return response.data.result;
        })
        .catch( error => {
          if (error.status === 401) {
            redirectToLogin();
          }
          return error.data;
        });
    },

    callGuzzleAPI(clusterID, method) {
      let guzzleAPI;
      if (!clusterID) {
        return $q.reject();
      }
      guzzleAPI = `/state/cluster/${clusterID}`;
      if (method) {
        guzzleAPI += `/${method}`;
      }

      return $http.get(guzzleAPI, {cache: true})
        .then( response => response.data )
        .catch( error => {
          if (error.status === 401) {
            redirectToLogin();
          }
          if (error.status === 404) {
            // 404 means "no data" in guzzle, so shouldn't be considered an error
            return $q.resolve([]);
          }
          return $q.reject(error);
        });
    },

    callGraphAPI(graph, params) {
      let graphAPI = `/graph/cluster/${params.clusterID}`;

      if (params.volumeID) {
        graphAPI += `/volume/${params.volumeID}`;
      }
      graphAPI += `/${graph}`;

      if (params.snapshot) {
        graphAPI += '/snapshot';
      } else {
        graphAPI += '?startTime=' + params.start.toISOString() +
          '&endTime=' + params.end.toISOString() +
          '&resolution=' + $filter('graphResolution')(params.resolution, graph);
      }

      return $http.get(graphAPI, {cache: true})
        .then( response => {
          if (!params.snapshot) {
            response.data.timestamps = response.data.timestampSec.map( timestamp => timestamp * 1000 );
          }
          return response;
        })
        .catch( error => {
          if (error.status === 401) {
            redirectToLogin();
          }
          return $q.reject(error);
        });
    }
  };

  function redirectToLogin() {
    CacheFactory.get('defaultCache').removeAll();
    let oldUrl = $location.url();
    $location.path('/login').search({url: oldUrl});
  }
}

DataService.$inject = ['$q', '$http', '$filter', '$location', 'CacheFactory'];
