const _ = require('lodash');
import { RestoreClustersResult } from './restore-clusters/restore-clusters.component';

export class ArchivedClustersService {

  static $inject = [ '$rootScope', '$uibModal', 'SFTableService', 'SFFilterComparators', 'DataService' ];
  constructor(
    private $rootScope,
    private $uibModal,
    private SFTableService,
    private SFFilterComparators,
    private DataService,
    private restoreAuthorization: boolean,
    public restoreClustersError: string,
    public restoreClustersResult: RestoreClustersResult,
    public service,
  ){
    const columns = [
      { label: 'ClusterID', key: 'clusterID', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Customer', key: 'customerName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Last Update', key: 'lastUpdateTime', format: { filter: 'aiqDate' }, width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Archive Time', key: 'archiveTime', format: { filter: 'aiqDate' }, width: 175, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Restore', key: 'restore', filterComparators: SFFilterComparators.STRING_DEFAULT },
    ];

    function listArchivedClusters() {
      return DataService.callAPI('ListArchivedClusters')
        .then( ({ clusters = [] }) =>
          clusters.map(cluster => Object.assign({},cluster,{
            ...cluster,
            restore: require('./restore-clusters/restore-clusters-button.tpl.html'),
            lastUpdateTime : new Date(cluster.lastUpdateTime * 1000),
            archiveTime : new Date(cluster.archiveTime * 1000)
          }))
        );
    };

  /*  return new SFTableService(listArchivedClusters, columns, false); */

      service = new SFTableService(listArchivedClusters, columns, false);
    /*  this.service.openRestoreNotificationsModal = rowData => this.openRestoreNotificationsModal(rowData);  */
      return service;

    }

     openRestoreNotificationsModal(cluster) {
        this.restoreClustersResult = null;
        this.restoreClustersError = null;
        return this.$uibModal
          .open({
            animation: false,
            component: 'restoreClusters',
            size: 'md',
            resolve: {
              cluster: () => cluster,
           },
            windowClass: 'aiq-modal register-cluster-modal',
            backdropClass: 'aiq-modal-backdrop',
          })
          .result
          .then( result => {
            this.restoreClustersResult = result;
            this.$rootScope.$broadcast('restore-clusters', true);
          })
          .catch( err => {
            this.restoreClustersError = err;
          });
      }
}
