(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('capacityGraphs', {
      templateUrl: 'cluster/capacity/capacity-graphs-section.tpl.html',
      controller: ['$routeParams', 'UsedSpaceGraphsService', 'ProvisionedSpaceGraphsService', CapacityGraphsController]
    });

  function CapacityGraphsController($routeParams, UsedSpaceGraphsService, ProvisionedSpaceGraphsService) {
    var usedSpaceGraphService = UsedSpaceGraphsService,
        provisionedSpaceGraphService = ProvisionedSpaceGraphsService;

    usedSpaceGraphService.update($routeParams.clusterID);
    provisionedSpaceGraphService.update($routeParams.clusterID);

    this.contextRange = null;
    this.staticDateRangeOptions = [
      {milliseconds: 86400000, label: 'Last 24 Hours'},
      {milliseconds: 259200000, label: 'Last 3 Days'},
      {milliseconds: 604800000, label: 'Last 7 Days'},
      {milliseconds: 1209600000, label: 'Last 14 Days'},
      {milliseconds: 2592000000, label: 'Last 30 Days', default: true}
    ];

    this.syncGraphs = [
      {
        service: provisionedSpaceGraphService,
        id: 'sync-graph-1-service',
        child: {
          title: 'Cluster Provisioned Space',
          id: 'sync-graph-1-service-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              maxProvisionedSpace: 'Max Provisioned Space',
              provisionedSpace: 'Provisioned Space'
            }
          },
          config: {
            bindTo: 'cluster-provisioned-child',
            type: 'line',
            height: 200,
            showAxisLabels: true,
            data: {
              x: 'timestampSec',
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
                  format: '%m-%d-%Y',
                  spacing: 200
                }
              },
              y0: {
                label: 'TB',
                tick: {
                  format: '.3',
                  spacing: 30
                }
              }
            }
          }
        },
        context: {
          label: 'Cluster Provisioned Space',
          id: 'sync-graph-1-context',
          config: {
            bindTo: 'cluster-provisioned-context',
            type: 'bar',
            height: 120,
            showAxisLabel: true,
            data: {
              x: 'timestampSec',
              y: 'provisionedSpace',
              color: '#0FAEE7'
            },
            margin: {
              top: 15,
              right: 10,
              left: 25
            },
            axis: {
              x: {
                tick: {
                  format: '%m-%d-%Y',
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format: '.2',
                  spacing: 25
                }
              }
            }
          }
        }
      },
      {
        service: usedSpaceGraphService,
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
          config: {
            bindTo: 'cluster-block-child',
            type: 'line',
            height: 200,
            showAxisLabels: true,
            data: {
              x: 'timestampSec',
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
                  format: '%m-%d-%Y',
                  spacing: 200
                }
              },
              y0: {
                label: 'TB',
                tick: {
                  format: '.2',
                  spacing: 30
                }
              }
            }
          }
        },
        context: {
          label: 'Block Capacity',
          id: 'sync-graph-2-context',
          config: {
            bindTo: 'cluster-block-context',
            type: 'bar',
            height: 120,
            showAxisLabel: true,
            data: {
              x: 'timestampSec',
              y: 'usedSpace',
              color: '#0FAEE7'
            },
            margin: {
              top: 15,
              right: 10,
              left: 25
            },
            axis: {
              x: {
                tick: {
                  format: '%m-%d-%Y',
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format: '.2',
                  spacing: 25
                }
              }
            }
          }
        }
      },
      {
        service: usedSpaceGraphService,
        id: 'sync-graph-3-service',
        child: {
          title: 'Cluster Metadata Storage Space',
          id: 'sync-graph-3-service-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            }
          },
          config: {
            bindTo: 'cluster-metadata-child',
            type: 'line',
            height: 200,
            showAxisLabels: true,
            data: {
              x: 'timestampSec',
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
                  format: '%m-%d-%Y',
                  spacing: 200
                }
              },
              y0: {
                label: 'TB',
                tick: {
                  format: '.2',
                  spacing: 30
                }
              }
            }
          }
        },
        context: {
          label: 'Metadata Capacity',
          id: 'sync-graph-3-context',
          config: {
            bindTo: 'cluster-metadata-context',
            type: 'bar',
            height: 120,
            showAxisLabel: true,
            data: {
              x: 'timestampSec',
              y: 'usedMetadataSpace',
              color: '#0FAEE7'
            },
            margin: {
              top: 15,
              right: 10,
              left: 25
            },
            axis: {
              x: {
                tick: {
                  format: '%m-%d-%Y',
                  spacing: 150
                }
              },
              y0: {
                tick: {
                  format: '.2',
                  spacing: 25
                }
              }
            }
          }
        }
      }
    ];
  }
})();
