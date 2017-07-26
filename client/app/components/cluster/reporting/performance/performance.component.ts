class PerformanceGraphsController {
  public staticDateRangeOptions: Array<Object>;
  public syncGraphs: Array<Object>;

  static $inject = ['$routeParams', '$filter', 'SFD3LineGraph', 'SFD3BarGraph', 'PerformanceGraphsService',];

  constructor(private $routeParams, private $filter, private SFD3LineGraph, private SFD3BarGraph, private PerformanceGraphsService) {
  }

  $onInit() {
    this.PerformanceGraphsService.update(parseInt(this.$routeParams.clusterID, 10));
    this.staticDateRangeOptions = [ {milliseconds: 3600000, label: 'Hour'},
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 604800000, label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'} ];
    this.syncGraphs = [
      {
        service: this.PerformanceGraphsService,
        id: 'iops',
        selected: {
          title: 'IOPS',
          export: true,
          legend: {
            items: {
              readOpsPerSec: 'Read IOPS',
              writeOpsPerSec: 'Write IOPS',
              totalOpsPerSec: 'Total IOPS'
            }
          },
          dataLimit: 750,
          graph: new this.SFD3LineGraph(this.getGraphConfig('iops'))
        },
        sparkLine: {
          title: 'IOPS',
          dataLimit: 175,
          graph: new this.SFD3LineGraph(this.getGraphConfig('iops', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new this.SFD3BarGraph(this.getGraphConfig('iops', true))
        }
      },
      {
        service: this.PerformanceGraphsService,
        id: 'throughput',
        selected: {
          title: 'Throughput',
          export: true,
          legend: {
            items: {
              readBytesPerSec: 'Read Throughput',
              writeBytesPerSec: 'Write Throughput',
              totalBytesPerSec: 'Total Throughput'
            }
          },
          dataLimit: 750,
          graph: new this.SFD3LineGraph(this.getGraphConfig('throughput'))
        },
        sparkLine: {
          title: 'Throughput',
          dataLimit: 175,
          graph: new this.SFD3LineGraph(this.getGraphConfig('throughput', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new this.SFD3BarGraph(this.getGraphConfig('throughput', true))
        }
      },
      {
        service: this.PerformanceGraphsService,
        id: 'utilization',
        selected: {
          title: 'Utilization',
          export: true,
          legend: {
            items: {
              clusterUtilizationPct: 'Utilization'
            }
          },
          dataLimit: 750,
          graph: new this.SFD3LineGraph(this.getGraphConfig('utilization'))
        },
        sparkLine: {
          title: 'Utilization',
          dataLimit: 175,
          graph: new this.SFD3LineGraph(this.getGraphConfig('utilization', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new this.SFD3BarGraph(this.getGraphConfig('utilization', true))
        }
      }
    ];
  }

  getGraphConfig(graph, context = false, sparkLine = false) {
    const graphType = context ? 'context' : 'child';
    const graphConfigs = {
      iops: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['totalOpsPerSec'] : ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec'],
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
              readOpsPerSec: 'solid',
              writeOpsPerSec: 'solid',
              totalOpsPerSec: 'solid'
            }
          },
          margin: {
            top: sparkLine ? 10 : 20,
            right: sparkLine ? 10 : 75,
            bottom: sparkLine ? 10 : 30,
            left: sparkLine ? 10 : 75
          },
          tooltipFormat: {
            y0: (d) => {
              return d;
            }
          },
          axis: {
            x: {
              tick: {
                format: (milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (iops) => this.$filter('iops')(iops, true, 1),
                spacing: 50
              }
            }
          }
        },
        context: {
          bindTo: graph + '-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'totalOpsPerSec',
            color: '#6F7D9A'
          },
          margin: {
            top: 15,
            right: 10,
            left: 50
          },
          axis: {
            x: {
              tick: {
                format: (milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (iops) => this.$filter('iops')(iops, true, 1),
                spacing: 30
              }
            }
          }
        }
      },
      throughput: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['totalBytesPerSec'] : ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
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
              readBytesPerSec: 'solid',
              writeBytesPerSec: 'solid',
              totalBytesPerSec: 'solid'
            }
          },
          margin: {
            top: sparkLine ? 10 : 20,
            right: sparkLine ? 10 : 75,
            bottom: sparkLine ? 10 : 30,
            left: sparkLine ? 10 : 75
          },
          axis: {
            x: {
              tick: {
                format:(milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (bytes) => this.$filter('bytes')(bytes, false, 0, true),
                spacing: 50
              }
            }
          }
        },
        context: {
          bindTo: 'throughput-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'totalBytesPerSec',
            color: '#6F7D9A'
          },
          margin: {
            top: 15,
            right: 10,
            left: 70
          },
          axis: {
            x: {
              tick: {
                format: (milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (bytes) => this.$filter('bytes')(bytes, false, 0, true),
                spacing: 30
              }
            }
          }
        }
      },
      utilization: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['clusterUtilizationPct'] : ['clusterUtilizationPct'],
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
              clusterUtilizationPct: 'solid'
            }
          },
          margin: {
            top: sparkLine ? 10 : 20,
            right: sparkLine ? 10 : 75,
            bottom: sparkLine ? 10 : 30,
            left: sparkLine ? 10 : 75
          },
          axis: {
            x: {
              tick: {
                format:(milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (utilization) => this.$filter('percent')(utilization, 0, true, false, true, null, null),
                spacing: 50
              }
            }
          }
        },
        context: {
          bindTo: 'utilization-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'clusterUtilizationPct',
            color: '#6F7D9A'
          },
          margin: {
            top: 15,
            right: 10,
            left: 50
          },
          axis: {
            x: {
              tick: {
                format: (milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (utilization) => this.$filter('percent')(utilization, 0, true, false, true, null, null),
                spacing: 30
              }
            }
          }
        }
      }
    };
    return graphConfigs[graph][graphType];
  }
}

export const PerformanceGraphsComponent = {
  template: require('./performance.tpl.html'),
  controller: PerformanceGraphsController
};
