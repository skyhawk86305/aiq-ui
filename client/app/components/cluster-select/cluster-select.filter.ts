import * as _ from 'lodash';

export class ClusterSelectFilter {
  constructor() {
    return function(clusters, input) {
      if (!input) {
        return clusters;
      }
      const tokens = input.split(' ').map( word => {
        if (word.toUpperCase().indexOf('VERSION:') === 0) {
          const value = word.split(/:/).slice(1).join(':');
          return {
            type: 'version',
            pattern: new RegExp('^' + _.escapeRegExp(value), 'i'),
          };
        }
        if (word.toUpperCase().indexOf('ID:') === 0) {
          const value = word.split(/:/).slice(1).join(':');
          return {
            type: 'clusterID',
            pattern: new RegExp('^' + _.escapeRegExp(value), 'i'),
          };
        }
        return {
          type: 'text',
          pattern: new RegExp(_.escapeRegExp(word), 'i'),
        };
      });

      return clusters.filter( cluster =>
        _.every(tokens, token => {
          switch (token.type) {
            case 'version':
              return cluster.version && cluster.version.search(token.pattern) >= 0;
            case 'clusterID':
              return cluster.id.toString().search(token.pattern) >= 0;
            case 'text':
              return cluster.customerName.search(token.pattern) >= 0 ||
                cluster.name.search(token.pattern) >= 0;
          }
        })
      );
    };
  };
}
