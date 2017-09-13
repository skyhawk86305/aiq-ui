export class ArchivedClustersService {

  static $inject = [ '$rootScope', '$uibModal', 'SFTableService', 'SFFilterComparators', 'DataService' ];
  constructor(
    private $rootScope,
    private $uibModal,
    private SFTableService,
    private SFFilterComparators,
    private DataService
  ){
    const columns = [
      { label: 'ClusterID', key: 'clusterID', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Customer', key: 'customerName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Last Update', key: 'lastUpdateTime', format: { filter: 'aiqDate' }, width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Archive Time', key: 'archiveTime', format: { filter: 'aiqDate' }, width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Restore with Customer', key: 'restore', width: 200, titleValue: 'Restore with Customer'},
    ];

    function listArchivedClusters() {
      return DataService.callAPI('ListArchivedClusters')
        .then( ({ clusters = [] }) =>
          clusters.map(cluster => Object.assign({},cluster,{
            lastUpdateTime : new Date(cluster.lastUpdateTime * 1000),
            archiveTime : new Date(cluster.archiveTime * 1000),
            restore: require('./restore-cluster-button.tpl.html'),
          }))
        );
    };

    const service = new SFTableService(listArchivedClusters, columns, false);

    service.restore = (rowData) => {
      return $uibModal
        .open({
          animation: false,
          component: 'restoreCluster',
          size: 'md',
          resolve: {
            cluster: () => rowData,
          },
          windowClass: 'aiq-modal restore-cluster-modal',
          backdropClass: 'aiq-modal-backdrop',
        })
        .result
        .then( () => {
          this.$rootScope.$broadcast('refresh-archived-clusters', true);
          this.$rootScope.$broadcast('refresh-cluster-select');
        });
    };
    return service;
  }

}
