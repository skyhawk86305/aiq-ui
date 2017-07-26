class IscsiGraphsController {
  public staticDateRangeOptions: Array<Object>;
  public syncGraphs: Array<Object>;
  public volumeID: number;
  public clusterID: number;

  static $inject = ['$routeParams', '$filter', 'SFD3LineGraph', 'SFD3BarGraph', 'IscsiSessionsGraphService',];

  constructor(private $routeParams, private $filter, private SFD3LineGraph, private SFD3BarGraph, private IscsiSessionsGraphService) {
  }

  $onInit() {
    this.IscsiSessionsGraphService.update(parseInt(this.$routeParams.clusterID, 10));
    this.staticDateRangeOptions = [ {milliseconds: 3600000, label: 'Hour'},
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 604800000, label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'} ];
    this.syncGraphs = [
      {
        service: this.IscsiSessionsGraphService,
        id: 'iscsi-sessions',
        selected: {
          title: 'iSCSI Sessions',
          export: true,
          legend: {
            items: {
              activeSessions: 'Active Sessions',
              peakActiveSessions: 'Peak Active Sessions',
            }
          },
          dataLimit: 750,
          graph: new this.SFD3LineGraph(this.getGraphConfig('iscsiSessions'))
        },
        sparkLine: {
          title: 'iSCSI Sessions',
          dataLimit: 175,
          graph: new this.SFD3LineGraph(this.getGraphConfig('iscsiSessions', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new this.SFD3BarGraph(this.getGraphConfig('iscsiSessions', true))
        }
      }
    ];
  }

  getGraphConfig(graph, context = false, sparkLine = false) {
    const graphType = context ? 'context' : 'child';
    const graphConfigs = {
      iscsiSessions: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['activeSessions'] : ['activeSessions', 'peakActiveSessions'],
            axes: {
              activeSessions: 'y0',
              peakActiveSessions: 'y0',
            },
            labels: {
              activeSessions: 'Session Count',
              peakActiveSessions: 'Peak Session Count',
            },
            colors: {
              activeSessions: ['#00A7C6'],
              peakActiveSessions: ['#6A6E94'],
            },
            textures: {
              activeSessions: 'solid',
              peakActiveSessions: 'solid',
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
            y: 'activeSessions',
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

export const IscsiGraphsComponent = {
  template: require('./iscsi-sessions.tpl.html'),
  controller: IscsiGraphsController
};
