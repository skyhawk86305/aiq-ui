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

    ctrl.$onInit = initializeOverviewDashboard();
    ctrl.graphs = {
      contextRange: getContextRange(),
      service: ClusterPerformanceGraphService,
      performance: {
        graph:  new SFD3LineGraph(graphConfigs.performance),
        legend: {
          position: 'bottom',
          items: {
            totalOpsPerSec: 'IOPS',
            totalBytesPerSec: 'Throughput'
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

    /**********************************/

    function getGraphConfigs() {
      var graphConfigs = {
        performance: {},
        utilization: {}
      };

      graphConfigs.utilization = {
        bindTo: 'performance-utilization-graph',
        type: 'line',
        showAxisLabels: false,
        margin: {
          left: 50
        },
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
              format: xAxisFormat,
              spacing: 200
            }
          },
          y0: {
            tick: {
              format: utilizationFormat,
              spacing: 100
            }
          }
        }
      };

      graphConfigs.performance = {
        bindTo: 'cluster-performance-graph',
        type: 'line',
        showAxisLabels: false,
        margin: {
          left: 50,
          right: 60
        },
        data: {
          x: 'timestampSec',
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
        axis: {
          x: {
            tick: {
              format: xAxisFormat,
              spacing: 200
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
      };

      return graphConfigs;
    }

    function initializeOverviewDashboard(){
      ClusterPerformanceGraphService.update($routeParams.clusterID);
      AlertTableService.update($routeParams.clusterID);
      ctrl.alertTableService = AlertTableService;
      setInfoBarData();

      function setInfoBarData() {
        ctrl.infoBar = {};
        DataService.callAPI('GetClusterSummary', {clusterID: parseInt($routeParams.clusterID)})
          .then(function(response) {
            var result = response.cluster;
            ctrl.clusterName = result.clusterName;
            ctrl.infoBar.nodeCount = result.nodeCount;
            ctrl.infoBar.blockCapacity = result.clusterFull.blockFullness;
            ctrl.infoBar.metadataCapacity = result.clusterFull.metadataFullness;
            ctrl.infoBar.clusterFaults =  {
              warning: result.unresolvedFaults.warning ? result.unresolvedFaults.warning : 0,
              error: result.unresolvedFaults.error ? result.unresolvedFaults.error : 0
            };
          });

        DataService.callGraphAPI('capacity', {clusterID: parseInt($routeParams.clusterID), snapshot: true})
          .then(function(response) {
            var result = response.data;
            ctrl.infoBar.efficiency = result.efficiencyFactor;
          });

        DataService.callGraphAPI('performance', {clusterID: parseInt($routeParams.clusterID), snapshot: true})
          .then(function(response) {
            var result = response.data;
            ctrl.infoBar.utilization = result.clusterUtilizationPct;
            ctrl.infoBar.iops = result.totalOpsPerSec;
            ctrl.infoBar.throughput = formatThroughputResponse(result.totalBytesPerSec);

            function formatThroughputResponse(totalBytes) {
              var throughput = {},
                formattedThroughput = '';

              formattedThroughput = $filter('bytes')(totalBytes);
              throughput.value = formattedThroughput.slice(0, formattedThroughput.length-3);
              throughput.unit = formattedThroughput.slice(formattedThroughput.length-2) + '/s';
              return throughput;
            }
          });
      }
    }

    function getContextRange() {
      var now = Date.now(),
        fiveDaysMilliseconds = 43200000,
        range = {};

      range.start = new Date(now - fiveDaysMilliseconds);
      range.end = new Date(now);
      return range;
    }

    /***********************  Helper Functions  ************************/

    function xAxisFormat(milliseconds) {
      return $filter('date')(new Date(milliseconds), 'short');
    }
    function utilizationFormat(utilization) {
      return $filter('aiqData')(utilization, {type: 'wholePercent'});
    }
    function iopsFormat(iops) {
      return $filter('iops')(iops, 0);
    }
    function bytesFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, false);
    }
  }
})();
