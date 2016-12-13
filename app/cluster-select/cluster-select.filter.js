(function () {
    'use strict';
    angular
        .module('aiqUi')
        .filter('clusterSelectFilter', [clusterSelectFilter]);
    function regExpEscape(raw) {
        return raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function clusterSelectFilter() {
        return function (clusters, input) {
            if (!input) {
                return clusters;
            }
            var words = input.split(' ');
            var tokens = words.map(function (word) {
                var token, actual;
                if (word.toUpperCase().indexOf('VERSION:') === 0) {
                    actual = word.split(/:/).slice(1).join(':');
                    token = {
                        type: 'version',
                        pattern: new RegExp('^' + regExpEscape(actual), 'i')
                    };
                }
                else if (word.toUpperCase().indexOf('ID:') === 0) {
                    actual = word.split(/:/).slice(1).join(':');
                    token = {
                        type: 'clusterID',
                        pattern: new RegExp('^' + regExpEscape(actual), 'i')
                    };
                }
                else if (word.toUpperCase().indexOf('UID:') === 0) {
                    actual = word.split(/:/).slice(1).join(':');
                    token = {
                        type: 'clusterUID',
                        pattern: new RegExp('^' + regExpEscape(actual), 'i')
                    };
                }
                else if (word.toUpperCase().indexOf('UUID:') === 0) {
                    actual = word.split(/:/).slice(1).join(':');
                    token = {
                        type: 'clusterUUID',
                        pattern: new RegExp('^' + regExpEscape(actual), 'i')
                    };
                }
                else {
                    token = {
                        type: 'text',
                        pattern: new RegExp(regExpEscape(word), 'i')
                    };
                }
                return token;
            });
            return clusters.filter(function (cluster) {
                return tokens.filter(function (token) {
                    if (token.type === 'version') {
                        return cluster.apiVersion && cluster.apiVersion.search(token.pattern) >= 0;
                    }
                    else if (token.type === 'clusterID') {
                        return cluster.clusterID.toString().search(token.pattern) >= 0;
                    }
                    else if (token.type === 'clusterUID') {
                        return cluster.clusterUID.toString().search(token.pattern) >= 0;
                    }
                    else if (token.type === 'clusterUUID') {
                        return cluster.uuid && cluster.uuid.toString().search(token.pattern) >= 0;
                    }
                    else if (token.type === 'text') {
                        return cluster.customerName.search(token.pattern) >= 0 ||
                            cluster.clusterName.search(token.pattern) >= 0;
                    }
                }).length === tokens.length;
            });
        };
    }
})();
//# sourceMappingURL=cluster-select.filter.js.map