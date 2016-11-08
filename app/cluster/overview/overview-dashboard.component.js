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
        'AlertsTableService',
        'SFD3LineGraph',
        OverviewDashboardController
      ]
    });

  function OverviewDashboardController($routeParams, $filter, DataService, ClusterPerformanceGraphService, CapacityUseGraphService, AlertsTableService, SFD3LineGraph) {
    var ctrl = this,
        graphConfigs = getGraphConfigs();

    ctrl.clusterName = '';
    ctrl.graphs = {
      capacityUse: {
        service: CapacityUseGraphService,
        graph: null,
        legend: {
          position: 'bottom',
          items: {}
        }
      },
      clusterPerformance: {
        service: ClusterPerformanceGraphService,
        graph: null,
        legend: {
          position: 'bottom',
          items: {}
        }
      }
    };
    ctrl.staticDateRanges = [
      {milliseconds: 86400000, label: 'Last 24 Hours'},
      {milliseconds: 432000000, label: 'Last 5 Days'},
      {milliseconds: 604800000, label: 'Last 7 Days'},
      {milliseconds: 1209600000, label: 'Last 14 Days'},
      {milliseconds: 2592000000, label: 'Last 30 Days', default: true}
    ];
    ctrl.clusterInfoBar = {};
    ctrl.alertsTable = { //do we want to keep this as an object for consistency sake or ? 
      service: AlertsTableService
    };

    ctrl.$onInit = function() {
      ctrl.clusterPerformanceGraph.service.update($routeParams.clusterID);
      ctrl.capacityUseGraphService.service.update($routeParams.clusterID);
      ctrl.alertsTable.service.update($routeParams.clusterID);

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
        ctrl.graphs.capacityUse.legend.items[$routeParams.clusterID] = ctrl.clusterName;
        ctrl.graphs.clusterPerformance.legend.items = {
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
          ids: [$routeParams.clusterID]
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

  }
})();
