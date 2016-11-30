(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('capacityGraphs', {
      templateUrl: 'cluster/reporting/capacity/capacity-graphs-section.tpl.html',
      controller: [
        '$routeParams',
        '$filter',
        'DataService',
        'SFD3LineGraph',
        'SFD3BarGraph',
        'CapacityGraphsService',
        CapacityGraphsController
      ]
    });

  function CapacityGraphsController($routeParams, $filter, DataService, SFD3LineGraph, SFD3BarGraph, CapacityGraphsService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      CapacityGraphsService.update($routeParams.clusterID);
      ctrl.getClusterFullThresholdState = 'loading';
      DataService.callAPI('GetClusterFullThreshold', {clusterID: parseInt($routeParams.clusterID)})
        .then(function(response) {
          ctrl.clusterFullThreshold = response.clusterFullThreshold;
          ctrl.getClusterFullThresholdState = 'loaded';
        }).catch(function() {
          ctrl.getClusterFullThresholdState = 'error';
        });
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
        service: CapacityGraphsService,
        id: 'sync-graph-1-service',
        child: {
          title: 'Block Capacity',
          id: 'sync-graph-1-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              maxUsedSpace: 'Max Used Space',
              usedSpace: 'Used Space'
            }
          },
          dataLimit: 500,
          graph: new SFD3LineGraph(getGraphConfig('blockChild'))
        },
        context: {
          label: 'Block Capacity',
          id: 'sync-graph-1-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('blockContext'))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'sync-graph-2-service',
        child: {
          title: 'Metadata Capacity',
          id: 'sync-graph-2-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            }
          },
          dataLimit: 500,
          graph: new SFD3LineGraph(getGraphConfig('metadataChild'))
        },
        context: {
          label: 'Metadata Capacity',
          id: 'sync-graph-2-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('metadataContext'))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'sync-graph-3-service',
        child: {
          title: 'Provisioned Space',
          id: 'sync-graph-3-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              provisionedSpace: 'Provisioned Space'
            }
          },
          dataLimit: 500,
          graph: new SFD3LineGraph(getGraphConfig('provisionedChild'))
        },
        context: {
          label: 'Provisioned Space',
          id: 'sync-graph-3-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('provisionedContext'))
        }
      }
    ];

    function getGraphConfig(graph) {
      var graphConfigs = {
        blockChild: {
          bindTo: 'cluster-block-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['maxUsedSpace', 'usedSpace'],
            axes: {
              maxUsedSpace: 'y0',
              usedSpace: 'y0'
            },
            labels: {
              maxUsedSpace: 'Max Used Space',
              usedSpace: 'Used Space'
            },
            colors: {
              maxUsedSpace: ['#D07983'],
              usedSpace: ['#E16482', '#00A7C6', '#10E8A5']
            },
            textures: {
              maxUsedSpace: ['dashed'],
              usedSpace: ['solid']
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
                format: yAxisFormat,
                spacing: 30
              }
            }
          }
        },
        blockContext: {
          bindTo: 'cluster-block-context',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'usedSpace',
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
                format: yAxisFormat,
                spacing: 25
              }
            }
          }
        },
        metadataChild: {
          bindTo: 'cluster-metadata-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['maxUsedMetadataSpace', 'usedMetadataSpace'],
            axes: {
              maxUsedMetadataSpace: 'y0',
              usedMetadataSpace: 'y0'
            },
            labels: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            },
            colors: {
              maxUsedMetadataSpace: ['#D07983'],
              usedMetadataSpace: ['#E16482', '#00A7C6', '#10E8A5']
            },
            textures: {
              maxUsedMetadataSpace: ['dashed'],
              usedMetadataSpace: ['solid']
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
                format: yAxisFormat,
                spacing: 30
              }
            }
          }
        },
        metadataContext: {
          bindTo: 'cluster-metadata-context',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'usedMetadataSpace',
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
                format: yAxisFormat,
                spacing: 25
              }
            }
          }
        },
        provisionedChild: {
          bindTo: 'cluster-provisioned-child',
          type: 'line',
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: ['provisionedSpace'],
            axes: {
              provisionedSpace: 'y0'
            },
            labels: {
              provisionedSpace: 'Provisioned Space'
            },
            colors: {
              provisionedSpace: ['#FECD4D']
            },
            textures: {
              provisionedSpace: ['solid']
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
                format: yAxisFormat,
                spacing: 30
              }
            }
          }
        },
        provisionedContext: {
          bindTo: 'cluster-provisioned-context',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'provisionedSpace',
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
                spacing: 290
              }
            },
            y0: {
              tick: {
                format: yAxisFormat,
                spacing: 25
              }
            }
          }
        }
      };

      return graphConfigs[graph];
    }
    /***********************  Helper Functions  ************************/

    function xAxisFormat(milliseconds) {
      return $filter('date')(new Date(milliseconds), 'short');
    }

    function yAxisFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, false);
    }
  }
})();
