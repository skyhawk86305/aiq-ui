import * as _ from 'lodash';
import * as angular from 'angular';

export const CapacityGraphsComponent = {
  controller: CapacityGraphsController,
  template: require('./capacity.tpl.html')
};

function CapacityGraphsController($rootScope, $routeParams, $filter, $q, $timeout, DataService, SFD3LineGraph, SFD3BarGraph, CapacityGraphsService) {
  const ctrl = this;

  ctrl.$onInit = () => {
    CapacityGraphsService.update($routeParams.clusterID);
    ctrl.updateInfoBar();
    ctrl.staticDateRangeOptions = [{milliseconds: 3600000, label: 'Hour'},
      {milliseconds: 86400000, label: '24 Hours'},
      {milliseconds: 604800000, label: '7 Days', default: true},
      {milliseconds: 1209600000, label: '14 Days'},
      {milliseconds: 2592000000, label: '30 Days'}];

    ctrl.syncGraphs = [
      {
        service: CapacityGraphsService,
        id: 'block-capacity',
        selected: {
          title: 'Block Capacity',
          export: true,
          legend: {
            items: {
              maxUsedSpace: 'Max Used Space',
              usedSpace: 'Used Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('block'))
        },
        sparkLine: {
          title: 'Block Capacity',
          dataLimit: 175,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('block', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new SFD3BarGraph(ctrl.getGraphConfig('block', true))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'metadata-capacity',
        selected: {
          title: 'Metadata Capacity',
          export: true,
          legend: {
            items: {
              maxUsedMetadataSpace: 'Total Capacity',
              usedMetadataSpace: 'Used Metadata Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('metadata'))
        },
        sparkLine: {
          title: 'Metadata Capacity',
          dataLimit: 175,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('metadata', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new SFD3BarGraph(ctrl.getGraphConfig('metadata', true))
        }
      },
      {
        service: CapacityGraphsService,
        id: 'provisioned-space',
        selected: {
          title: 'Provisioned Space',
          export: true,
          legend: {
            items: {
              maxProvisionedSpace: 'Max Provisioned Space',
              provisionedSpace: 'Provisioned Space'
            }
          },
          dataLimit: 750,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('provisioned'))
        },
        sparkLine: {
          title: 'Provisioned Space',
          dataLimit: 175,
          graph: new SFD3LineGraph(ctrl.getGraphConfig('provisioned', false, true))
        },
        context: {
          dataLimit: 200,
          graph: new SFD3BarGraph(ctrl.getGraphConfig('provisioned', true))
        }
      }
    ];

    $timeout(function() {
      ctrl.blockCapacitySelection = angular
        .element(document.getElementById('block-capacity-selection'))
        .on('click', function(){
          ctrl.currentGraph = 'block-capacity';
        });

      ctrl.metadataCapacitySelection = angular
        .element(document.getElementById('metadata-capacity-selection'))
        .on('click', function(){
          ctrl.currentGraph = 'metadata-capacity';
        });

      ctrl.provisionedSpaceSelection = angular
        .element(document.getElementById('provisioned-space-selection'))
        .on('click', function(){
          ctrl.currentGraph = 'provisioned-space';
        });

      ctrl.currentGraph = document.getElementsByClassName('graph-selection-container active')[0].firstChild['id'];
    });
  };


  ctrl.getClusterFullThreshold = function(clusterID) {
    ctrl.getClusterFullThresholdState = 'loading';
    return DataService.callAPI('GetClusterFullThreshold', {clusterID})
      .then(response => {
        ctrl.getClusterFullThresholdState = 'loaded';
        ctrl.clusterFullThreshold = _.get(response, 'clusterFullThreshold');
      })
      .catch(err => {
        ctrl.getClusterFullThresholdState = 'error';
      });
  };

  ctrl.updateInfoBar = function() {
    const clusterID = parseInt($routeParams.clusterID, 10);
    return $q.all([
      ctrl.getClusterFullThreshold(clusterID),
      ctrl.getClusterFullPrediction(clusterID),
    ]);
  };

  ctrl.getClusterFullPrediction = function(clusterID) {
    ctrl.getClusterFullPredictionState = 'loading';
    return DataService.callAPI('GetClusterFullPrediction', {clusterID})
      .then(response => {
        ctrl.getClusterFullPredictionState = 'loaded';
        ctrl.clusterFullPrediction = _.get(response, 'clusterFullPrediction');
      })
      .catch(err => {
        ctrl.getClusterFullPredictionState = 'error';
      });
  };

  ctrl.getGraphConfig = function(graph, context = false, sparkLine = false) {
    const graphType = context ? 'context' : 'child';
    const graphConfigs = {
      block: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['usedSpace'] : ['maxUsedSpace', 'usedSpace'],
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
              maxUsedSpace: 'dashed',
              usedSpace: 'solid'
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
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
            y: 'usedSpace',
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
                spacing: 30
              }
            }
          }
        }
      },
      metadata: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          sparkLine: sparkLine,
          showAxisLabels: true,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['usedMetadataSpace'] : ['maxUsedMetadataSpace', 'usedMetadataSpace'],
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
              maxUsedMetadataSpace: 'dashed',
              usedMetadataSpace: 'solid'
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
                spacing: 50
              }
            }
          }
        },
        context: {
          bindTo: graph + '-capacity-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'usedMetadataSpace',
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
                spacing: 30
              }
            }
          }
        }
      },
      provisioned: {
        child: {
          bindTo: graph + (sparkLine ? '-spark-line' : '-child'),
          type: 'line',
          showAxisLabels: true,
          sparkLine: sparkLine,
          data: {
            x: 'timestamps',
            ids: sparkLine ? ['provisionedSpace'] : ['maxProvisionedSpace', 'provisionedSpace'],
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
              maxProvisionedSpace: 'dashed',
              provisionedSpace: 'solid'
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 300
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
                spacing: 50
              }
            }
          }
        },
        context: {
          bindTo: graph + '-space-context-graph',
          type: 'bar',
          showAxisLabel: true,
          barSpacing: 80,
          data: {
            x: 'timestamps',
            y: 'provisionedSpace',
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
                format: (milliseconds) => $filter('aiqDate')(new Date(milliseconds)),
                spacing: 200
              }
            },
            y0: {
              tick: {
                format: (bytes) => $filter('bytes')(bytes, false),
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

CapacityGraphsController.$inject = ['$rootScope', '$routeParams', '$filter', '$q', '$timeout', 'DataService', 'SFD3LineGraph', 'SFD3BarGraph', 'CapacityGraphsService'];
