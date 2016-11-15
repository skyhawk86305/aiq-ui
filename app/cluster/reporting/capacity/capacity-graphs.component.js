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

      DataService.callAPI('GetClusterFullThreshold', {clusterID: parseInt($routeParams.clusterID)})
        .then(function(response) { ctrl.clusterFullThreshold = response.clusterFullThreshold; });
    };

    ctrl.staticDateRangeOptions = [
      {milliseconds: 86400000, label: 'Last 24 Hours'},
      {milliseconds: 259200000, label: 'Last 3 Days'},
      {milliseconds: 604800000, label: 'Last 7 Days'},
      {milliseconds: 1209600000, label: 'Last 14 Days'},
      {milliseconds: 2592000000, label: 'Last 30 Days', default: true}
    ];

    ctrl.syncGraphs = [
      {
        service: CapacityGraphsService,
        id: 'sync-graph-1-service',
        child: {
          title: 'Cluster Provisioned Space',
          id: 'sync-graph-1-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              maxProvisionedSpace: 'Max Provisioned Space',
              provisionedSpace: 'Provisioned Space'
            }
          },
          graph: new SFD3LineGraph({
            bindTo: 'cluster-provisioned-child',
            type: 'line',
            showAxisLabels: true,
            data: {
              x: 'timestamps',
              ids: ['maxProvisionedSpace', 'provisionedSpace'],
              axes: {
                maxProvisionedSpace: 'y0',
                provisionedSpace: 'y0'
              },
              labels: {
                maxProvisionedSpace: 'Max Provisioned Space',
                provisionedSpace: 'Provisioned Space'
              },
              colors: {
                maxProvisionedSpace: ['#ff0000'],
                provisionedSpace: ['#E16482', '#00A7C6', '#10E8A5']
              },
              textures: {
                maxProvisionedSpace: ['dashed'],
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
          })
        },
        context: {
          label: 'Cluster Provisioned Space',
          id: 'sync-graph-1-context',
          graph: new SFD3BarGraph({
            bindTo: 'cluster-provisioned-context',
            type: 'bar',
            showAxisLabel: true,
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
          })
        }
      },
      {
        service: CapacityGraphsService,
        id: 'sync-graph-2-service',
        child: {
          title: 'Cluster Block Capacity',
          id: 'sync-graph-2-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              maxUsedSpace: 'Max Used Space',
              usedSpace: 'Used Space'
            }
          },
          graph: new SFD3LineGraph({
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
                maxUsedSpace: ['#ff0000'],
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
          })
        },
        context: {
          label: 'Block Capacity',
          id: 'sync-graph-2-context',
          graph: new SFD3BarGraph({
            bindTo: 'cluster-block-context',
            type: 'bar',
            showAxisLabel: true,
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
          })
        }
      },
      {
        service: CapacityGraphsService,
        id: 'sync-graph-3-service',
        child: {
          title: 'Cluster Metadata Storage Space',
          id: 'sync-graph-3-service-child',
          export: false,
          legend: {
            position: 'top',
            items: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            }
          },
          graph: new SFD3LineGraph({
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
                maxUsedMetadataSpace: ['#ff0000'],
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
          })
        },
        context: {
          label: 'Metadata Capacity',
          id: 'sync-graph-3-context',
          graph: new SFD3BarGraph({
            bindTo: 'cluster-metadata-context',
            type: 'bar',
            showAxisLabel: true,
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
          })
        }
      }
    ];

    /***********************  Helper Functions  ************************/

    function xAxisFormat(milliseconds) {
      return $filter('date')(new Date(milliseconds), 'short');
    }

    function yAxisFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, false);
    }
  }
})();
