(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'iscsiSessions';
  const template = require('./iscsi-sessions.tpl.html');
  const deps = [ '$routeParams', '$filter', 'SFD3LineGraph', 'SFD3BarGraph', 'IscsiSessionsGraphService' ];

  class IscsiSessionsController {
    public staticDateRangeOptions;
    public syncGraphs;

    constructor(
      private $routeParams,
      private $filter,
      private SFD3LineGraph,
      private SFD3BarGraph,
      private IscsiSessionsGraphService
    ) {

      this.staticDateRangeOptions = [
        {milliseconds: 86400000, label: '24 Hours'},
        {milliseconds: 259200000, label: '3 Days'},
        {milliseconds: 604800000, label: '7 Days', default: true},
        {milliseconds: 1209600000, label: '14 Days'},
        {milliseconds: 2592000000, label: '30 Days'}
      ];

      this.syncGraphs = [
        {
          service: this.IscsiSessionsGraphService,
          id: 'iscsi-sessions',
          child: {
            title: 'iSCSI Sessions',
            id: 'iscsi-sessions-child',
            export: true,
            legend: {
              position: 'top',
              items: {
                activeSessions: 'Session Count',
                peakActiveSessions: 'Peak Session Count',
              }
            },
            dataLimit: 500,
            graph: new SFD3LineGraph(this.getGraphConfig('iscsiSessionsChild'))
          },
          context: {
            label: 'iSCSI Sessions',
            id: 'iscsi-sessions-context',
            dataLimit: 200,
            graph: new SFD3BarGraph(this.getGraphConfig('iscsiSessionsContext'))
          }
        }
      ];

    }

    $onInit() {
      this.IscsiSessionsGraphService.update(this.$routeParams.clusterID);
    }

    private getGraphConfig(graph) {
      let graphConfigs = {
        iscsiSessionsChild: {
          bindTo: 'iscsi-sessions-child-graph',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestampSec',
            ids: [ 'activeSessions', 'peakActiveSessions' ],
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
              activeSessions: ['solid'],
              peakActiveSessions: ['solid'],
            }
          },
          margin: {
            top: 20,
            right: 20,
            bottom: 30
          },
          axis: {
            x: {
              tick: {
                format: (ts) => this.xAxisFormat(ts),
                spacing: 200
              }
            },
            y0: {
              tick: {
                spacing: 30
              }
            }
          }
        },
        iscsiSessionsContext: {
          bindTo: 'iscsi-sessions-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestampSec',
            y: 'activeSessions',
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
                format: (ts) => this.xAxisFormat(ts),
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
      };

      return graphConfigs[graph];
    }

    private xAxisFormat(seconds) {
      return this.$filter('date')(new Date(seconds * 1000), 'yyyy-MM-dd HH:mm:ss');
    }
  }


  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, IscsiSessionsController ]
    });

})();
