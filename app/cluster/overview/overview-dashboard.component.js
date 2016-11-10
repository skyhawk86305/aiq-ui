(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('overviewDashboard', {
      templateUrl: 'cluster/capacity/capacity-graphs-section.tpl.html',
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
      performance: {
        service: ClusterPerformanceGraphService,
        graph: null,
        legend: {
          position: 'bottom',
          items: {}
        }
      },
      utilization: {
        service: ClusterPerformanceGraphService,
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
      ctrl.clusterPerformanceGraph.service.update($routeParams.clusterID);
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
        Object.keys(ctrl.graphs).forEach(function(key) {
          ctrl.graphs[key].graph = new SFD3LineGraph(graphConfigs[key]);
        });
        ctrl.graphs.utilization.legend.items[$routeParams.clusterID] = ctrl.clusterName;
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
        capacityUse: {},
        clusterPerformance: {}
      };
      graphConfigs.capacityUse = {
        bindTo: 'capacity-use-graph',
        type: 'line',
        height: 200,
        showAxisLabels: true,
        data: {
          x: 'timestampSec',
          ids: [$routeParams.clusterID],
          axes: {},
          labels: {},
          colors: {},
          textures: {}
        },
        axis: {
          x: {
            tick: {
              format: '%m-%d-%Y',
              spacing: 200
            }
          },
          y0: {
            label: 'TB',
            tick: {
              format: '.2',
              spacing: 30
            }
          }
        }
      };
      graphConfigs.capacityUse.data.axes[$routeParams.clusterID] = 'y0';
      graphConfigs.capacityUse.data.labels[$routeParams.clusterID] = ctrl.clusterName;
      graphConfigs.capacityUse.data.colors[$routeParams.clusterID] = '#00A7C6';
      graphConfigs.capacityUse.data.textures[$routeParams.clusterID] = ['solid'];

      graphConfigs.clusterPerformance = {
        bindTo: 'cluster-performance-graph',
        type: 'line',
        height: 200,
        showAxisLabels: true,
        data: {
          x: 'timestampSec',
          ids: ['iops', 'bandwidth'],
          axes: {
            iops: 'y0',
            bandwidth: 'y0'
          },
          labels: {
            iops: 'IOPS',
            bandwidth: 'Bandwidth'
          },
          colors: {
            iops: ['#ff0000'],
            bandwidth: ['#10E8A5']
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
            label: 'TB',
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
