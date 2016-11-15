(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('overviewDashboard', {
      templateUrl: 'cluster/reporting/overview/overview-dashboard.tpl.html',
      controller: [
        '$routeParams',
        '$filter',
        'DataService',
        'PerformanceGraphsService',
        'ClusterAlertTableService',
        'SFD3LineGraph',
        OverviewDashboardController
      ]
    });

  function OverviewDashboardController($routeParams, $filter, DataService, PerformanceGraphsService, ClusterAlertTableService, SFD3LineGraph) {
    var ctrl = this;

    ctrl.$onInit = function() {
      PerformanceGraphsService.update($routeParams.clusterID);
      ClusterAlertTableService.update($routeParams.clusterID);
      ctrl.clusterAlertTableService = ClusterAlertTableService;
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
      DataService.callAPI('GetClusterSummary', {clusterID: parseInt($routeParams.clusterID)})
        .then(function(response) {
          ctrl.clusterSummary = response.cluster;
        });

      DataService.callGraphAPI('capacity', {clusterID: parseInt($routeParams.clusterID), snapshot: true})
        .then(function(response) {
          ctrl.capacitySnapshot = response.data;
        });

      DataService.callGraphAPI('performance', {clusterID: parseInt($routeParams.clusterID), snapshot: true})
        .then(function(response) {
          ctrl.performanceSnapshot = response.data;
        });
    }

    function getGraphConfig(graph) {
      var graphConfigs = {
        utilization: {
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
        },
        performance: {
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
        }
      };

      return graphConfigs[graph];
    }

    function getFiveDayRange() {
      var now = Date.now(),
        fiveDaysMilliseconds = 43200000,
        range = {};

      range.start = new Date(now - fiveDaysMilliseconds);
      range.end = new Date(now);
      return range;
    }

    /***********************  Helper Functions  ************************/

    function xAxisFormat(seconds) {
      return $filter('date')(new Date(seconds*1000), 'short');
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
