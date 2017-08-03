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
      { label: 'Last Update', key: 'lastUpdateTime', width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Archive Time', key: 'archiveTime', width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
    ];

    function listArchivedClusters() {
      return DataService.callAPI('ListArchivedClusters')
        .then( ({ clusters = [] }) =>
          clusters.map(cluster => Object.assign({},cluster,{
            lastUpdateTime : new Date(cluster.lastUpdateTime * 1000),
            archiveTime : new Date(cluster.archiveTime * 1000)
          }))
        );
    };

    return new SFTableService(listArchivedClusters, columns, false);
  }

}
