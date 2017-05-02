(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('performanceGraphs', {
      template: require('./performance.tpl.html'),
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
    let ctrl = this;

    ctrl.$onInit = function() {
      PerformanceGraphsService.update($routeParams.clusterID);
    };

    ctrl.staticDateRangeOptions = [
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 259200000, label: '3 Days'},
      {milliseconds: 604800000, label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'}
    ];

    ctrl.syncGraphs = [
      {
        service: PerformanceGraphsService,
        id: 'iops',
        child: {
          title: 'IOPS',
          id: 'iops-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              readOpsPerSec: 'Read IOPS',
              writeOpsPerSec: 'Write IOPS',
              totalOpsPerSec: 'Total IOPS'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('iopsChild'))
        },
        context: {
          label: 'IOPS',
          id: 'iops-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('iopsContext'))
        }
      },
      {
        service: PerformanceGraphsService,
        id: 'throughput',
        child: {
          title: 'Throughput',
          id: 'throughput-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              readBytesPerSec: 'Read Throughput',
              writeBytesPerSec: 'Write Throughput',
              totalBytesPerSec: 'Total Throughput'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('throughputChild'))
        },
        context: {
          label: 'Throughput',
          id: 'throughput-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('throughputContext'))
        }
      },
      {
        service: PerformanceGraphsService,
        id: 'utilization',
        child: {
          title: 'Utilization',
          id: 'utilization-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              clusterUtilizationPct: 'Utilization'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('utilizationChild'))
        },
        context: {
          label: 'Utilization',
          id: 'utilization-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('utilizationContext'))
        }
      }
    ];

    function getGraphConfig(graph) {
      let graphConfigs = {
        iopsChild: {
          bindTo: 'iops-child-graph',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
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
              readOpsPerSec: ['#E35090'],
              writeOpsPerSec: ['#FECD4D'],
              totalOpsPerSec: ['#00A7C6']
            },
            textures: {
              readOpsPerSec: ['solid'],
              writeOpsPerSec: ['solid'],
              totalOpsPerSec: ['solid']
            }
          },
          margin: {
            top: 20,
            right: 20,
            bottom: 30
          },
          tooltipFormat: {
            y0: (d) => { return d; }
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
          bindTo: 'iops-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
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
        throughputChild: {
          bindTo: 'throughput-child-graph',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
            axes: {
              readBytesPerSec: 'y0',
              writeBytesPerSec: 'y0',
              totalBytesPerSec: 'y0'
            },
            labels: {
              readBytesPerSec: 'Read Throughput',
              writeBytesPerSec: 'Write Throughput',
              totalBytesPerSec: 'Total Throughput'
            },
            colors: {
              readBytesPerSec: ['#E35090'],
              writeBytesPerSec: ['#FECD4D'],
              totalBytesPerSec: ['#00A7C6']
            },
            textures: {
              readBytesPerSec: ['solid'],
              writeBytesPerSec: ['solid'],
              totalBytesPerSec: ['solid']
            }
          },
          margin: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 70
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
        throughputContext: {
          bindTo: 'throughput-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'totalBytesPerSec',
            color: '#0FAEE7'
          },
          margin: {
            top: 15,
            right: 10,
            left: 70
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
        utilizationChild: {
          bindTo: 'utilization-child-graph',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['clusterUtilizationPct'],
            axes: {
              clusterUtilizationPct: 'y0'
            },
            labels: {
              clusterUtilizationPct: 'Utilization'
            },
            colors: {
              clusterUtilizationPct: ['#50E3C2']
            },
            textures: {
              clusterUtilizationPct: ['solid']
            }
          },
          margin: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 70
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
          bindTo: 'utilization-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
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
        }
      };
      return graphConfigs[graph];
    }
    /***********************  Helper Functions  ************************/

    function xAxisFormat(milliseconds) {
      return $filter('date')(new Date(milliseconds), 'yyyy-MM-dd HH:mm:ss');
    }
    function utilizationFormat(utilization) {
      return $filter('percent')(utilization, 0, true, false, true, null, null);
    }
    function iopsFormat(iops) {
      return $filter('iops')(iops, true, 1);
    }
    function bytesFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, true);
    }
  }
})();
