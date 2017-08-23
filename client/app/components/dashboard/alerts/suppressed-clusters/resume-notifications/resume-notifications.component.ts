export interface ResumeNotificationsResult {
  clusterID: number;
  clusterName: string;
}

class ResumeNotificationsController {
  public modalInstance;
  public resolve;

  static readonly $inject = ['DataService'];
  constructor(private DataService) {}

  resumeNotifications() {
    const { clusterID, clusterName } = this.resolve.suppression;
    return this.DataService.callAPI('UnsuppressNotifications', { clusterID })
      .then( () => {
        const result: ResumeNotificationsResult = { clusterID, clusterName };
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

export const ResumeNotificationsComponent = {
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
  template: require('./resume-notifications.tpl.html'),
  controller: ResumeNotificationsController,
};
