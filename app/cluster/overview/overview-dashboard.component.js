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
        'CapacityUseGraphService',
        'AlertTableService',
        'SFD3LineGraph',
        OverviewDashboardController
      ]
    });

  function OverviewDashboardController($routeParams, $filter, DataService, ClusterPerformanceGraphService, CapacityUseGraphService, AlertTableService, SFD3LineGraph) {
    var ctrl = this,
        graphConfigs = getGraphConfigs();

    ctrl.clusterName = '';
    ctrl.graphs = {
      contextRange: getContextRange(),
      service: ClusterPerformanceGraphService,
      performance: {
        graph: null,
        legend: {
          position: 'bottom',
          items: {}
        }
      },
      utilization: {
        graph: null,
        legend: {
          position: 'bottom',
          items: {}
        }
      }
    };
    ctrl.clusterInfoBar = {};
    ctrl.alertsTableService = AlertTableService;

    ctrl.$onInit = function() {
      ctrl.graphs.service.update($routeParams.clusterID);
      ctrl.alertsTableService.update($routeParams.clusterID);

      DataService.callAPI('GetClusterSummary', {clusterID: parseInt($routeParams.clusterID)})
        .then(function(response) {
          var result = response.cluster;
          ctrl.clusterName = result.clusterName;
          initializeGraphs();
          setInfobarData(result);
          //something with the table
        });

      function initializeGraphs() {
        ctrl.graphs.performance.graph = new SFD3LineGraph(graphConfigs.performance);
        ctrl.graphs.utilization.graph = new SFD3LineGraph(graphConfigs.utilization);
        ctrl.graphs.utilization.legend.items = {
          utilization: 'Utilization'
        };
        ctrl.graphs.performance.legend.items = {
          iops: 'IOPS',
          bandwidth: 'Bandwidth'
        };
      }

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
          ids: ['utilization'],
          axes: {
            utilization: 'y0',
          },
          labels: {
            utilization: 'Utilization'
          },
          colors: {
            utilization: ['#13CCE8']
          },
          textures: {
            utilization: ['solid']
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
          ids: ['iops', 'bandwidth'],
          axes: {
            iops: 'y0',
            bandwidth: 'y1'
          },
          labels: {
            iops: 'IOPS',
            bandwidth: 'Bandwidth'
          },
          colors: {
            iops: ['#8372B5'],
            bandwidth: ['#FFCC75']
          },
          textures: {
            iops: ['solid'],
            bandwidth: ['solid']
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
    }

    function getContextRange() {
      var now = Date.now(),
        fiveDaysMilliseconds = 432000000,
        range = {};

      range.start = new Date(now - fiveDaysMilliseconds);
      range.end = new Date(now);
      return range;
    }
  }
})();
