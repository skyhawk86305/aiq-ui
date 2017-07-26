class EfficiencyGraphsController {
  public syncGraphs: Array<Object>;
  public volumeID: number;
  public clusterID: number;
  public staticDateRangeOptions: Array<Object>;

  static $inject = ['$routeParams', '$filter', 'SFD3LineGraph', 'SFD3BarGraph', 'EfficiencyGraphsService'];

  constructor(private $routeParams, private $filter, private SFD3LineGraph, private SFD3BarGraph, private EfficiencyGraphsService) {
  }

  $onInit() {
    this.EfficiencyGraphsService.update(parseInt(this.$routeParams.clusterID, 10));
    this.staticDateRangeOptions = [ {milliseconds: 3600000, label: 'Hour'},
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 604800000, label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'} ];
    this.syncGraphs = [
      {
        service: this.EfficiencyGraphsService,
        id: 'efficiency',
        selected: {
          title: 'Efficiency',
          export: true,
          legend: {
            items: {
              thinProvisioningFactor: 'Thin Provisioning Efficiency',
              deDuplicationFactor: 'Deduplication Efficiency',
              compressionFactor: 'Compression Efficiency',
              efficiencyFactor: 'Overall Efficiency'
            }
          },
          dataLimit: 750,
          graph: new this.SFD3LineGraph(this.getGraphConfig('efficiency'))
        },
        sparkLine: {
          title: 'Efficiency',
          dataLimit: 175,
          graph: new this.SFD3LineGraph(this.getGraphConfig('efficiency', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new this.SFD3BarGraph(this.getGraphConfig('efficiency', true))
        }
      }
    ];
  }

  getGraphConfig(graph, context = false, sparkLine = false) {
    const graphType = context ? 'context' : 'child';
    const graphConfigs = {
      efficiency: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['efficiencyFactor'] : ['thinProvisioningFactor', 'deDuplicationFactor', 'compressionFactor', 'efficiencyFactor'],
            axes: {
              thinProvisioningFactor: 'y0',
              deDuplicationFactor: 'y0',
              compressionFactor: 'y0',
              efficiencyFactor: 'y0'
            },
            labels: {
              thinProvisioningFactor: 'Thin Provisioning Efficiency',
              deDuplicationFactor: 'Deduplication Efficiency',
              compressionFactor: 'Compression Efficiency',
              efficiencyFactor: 'Overall Efficiency'
            },
            colors: {
              thinProvisioningFactor: ['#00996B'],
              deDuplicationFactor: ['#95ADAD'],
              compressionFactor: ['#39426B'],
              efficiencyFactor: ['#00A7C6']
            },
            textures: {
              thinProvisioningFactor: 'solid',
              deDuplicationFactor: 'solid',
              compressionFactor: 'solid',
              efficiencyFactor: 'solid'
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
                format: (milliseconds) => this.$filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (factor) => this.$filter('percent')(factor, 2, true, true, false, null, null),
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
            y: 'efficiencyFactor',
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
                format: (factor) => this.$filter('percent')(factor, 2, true, true, false, null, null),
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

export const EfficiencyGraphsComponent = {
  template: require('./efficiency.tpl.html'),
  controller: EfficiencyGraphsController
};
