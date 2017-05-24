import * as _ from 'lodash';

export function ElementClientFactory($q, $http, DataService) {
  return class ElementClient {
    private hostname: string;

    constructor(
      private mvip: string,
      private username: string,
      private password: string
    ) {
      const dashedMVIP = mvip.replace(/\./g, '-');
      this.hostname = `${dashedMVIP}.ip.solidfire.net`;
    }

    callAPI(method: string, params = {}, apiVersion = '2.0') {
      return $http
        .post(
          `https://${this.hostname}/json-rpc/${apiVersion}`,
          { method, params },
          { headers: { Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`) } }
        )
        .catch( err => {
          if (err.status === 401) {
            return $q.reject('unauthenticated');
          }
          return $q.reject(err.data || err);
        })
        .then( response => {
          const err = _.get(response, 'data.error');
          if (err) {
            return $q.reject(err);
          }
          return _.get(response, 'data.result');
        });
    }
  }
}

ElementClientFactory.$inject = ['$q', '$http', 'DataService'];
