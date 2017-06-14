(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .component('capacityGraphs', {
      template: require('./capacity.tpl.html'),
      controller: [
        '$routeParams',
        '$filter',
        '$q',
        'DataService',
        'SFD3LineGraph',
        'SFD3BarGraph',
        'CapacityGraphsService',
        CapacityGraphsController
      ]
    });

  function CapacityGraphsController($routeParams, $filter, $q, DataService, SFD3LineGraph, SFD3BarGraph, CapacityGraphsService) {
    let ctrl = this;

    ctrl.$onInit = function() {
      CapacityGraphsService.update($routeParams.clusterID);
      ctrl.updateInfoBar();
    };

    ctrl.updateInfoBar = function() {
      const clusterID = parseInt($routeParams.clusterID, 10);
      return $q.all([
        ctrl.getClusterFullThreshold(clusterID),
        ctrl.getClusterFullPrediction(clusterID),
      ]);
    };

    ctrl.getClusterFullThreshold = function(clusterID) {
      ctrl.getClusterFullThresholdState = 'loading';
      return DataService.callAPI('GetClusterFullThreshold', { clusterID })
        .then( response => {
          ctrl.getClusterFullThresholdState = 'loaded';
          ctrl.clusterFullThreshold = _.get(response, 'clusterFullThreshold');
        })
        .catch( err => {
          ctrl.getClusterFullThresholdState = 'error';
        });
    };

    ctrl.getClusterFullPrediction = function(clusterID) {
      ctrl.getClusterFullPredictionState = 'loading';
      return DataService.callAPI('GetClusterFullPrediction', { clusterID })
        .then( response => {
          ctrl.getClusterFullPredictionState = 'loaded';
          ctrl.clusterFullPrediction = _.get(response, 'clusterFullPrediction');
        })
        .catch( err => {
          ctrl.getClusterFullPredictionState = 'error';
        });
    };

    ctrl.staticDateRangeOptions = [
      {milliseconds: 3600000,    label: 'Hour'},
      {milliseconds: 86400000,   label: '24 Hours'},
      {milliseconds: 604800000,  label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'}
    ];

    ctrl.syncGraphs = [
      {
        service: CapacityGraphsService,
        id: 'block-capacity',
        child: {
          title: 'Block Capacity',
          id: 'block-capacity-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              maxUsedSpace: 'Max Used Space',
              usedSpace: 'Used Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('blockChild'))
        },
        context: {
          label: 'Block Capacity',
          id: 'block-capacity-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('blockContext'))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'metadata-capacity',
        child: {
          title: 'Metadata Capacity',
          id: 'metadata-capacity-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('metadataChild'))
        },
        context: {
          label: 'Metadata Capacity',
          id: 'metadata-capacity-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('metadataContext'))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'provisioned-space',
        child: {
          title: 'Provisioned Space',
          id: 'provisioned-space-child',
          export: true,
          legend: {
            position: 'top',
            items: {
              maxProvisionedSpace: 'Max Provisioned Space',
              provisionedSpace: 'Provisioned Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(getGraphConfig('provisionedChild'))
        },
        context: {
          label: 'Provisioned Space',
          id: 'provisioned-space-context',
          dataLimit: 200,
          graph: new SFD3BarGraph(getGraphConfig('provisionedContext'))
        }
      }
    ];

    function getGraphConfig(graph) {
      let graphConfigs = {
        blockChild: {
          bindTo: 'block-capacity-child-graph',
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
        blockContext: {
          bindTo: 'block-capacity-context-graph',
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
        metadataChild: {
          bindTo: 'metadata-capacity-child-graph',
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
        metadataContext: {
          bindTo: 'metadata-capacity-context-graph',
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
        provisionedChild: {
          bindTo: 'provisioned-space-child-graph',
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
              maxProvisionedSpace: ['#D07983'],
              provisionedSpace: ['#E16482', '#00A7C6', '#10E8A5']
            },
            textures: {
              maxProvisionedSpace: ['dashed'],
              provisionedSpace: ['solid']
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
        provisionedContext: {
          bindTo: 'provisioned-space-context-graph',
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
      return $filter('aiqDate')(new Date(milliseconds));
    }

    function yAxisFormat(bytes) {
      return $filter('bytes')(bytes, false);
    }
  }
})();
