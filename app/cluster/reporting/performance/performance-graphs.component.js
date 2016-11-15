(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('performanceGraphs', {
      templateUrl: 'cluster/reporting/performance/performance-graphs-section.tpl.html',
      controller: [
        '$routeParams',
        '$filter',
        'SFD3LineGraph',
        'SFD3BarGraph',
        'PerformanceGraphsService',
        PerformanceGraphsController
      ]
    });

  function PerformanceGraphsController($routeParams, $filter, SFD3LineGraph, SFD3BarGraph, PerformanceGraphsService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      PerformanceGraphsService.update($routeParams.clusterID);
    };

    ctrl.staticDateRangeOptions = [
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 259200000, label: '3 Days'},
      {milliseconds: 604800000, label: '7 Days'},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days', default: true}
    ];

    ctrl.syncGraphs = [
      {
        service: PerformanceGraphsService,
        id: 'sync-graph-1-service',
        child: {
          title: 'Cluster Utilization',
          id: 'sync-graph-1-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              clusterUtilizationPct: 'Cluster Utilization'
            }
          },
          graph: new SFD3LineGraph(getGraphConfig('utilizationChild'))
        },
        context: {
          label: 'Cluster Utilization',
          id: 'sync-graph-1-context',
          graph: new SFD3BarGraph(getGraphConfig('utilizationContext'))
        }
      },
      {
        service: PerformanceGraphsService,
        id: 'sync-graph-2-service',
        child: {
          title: 'Cluster IOPS',
          id: 'sync-graph-2-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              readOpsPerSec: 'Read IOPS',
              writeOpsPerSec: 'Write IOPS',
              totalOpsPerSec: 'Total IOPS'
            }
          },
          graph: new SFD3LineGraph(getGraphConfig('iopsChild'))
        },
        context: {
          label: 'Cluster IOPS',
          id: 'sync-graph-2-context',
          graph: new SFD3BarGraph(getGraphConfig('iopsContext'))
        }
      },
      {
        service: PerformanceGraphsService,
        id: 'sync-graph-3-service',
        child: {
          title: 'Cluster Bandwidth',
          id: 'sync-graph-3-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              readBytesPerSec: 'Read Bytes',
              writeBytesPerSec: 'Write Bytes',
              totalBytesPerSec: 'Total Bytes'
            }
          },
          graph: new SFD3LineGraph(getGraphConfig('bandwidthChild'))
        },
        context: {
          label: 'Cluster Bandwidth',
          id: 'sync-graph-3-context',
          graph: new SFD3BarGraph(getGraphConfig('bandwidthContext'))
        }
      }
    ];

    function getGraphConfig(graph) {
      var graphConfigs = {
        utilizationChild: {
          bindTo: 'cluster-utilization-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestampSec',
            ids: ['clusterUtilizationPct'],
            axes: {
              clusterUtilizationPct: 'y0'
            },
            labels: {
              clusterUtilizationPct: 'Cluster Utilization'
            },
            colors: {
              clusterUtilizationPct: ['#ff0000']
            },
            textures: {
              clusterUtilizationPct: ['solid']
            }
          },
          margin: {
            top: 15,
            right: 20,
            bottom: 30
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
                spacing: 30
              }
            }
          }
        },
        utilizationContext: {
          bindTo: 'cluster-utilization-context',
          type: 'bar',
          showAxisLabel: true,
          data: {
            x: 'timestampSec',
            y: 'clusterUtilizationPct',
            color: '#0FAEE7'
          },
          margin: {
            top: 15,
            right: 10,
            left: 50
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
                spacing: 25
              }
            }
          }
        },
        iopsChild: {
          bindTo: 'cluster-iops-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestampSec',
            ids: ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec'],
            axes: {
              readOpsPerSec: 'y0',
              writeOpsPerSec: 'y0',
              totalOpsPerSec: 'y0'
            },
            labels: {
              readOpsPerSec: 'Read IOPS',
              writeOpsPerSec: 'Write IOPS',
              totalOpsPerSec: 'Total IOPS'
            },
            colors: {
              readOpsPerSec: ['#ff0000'],
              writeOpsPerSec: ['#00ff00'],
              totalOpsPerSec: ['#0000ff']
            },
            textures: {
              readOpsPerSec: ['solid'],
              writeOpsPerSec: ['solid'],
              totalOpsPerSec: ['solid']
            }
          },
          margin: {
            top: 15,
            right: 20,
            bottom: 30
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
                spacing: 30
              }
            }
          }
        },
        iopsContext: {
          bindTo: 'cluster-iops-context',
          type: 'bar',
          showAxisLabel: true,
          data: {
            x: 'timestampSec',
            y: 'totalOpsPerSec',
            color: '#0FAEE7'
          },
          margin: {
            top: 15,
            right: 10,
            left: 50
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
                spacing: 25
              }
            }
          }
        },
        bandwidthChild: {
          bindTo: 'cluster-bandwidth-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestampSec',
            ids: ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
            axes: {
              readBytesPerSec: 'y0',
              writeBytesPerSec: 'y0',
              totalBytesPerSec: 'y0'
            },
            labels: {
              readBytesPerSec: 'Read Bytes',
              writeBytesPerSec: 'Write Bytes',
              totalBytesPerSec: 'Total Bytes'
            },
            colors: {
              readBytesPerSec: ['#ff0000'],
              writeBytesPerSec: ['#00ff00'],
              totalBytesPerSec: ['#0000ff']
            },
            textures: {
              readBytesPerSec: ['solid'],
              writeBytesPerSec: ['solid'],
              totalBytesPerSec: ['solid']
            }
          },
          margin: {
            top: 15,
            right: 20,
            bottom: 30
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
                format: bytesFormat,
                spacing: 30
              }
            }
          }
        },
        bandwidthContext: {
          bindTo: 'cluster-bandwidth-context',
          type: 'bar',
          showAxisLabel: true,
          data: {
            x: 'timestampSec',
            y: 'totalBytesPerSec',
            color: '#0FAEE7'
          },
          margin: {
            top: 15,
            right: 10,
            left: 50
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
                format: bytesFormat,
                spacing: 25
              }
            }
          }
        }
      };
      return graphConfigs[graph];
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
