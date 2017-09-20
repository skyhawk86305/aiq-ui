/* Restore Clusters Component   */

export interface RestoreClustersResult {
  clusterID: number;
  clusterName: string;
}

class RestoreClustersController {
  public modalInstance;
  public resolve;

  static readonly $inject = ['DataService'];
  constructor(private DataService) {}

  restoreClusters() {
    const { clusterID, clusterName } = this.resolve.cluster;
    return this.DataService.callAPI('RestoreArchivedCluster', { clusterID })
      .then( () => {
        const result: RestoreClustersResult = { clusterID, clusterName };
        this.modalInstance.close(result);
      })
      .catch( err => {
        if (err.message) {
          this.modalInstance.dismiss(err.message);
          return;
        }
        this.modalInstance.dismiss('An unexpected error occurred');
      });
  }

  cancel() {
    this.modalInstance.dismiss();
  }
}

export const RestoreClustersComponent = {
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
  template: require('./restore-clusters.tpl.html'),
  controller: RestoreClustersController,
};
