import * as moment from 'moment';

export interface NewSuppressionResult {
  clusterID: number;
  clusterName: string;
  endDate: Date;
}

interface DurationOption {
  name: string;
  duration?: number;
}

class SuppressClusterController {
  public durationOptions: DurationOption[] = [
    { name: '6 hours', duration: moment.duration(6, 'hours').asMilliseconds() },
    { name: '24 hours', duration: moment.duration(24, 'hours').asMilliseconds() },
    { name: '3 days', duration: moment.duration(3, 'days').asMilliseconds() },
    { name: '7 days', duration: moment.duration(7, 'days').asMilliseconds() },
    { name: '30 days', duration: moment.duration(30, 'days').asMilliseconds() },
    { name: 'Custom' },
  ];
  public now = new Date();
  public modalInstance;
  public clusterProvided = false;
  public clusterID: string;
  public clusterName: string;
  public selectedDurationOption = this.durationOptions[0];
  public customEndDate: Date;
  public error: string;

  static readonly $inject = [ 'DataService' ];
  constructor(private DataService) {}

  next() {
    return this.DataService.callGuzzleAPI(this.clusterID, 'GetClusterInfo')
      .then( ({ clusterInfo }) => {
        this.clusterName = clusterInfo.name;
        this.clusterProvided = true;
      })
      .catch( () => {
        this.error = `There is no cluster with ID ${this.clusterID}, or you do not have permission to view it.`;
      });
  }

  suppress() {
    const clusterID = parseInt(this.clusterID, 10);
    const duration = this.getDurationMillis();
    const durationSec = Math.round(duration / 1000);
    return this.DataService.callAPI('SuppressNotifications', { clusterID, durationSec })
      .then( () => {
        const result: NewSuppressionResult = {
          clusterID,
          clusterName: this.clusterName,
          endDate: new Date(new Date().getTime() + duration),
        };
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

  getDurationMillis(): number | null {
    if ( this.selectedDurationOption.duration ) {
      return this.selectedDurationOption.duration;
    }
    if ( this.selectedDurationOption.name === 'Custom' && this.customEndDate ) {
      const now = new Date();
      return this.customEndDate.getTime() - now.getTime();
    }
    return null;
  }
}

export const SuppressClusterComponent = {
  bindings: {
    modalInstance: '<',
  },
  template: require('./suppress-cluster.tpl.html'),
  controller: SuppressClusterController,
};
