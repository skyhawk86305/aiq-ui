export class UnregisteredClustersService {

  static $inject = [ '$rootScope', '$uibModal', 'SFTableService', 'SFFilterComparators', 'DataService' ];
  constructor(
    private $rootScope,
    private $uibModal,
    private SFTableService,
    private SFFilterComparators,
    private DataService
  ) {
    const columns = [
      { label: 'Cluster ID', key: 'clusterID', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster UUID', key: 'clusterUUID', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Version', key: 'clusterVersion', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Last Updated', key: 'lastUpdateTime', width: 200, format: {filter: 'aiqDate'}, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Register with Customer', key: 'register', width: 200, titleValue: 'Register with Customer'},
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

    service.register = (rowData) => {
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
          this.$rootScope.$broadcast('refresh-unregistered-clusters', true);
          this.$rootScope.$broadcast('refresh-cluster-select');
        });
    };

    return service;
  }
}
