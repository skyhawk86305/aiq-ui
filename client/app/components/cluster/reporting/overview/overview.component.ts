(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('overviewDashboard', {
      template: require('./overview.tpl.html'),
      controller: [
        '$routeParams',
        '$filter',
        'DataService',
        'PerformanceGraphsService',
        'SFD3LineGraph',
        OverviewDashboardController
      ]
    });

  function OverviewDashboardController($routeParams, $filter, DataService, PerformanceGraphsService, SFD3LineGraph) {
    let ctrl = this;

    ctrl.$onInit = function() {
      PerformanceGraphsService.update($routeParams.clusterID);
      ctrl.getClusterSummaryState = 'loading';
      ctrl.getCapacitySnapshotState = 'loading';
      ctrl.getPerformanceSnapshotState = 'loading';
      ctrl.getClusterInfoState = 'loading';
      ctrl.getISCSISessionsState = 'loading';
      ctrl.getFibreChannelSessionsState = 'loading';
      ctrl.getActiveVolumesState = 'loading';
      ctrl.getLDAPState = 'loading';
      ctrl.getActiveNodesState = 'loading';
      setInfoBarData();
    };

    ctrl.graphs = {
      contextRange: getFiveDayRange(),
      service: PerformanceGraphsService,
      performance: {
        graph:  new SFD3LineGraph(getGraphConfig('performance')),
        legend: {
          position: 'bottom',
          items: {
            totalOpsPerSec: 'IOPS',
            totalBytesPerSec: 'Throughput'
          }
        }
      },
      utilization: {
        graph: new SFD3LineGraph(getGraphConfig('utilization')),
        legend: {
          position: 'bottom',
          items: {
            clusterUtilizationPct: 'Utilization'
          }
        }
      }
    };

    /**********************************/

    function setInfoBarData() {
      DataService.callAPI('GetClusterSummary', {clusterID: parseInt($routeParams.clusterID, 10)})
        .then(function(response) {
          if (response.cluster && !response.cluster.clusterVersion) {
            console.log('Trying to set clusterVersion');
            response.cluster.clusterVersion = '-';
            console.log('clusterVersion set');
          }
          ctrl.clusterSummary = response.cluster;
          ctrl.getClusterSummaryState = 'loaded';
        }).catch(function() {
          ctrl.getClusterSummaryState = 'error';
        });

      DataService.callGuzzleAPI($routeParams.clusterID, 'GetClusterInfo')
        .then(function (response) {
          ctrl.encryptionAtRestState = response && response.clusterInfo ? response.clusterInfo.encryptionAtRestState.toUpperCase() : '-';
          ctrl.getClusterInfoState = 'loaded';
        }).catch(function() {
          ctrl.getClusterInfoState = 'error';
        });

      DataService.callGuzzleAPI($routeParams.clusterID, 'ListISCSISessions')
        .then(function (response) {
          ctrl.iSCSISessionsCount = response && response.sessions ? response.sessions.length : 0;
          ctrl.getISCSISessionsState = 'loaded';
        }).catch(function() {
          ctrl.getISCSISessionsState = 'error';
        });

      /*DataService.callGuzzleAPI($routeParams.clusterID, 'ListFibreChannelSessions')
        .then(function (response) {
          ctrl.fibreChannelSessionsCount = response && response.sessions ? response.sessions.length : 0;
          ctrl.getFibreChannelSessionsState = 'loaded';
        }).catch(function() {
        ctrl.getFibreChannelSessionsState = 'error';
      });*/

      DataService.callGuzzleAPI($routeParams.clusterID, 'ListActiveVolumes')
        .then(function (response) {
          ctrl.volumesCount = response && response.volumes ? response.volumes.length : 0;
          ctrl.getActiveVolumesState = 'loaded';
        }).catch(function() {
          ctrl.getActiveVolumesState = 'error';
        });

      /*DataService.callGuzzleAPI($routeParams.clusterID, 'GetLdapConfiguration')
        .then(function (response) {
          ctrl.ldap = response && response.config ? response.config.toUpperCase() : '-';
          ctrl.getLDAPState = 'loaded';
        }).catch(function() {
        ctrl.getLDAPState = 'error';
      });*/

      DataService.callGuzzleAPI($routeParams.clusterID, 'ListActiveNodes')
        .then(function (response) {
          let nodeCount = {},
            formattedNodeCount = '';

          if (response && response.nodes) {
            nodeCount = getNodeCounts(response.nodes);
            formattedNodeCount = Object.keys(nodeCount).map(function(key) {
                return `${nodeCount[key]} - ${key}`;
              }).join(', ');
          }

          ctrl.nodeCount = formattedNodeCount ? formattedNodeCount : '-';
          ctrl.getActiveNodesState = 'loaded';
        }).catch(function() {
          ctrl.getActiveNodesState = 'error';
        });

      DataService.callGraphAPI('capacity', {clusterID: parseInt($routeParams.clusterID, 10), snapshot: true})
        .then(function(response) {
          ctrl.capacitySnapshot = response.data;
          ctrl.getCapacitySnapshotState = 'loaded';
        }).catch(function() {
          ctrl.getCapacitySnapshotState = 'error';
        });

      DataService.callGraphAPI('performance', {clusterID: parseInt($routeParams.clusterID, 10), snapshot: true})
        .then(function(response) {
          ctrl.performanceSnapshot = response.data;
          ctrl.getPerformanceSnapshotState = 'loaded';
        }).catch(function() {
          ctrl.getPerformanceSnapshotState = 'error';
        });
      ctrl.infoBarLastUpdated = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }

    ctrl.refreshInfoBarData = setInfoBarData;

    function getGraphConfig(graph) {
      let graphConfigs = {
        utilization: {
          bindTo: 'performance-utilization-graph',
          type: 'line',
          showAxisLabels: false,
          margin: {
            left: 50
          },
          data: {
            x: 'timestamps',
            ids: ['clusterUtilizationPct'],
            axes: {
              clusterUtilizationPct: 'y0',
            },
            labels: {
              clusterUtilizationPct: 'Utilization'
            },
            colors: {
              clusterUtilizationPct: ['#13CCE8']
            },
            textures: {
              clusterUtilizationPct: ['solid']
            }
          },
          axis: {
            x: {
              tick: {
                format: xAxisFormat,
                spacing: 150
              }
            },
            y0: {
              tick: {
                format: utilizationFormat,
                spacing: 100
              }
            }
          }
        },
        performance: {
          bindTo: 'cluster-performance-graph',
          type: 'line',
          showAxisLabels: false,
          margin: {
            left: 65,
            right: 65
          },
          data: {
            x: 'timestamps',
            ids: ['totalOpsPerSec', 'totalBytesPerSec'],
            axes: {
              totalOpsPerSec: 'y0',
              totalBytesPerSec: 'y1'
            },
            labels: {
              totalOpsPerSec: 'IOPS',
              totalBytesPerSec: 'Throughput'
            },
            colors: {
              totalOpsPerSec: ['#8372B5'],
              totalBytesPerSec: ['#FFCC75']
            },
            textures: {
              totalOpsPerSec: ['solid'],
              totalBytesPerSec: ['solid']
            }
          },
          tooltipFormat: {
            y0: function(d) { return d; }
          },
          axis: {
            x: {
              tick: {
                format: xAxisFormat,
                spacing: 150
              }
            },
            y0: {
              tick: {
                format: iopsFormat,
                spacing: 100
              }
            },
            y1: {
              tick: {
                format: bytesFormat,
                spacing: 100
              }
            }
          }
        }
      };

      return graphConfigs[graph];
    }

    function getFiveDayRange() {
      let now = Date.now(),
        fiveDaysMilliseconds = 432000000;

      return {
        start: new Date(now - fiveDaysMilliseconds),
        end: new Date(now)
      };
    }

    /***********************  Helper Functions  ************************/

    function xAxisFormat(milliseconds) {
      return $filter('date')(new Date(milliseconds), 'yyyy-MM-dd HH:mm:ss');
    }
    function utilizationFormat(utilization) {
      return $filter('percent')(utilization, 0, true, false, true, null, null);
    }
    function iopsFormat(iops) {
      return $filter('iops')(iops, 0);
    }
    function bytesFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, true);
    }

    function getNodeCounts(nodes) {
      let counts = {};
      nodes.forEach(function (node) {
        let nodeType = node.platformInfo ? (node.platformInfo.nodeType || '') : '';
        counts.hasOwnProperty(nodeType) ? counts[nodeType]++ : counts[nodeType] = 1;
      });
      return counts;
    }
  }
})();
