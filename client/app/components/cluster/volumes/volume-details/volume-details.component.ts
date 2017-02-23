(function () {
  'use strict';

  const moduleName     = 'aiqUi';
  const componentName  = 'volumeDetails';
  const controllerDeps = ['$filter', '$routeParams', 'VolumeDetailsService', 'VolumePerformanceGraphService', 'DataService', 'SFD3LineGraph', 'SFD3BarGraph'];

  class VolumeDetailsController {
    public volume;
    public volumeStats;
    public snapshots;
    public averageVolumePerformance;
    public volumeID:               number;
    public clusterID:              number;
    public clusterName:            string;
    public infoBarLastUpdated:     string;
    public staticDateRangeOptions: Array<any>;
    public syncGraphs:             Array<any>;
    public getVolumeStatus       = 'loading';
    public getVolumeStatsStatus  = 'loading';
    public getSnapshotsStatus    = 'loading';
    public getAverageVolumePerformanceStatus = 'loading';

    constructor( private $filter, private $routeParams, private VolumeDetailsService, private VolumePerformanceGraphService, private DataService, private SFD3LineGraph, private SFD3BarGraph) {
      'ngInject';
    }

    $onInit() {
      this.volumeID  = parseInt(this.$routeParams.volumeID, 10);
      this.clusterID = parseInt(this.$routeParams.clusterID, 10);
      this.VolumePerformanceGraphService.update(this.clusterID, this.volumeID);
      this.VolumeDetailsService.setVolume(this.clusterID, this.volumeID);
      this.setClusterName();
      this.setInfoBarData();
      this.staticDateRangeOptions = [
        {milliseconds: 86400000, label: '24 Hours'},
        {milliseconds: 259200000, label: '3 Days'},
        {milliseconds: 604800000, label: '7 Days', default: true},
        {milliseconds: 1209600000, label: '14 Days'},
        {milliseconds: 2592000000, label: '30 Days'}
      ];
      this.syncGraphs = [
        {
          service: this.VolumePerformanceGraphService,
          id: 'throughput',
          selected: {
            title: 'Throughput',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('throughput')),
            export: true,
            legend: {
              items: {
                readBytesPerSec: 'Read',
                writeBytesPerSec: 'Write',
                totalBytesPerSec: 'Total'
              }
            }
          },
          sparkLine: {
            title: 'Throughput',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('throughput', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('throughput', true))
          }
        },
        {
          service: this.VolumePerformanceGraphService,
          id: 'iops',
          selected: {
            title: 'IOPS',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('iops')),
            export: true,
            legend: {
              items: {
                readOpsPerSec: 'Read',
                writeOpsPerSec: 'Write',
                totalOpsPerSec: 'Total'
              }
            }
          },
          sparkLine: {
            title: 'IOPS',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('iops', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('iops', true))
          }
        },
        {
          service: this.VolumePerformanceGraphService,
          id: 'latency',
          selected: {
            title: 'Latency',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('latency')),
            export: true,
            legend: {
              items: {
                readLatencyUSec: 'Read',
                writeLatencyUSec: 'Write',
                latencyUSec: 'Average'
              }
            }
          },
          sparkLine: {
            title: 'Latency',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('latency', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('latency', true))
          }
        },
        {
          service: this.VolumePerformanceGraphService,
          id: 'queue-depth',
          selected: {
            title: 'Queue Depth',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('queueDepth')),
            export: true
          },
          sparkLine: {
            title: 'Queue Depth',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('queueDepth', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('queueDepth', true))
          }
        },
        {
          service: this.VolumePerformanceGraphService,
          id: 'average-io-size',
          selected: {
            title: 'Average IO Size',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('averageIOSize')),
            export: true
          },
          sparkLine: {
            title: 'Average IO Size',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('averageIOSize', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('averageIOSize', true))
          }
        },
        {
          service: this.VolumePerformanceGraphService,
          id: 'capacity',
          selected: {
            title: 'Capacity',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('capacity')),
            export: true,
            legend: {
              items: {
                usedCapacity: 'Used Capacity',
                provisionedCapacity: 'Provisioned Capacity',
              }
            }
          },
          sparkLine: {
            title: 'Capacity',
            dataLimit: 75,
            graph: new this.SFD3LineGraph(this.getGraphConfig('capacity', false, true))
          },
          context: {
            dataLimit: 200,
            graph: new this.SFD3BarGraph(this.getGraphConfig('capacity', true))
          }
        },
      ];
    }

    refreshInfoBarData() {
      this.setInfoBarData();
    }

    getUsedCapacity() {
      if (this.volume && this.volumeStats) {
        return this.volume.blockSize * this.volumeStats.nonZeroBlocks / this.volume.totalSize;
      }
    }

    private setClusterName() {
      return this.DataService.callAPI('GetClusterSummary', { clusterID: this.clusterID })
        .then( response => {
          this.clusterName = response.cluster.clusterName;
        });
    }

    private setInfoBarData() {
      this.VolumeDetailsService.getVolume()
        .then( volume => {
          this.volume = volume;
          this.getVolumeStatus = 'loaded';
        }).catch(err => {
          this.getVolumeStatus = 'error';
        });
      this.VolumeDetailsService.getVolumeStats()
        .then( volumeStats => {
          this.volumeStats = volumeStats;
          this.getVolumeStatsStatus = 'loaded';
        }).catch(err => {
          this.getVolumeStatsStatus = 'error';
        });
      this.VolumeDetailsService.getSnapshots()
        .then( snapshots => {
          this.snapshots = snapshots;
          this.getSnapshotsStatus = 'loaded';
        }).catch(err => {
          this.getSnapshotsStatus = 'error';
        });
      this.VolumeDetailsService.getAverageVolumePerformance()
        .then( response => {
          this.averageVolumePerformance = response;
          this.getAverageVolumePerformanceStatus = 'loaded';
        }).catch(err => {
          this.getAverageVolumePerformanceStatus = 'error';
        });
      this.infoBarLastUpdated = this.$filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }

    private getGraphConfig(graph, context = false, sparkLine = false) {
      const graphType = context ? 'context' : 'child',
        graphConfigs = {
        throughput: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: sparkLine ? ['totalBytesPerSec'] : ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
              axes: {
                readBytesPerSec:  'y0',
                writeBytesPerSec: 'y0',
                totalBytesPerSec: 'y0'
              },
              labels: {
                readBytesPerSec:  'Read Throughput',
                writeBytesPerSec: 'Write Throughput',
                totalBytesPerSec: 'Total Throughput'
              },
              colors: {
                readBytesPerSec:  ['#00996B'],
                writeBytesPerSec: ['#95ADAD'],
                totalBytesPerSec: ['#39426B']
              },
              textures : {
                readBytesPerSec:  'solid',
                writeBytesPerSec: 'solid',
                totalBytesPerSec: 'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date)  => { return this.xAxisFormat(date); },
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  format:  (bytes) => { return this.bytesFormat(bytes); },
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'totalBytesPerSec',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date)  => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format:  (bytes) => { return this.bytesFormat(bytes); },
                  spacing: 25
                }
              }
            }
          }
        },
        iops: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: sparkLine ? ['totalOpsPerSec'] : ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec'],
              axes: {
                readOpsPerSec:  'y0',
                writeOpsPerSec: 'y0',
                totalOpsPerSec: 'y0'
              },
              labels: {
                readOpsPerSec:  'Read IOPS',
                writeOpsPerSec: 'Write IOPS',
                totalOpsPerSec: 'Total IOPS'
              },
              colors: {
                readOpsPerSec:  ['#00996B'],
                writeOpsPerSec: ['#95ADAD'],
                totalOpsPerSec: ['#39426B']
              },
              textures : {
                readOpsPerSec:  'solid',
                writeOpsPerSec: 'solid',
                totalOpsPerSec: 'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => this.xAxisFormat(date),
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  format:  (iops) => this.iopsFormat(iops),
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'totalOpsPerSec',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format:  (iops) => this.iopsFormat(iops),
                  spacing: 25
                }
              }
            }
          }
        },
        latency: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: sparkLine ? ['latencyUSec'] : ['readLatencyUSec', 'writeLatencyUSec', 'latencyUSec'],
              axes: {
                readLatencyUSec:  'y0',
                writeLatencyUSec: 'y0',
                latencyUSec:      'y0'
              },
              labels: {
                readLatencyUSec:  'Read Latency',
                writeLatencyUSec: 'Write Latency',
                latencyUSec:      'Average Latency'
              },
              colors: {
                readLatencyUSec:  ['#00996B'],
                writeLatencyUSec: ['#95ADAD'],
                latencyUSec:      ['#39426B']
              },
              textures : {
                readLatencyUSec:  'solid',
                writeLatencyUSec: 'solid',
                latencyUSec:      'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'latencyUSec',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  spacing: 25
                }
              }
            }
          }
        },
        queueDepth: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: ['clientQueueDepth'],
              axes: {
                clientQueueDepth: 'y0'
              },
              labels: {
                clientQueueDepth: 'Queue Depth'
              },
              colors: {
                clientQueueDepth: ['#39426B']
              },
              textures : {
                clientQueueDepth: 'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'clientQueueDepth',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  spacing: 25
                }
              }
            }
          }
        },
        averageIOSize: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: ['averageIOPSize'],
              axes: {
                averageIOPSize: 'y0'
              },
              labels: {
                averageIOPSize: 'Average IO Size'
              },
              colors: {
                averageIOPSize: ['#39426B']
              },
              textures : {
                averageIOPSize: 'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'averageIOPSize',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  spacing: 25
                }
              }
            }
          }
        },
        capacity: {
          child: {
            bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
            showAxisLabels: true,
            sparkLine: sparkLine,
            data: {
              x: 'timestamps',
              ids: sparkLine ? ['usedCapacity'] : ['usedCapacity', 'provisionedCapacity'],
              axes: {
                usedCapacity:        'y0',
                provisionedCapacity: 'y0'
              },
              labels: {
                usedCapacity:        'Used Capacity',
                provisionedCapacity: 'Provisioned Capacity'
              },
              colors: {
                usedCapacity:        ['#39426B'],
                provisionedCapacity: ['#95ADAD']
              },
              textures : {
                usedCapacity:        'solid',
                provisionedCapacity: 'solid'
              }
            },
            margin: {
              top:    sparkLine ? 10 : 20,
              right:  sparkLine ? 10 : 75,
              bottom: sparkLine ? 10 : 30,
              left:   sparkLine ? 10 : 75
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 300
                }
              },
              y0: {
                tick: {
                  format:  (bytes) => { return this.capacityFormat(bytes); },
                  spacing: 50
                }
              }
            }
          },
          context: {
            bindTo: graph + '-context-graph',
            showAxisLabel: true,
            data: {
              x: 'timestamps',
              y: 'usedCapacity',
              color: '#6F7D9A'
            },
            margin: {
              top:    25,
              right:  25,
              bottom: 25,
              left:   50
            },
            axis: {
              x: {
                tick: {
                  format:  (date) => { return this.xAxisFormat(date); },
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format:  (bytes) => { return this.capacityFormat(bytes); },
                  spacing: 25
                }
              }
            }
          }
        }
      };

      return graphConfigs[graph][graphType];
    }

    /***********************  Axis Format Functions  ************************/

    private xAxisFormat(milliseconds) {
      return this.$filter('date')(new Date(milliseconds), 'yyyy-MM-dd HH:mm:ss');
    }
    private utilizationFormat(utilization) {
      return this.$filter('percent')(utilization, 0, true, false, true, null, null);
    }
    private iopsFormat(iops) {
      return this.$filter('iops')(iops, 0, true);
    }
    private bytesFormat(bytes) {
      return this.$filter('bytes')(bytes, false, 0, true);
    }
    private capacityFormat(bytes) {
      return this.$filter('bytes')(bytes, false, 0, false);
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template: require('./volume-details.tpl.html'),
      controller: [ ...controllerDeps, VolumeDetailsController],
    });
})();
