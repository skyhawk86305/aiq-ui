(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('overviewDashboard', {
      templateUrl: 'cluster/overview/overview-dashboard.tpl.html',
      controller: [
        '$routeParams',
        '$filter',
        'DataService',
        'ClusterPerformanceGraphService',
        'AlertTableService',
        'SFD3LineGraph',
        OverviewDashboardController
      ]
    });

  function OverviewDashboardController($routeParams, $filter, DataService, ClusterPerformanceGraphService, AlertTableService, SFD3LineGraph) {
    var ctrl = this,
        graphConfigs = getGraphConfigs();

    ctrl.$onInit = function() {
      ClusterPerformanceGraphService.update($routeParams.clusterID);
      AlertTableService.update($routeParams.clusterID);

      DataService.callAPI('GetClusterSummary', {clusterID: parseInt($routeParams.clusterID)})
        .then(function(response) {
          var result = response.cluster;
          ctrl.clusterName = result.clusterName;
          setInfobarData(result);
        });

      function setInfobarData(clusterData) {
        ctrl.clusterInfoBar = {
          nodeCount: clusterData.result,
          blockCapacity: clusterData.blockFullness,
          metadataCapacity: clusterData.metadataFullness,
          clusterFaults: {
            warning: clusterData.unresolvedFaults.warning,
            error: clusterData.unresolvedFaults.error
          }
        };
      }
    };

    ctrl.alertTableService = AlertTableService;
    ctrl.graphs = {
      contextRange: getContextRange(),
      service: ClusterPerformanceGraphService,
      performance: {
        graph:  new SFD3LineGraph(graphConfigs.performance),
        legend: {
          position: 'bottom',
          items: {
            totalOpsPerSec: 'IOPS',
            totalBytesPerSec: 'Bandwidth'
          }
        }
      },
      utilization: {
        graph: new SFD3LineGraph(graphConfigs.utilization),
        legend: {
          position: 'bottom',
          items: {
            clusterUtilizationPct: 'Utilization'
          }
        }
      }
    };

    function getGraphConfigs() {
      var graphConfigs = {
        performance: {},
        utilization: {}
      };

      graphConfigs.utilization = {
        bindTo: 'performance-utilization-graph',
        type: 'line',
        showAxisLabels: false,
        data: {
          x: 'timestampSec',
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
              format: '%m-%d-%Y',
              spacing: 200
            }
          },
          y0: {
            label: 'Utilization',
            tick: {
              format: '.3',
              spacing: 30
            }
          }
        }
      };

      graphConfigs.performance = {
        bindTo: 'cluster-performance-graph',
        type: 'line',
        showAxisLabels: false,
        data: {
          x: 'timestampSec',
          ids: ['totalOpsPerSec', 'totalBytesPerSec'],
          axes: {
            totalOpsPerSec: 'y0',
            totalBytesPerSec: 'y1'
          },
          labels: {
            totalOpsPerSec: 'IOPS',
            totalBytesPerSec: 'Bandwidth'
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
        axis: {
          x: {
            tick: {
              format: '%m-%d-%Y',
              spacing: 200
            }
          },
          y0: {
            label: 'IOPS',
            tick: {
              format: '.3',
              spacing: 30
            }
          },
          y1: {
            label: 'Bandwidth',
            tick: {
              format: '.3',
              spacing: 30
            }
          }
        }
      };

      return graphConfigs;
    }

    function getContextRange() {
      var now = Date.now(),
        fiveDaysMilliseconds = 43200000,
        range = {};

      range.start = new Date(now - fiveDaysMilliseconds);
      range.end = new Date(now);
      return range;
    }
  }
})();
