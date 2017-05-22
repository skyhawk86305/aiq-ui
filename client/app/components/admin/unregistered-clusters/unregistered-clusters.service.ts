export class UnregisteredClustersService {

  static $inject = [ '$uibModal', 'SFTableService', 'SFFilterComparators', 'DataService' ];
  constructor(private $uibModal, private SFTableService, private SFFilterComparators, private DataService) {
    const columns = [
      { label: 'Cluster ID', key: 'clusterID', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster UUID', key: 'clusterUUID', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Version', key: 'clusterVersion', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Last Updated', key: 'lastUpdateTime', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Register with Customer', key: 'register', width: 200},
    ];

    function listUnregisteredClusters() {
      return DataService.callAPI('ListUnregisteredClusters')
        .then( ({ clusters = [] }) =>
          clusters.map( cluster => Object.assign({}, cluster, {
            register: require('./register-cluster-button.tpl.html'),
          }))
        );
    }

    const service = new SFTableService(listUnregisteredClusters, columns, false);

    service.register = function(rowData) {
      return $uibModal
        .open({
          animation: false,
          component: 'registerUnregisteredCluster',
          size: 'md',
          resolve: {
            cluster: () => rowData,
          },
          windowClass: 'aiq-modal register-cluster-modal',
          backdropClass: 'aiq-modal-backdrop',
        })
        .result
        .then( () => {
          // TODO: trigger table refresh
        });
    };

    return service;
  }
}
