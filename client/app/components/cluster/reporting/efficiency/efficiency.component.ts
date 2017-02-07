(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('efficiencyGraphs', {
      template: require('./efficiency.tpl.html'),
      controller: [
        '$routeParams',
        '$filter',
        'SFD3LineGraph',
        'SFD3BarGraph',
        'EfficiencyGraphsService',
        EfficiencyGraphsController
      ]
    });

  function EfficiencyGraphsController($routeParams, $filter, SFD3LineGraph, SFD3BarGraph, EfficiencyGraphsService) {
    let ctrl = this;

    ctrl.$onInit = function() {
      EfficiencyGraphsService.update($routeParams.clusterID);
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
        service: EfficiencyGraphsService,
        id: 'efficiency',
        child: {
          title: 'Efficiency',
          id: 'efficiency-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              thinProvisioningFactor: 'Thin Provisioning Efficiency',
              deDuplicationFactor: 'Deduplication Efficiency',
              compressionFactor: 'Compression Efficiency',
              efficiencyFactor: 'Overall Efficiency'
            }
          },
          dataLimit: 500,
          graph: new SFD3LineGraph(getGraphConfig('efficiencyChild'))
        },
        context: {
          label: 'Efficiency',
          id: 'efficiency-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('efficiencyContext'))
        }
      }
    ];

    function getGraphConfig(graph) {
      let graphConfigs = {
        efficiencyChild: {
          bindTo: 'efficiency-child-graph',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['thinProvisioningFactor', 'deDuplicationFactor', 'compressionFactor', 'efficiencyFactor'],
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
              thinProvisioningFactor: ['#50E3C2'],
              deDuplicationFactor: ['#FECD4D'],
              compressionFactor: ['#6A6E94'],
              efficiencyFactor: ['#00A7C6']
            },
            textures: {
              thinProvisioningFactor: ['solid'],
              deDuplicationFactor: ['solid'],
              compressionFactor: ['solid'],
              efficiencyFactor: ['solid']
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
                format: xAxisFormat,
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: yAxisFormat,
                spacing: 30
              }
            }
          }
        },
        efficiencyContext: {
          bindTo: 'efficiency-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'efficiencyFactor',
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
                format: yAxisFormat,
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

    function yAxisFormat(factor) {
      return $filter('percent')(factor, 2, true, true, false, null, null);
    }
  }
})();
