const _ = require('lodash');
import { SFDataTableColumn } from '../../../../shared/sf-components-types';
import { NewSuppressionResult } from './suppress-cluster/suppress-cluster.component';
import { ResumeNotificationsResult } from './resume-notifications/resume-notifications.component';

class SuppressedClustersController {
  private columns: SFDataTableColumn[] = [
    { label: 'Customer Name', key: 'customerName', filterComparators: this.SFFilterComparators.STRING_DEFAULT },
    { label: 'Cluster ID', key: 'clusterID', filterComparators: this.SFFilterComparators.INTEGER_DEFAULT },
    { label: 'Cluster Name', key: 'clusterName', filterComparators: this.SFFilterComparators.STRING_DEFAULT },
    { label: 'Start Time', key: 'start', format: { filter: 'aiqDate' } },
    { label: 'End Time', key: 'end', format: { filter: 'aiqDate' } },
  ];
  public newSuppressionResult: NewSuppressionResult;
  public newSuppressionError: string;
  public resumeNotificationsResult: ResumeNotificationsResult;
  public resumeNotificationsError: string;
  public service;
  private suppressAuthorization: boolean;

  static readonly $inject = [ 'SFTableService', 'SFFilterComparators', 'DataService', '$uibModal', '$rootScope' ];
  constructor(private SFTableService, private SFFilterComparators, private DataService, private $uibModal, private $rootScope) {
    if (this.suppressAuthorization) {
      this.columns.push({ label: 'Resume', key: 'resume', titleValue: 'Resume Notifications' });
    }
    this.service = new SFTableService(() => this.listActiveSuppressions(), this.columns);
    this.service.openResumeNotificationsModal = rowData => this.openResumeNotificationsModal(rowData);
  }

  listActiveSuppressions() {
    return this.DataService.callAPI('ListActiveSuppressions')
      .then( response => _.get(response, 'suppressions', [])
        .map( suppression => ({
          ...suppression,
          resume: require('./resume-notifications/resume-notifications-button.tpl.html'),
        }))
      );
  }

  suppressCluster() {
    this.newSuppressionResult = null;
    this.newSuppressionError = null;
    return this.$uibModal
      .open({
        animation: false,
        component: 'suppressCluster',
        size: 'md',
        windowClass: 'aiq-modal suppress-cluster-modal',
        backdrop: 'static',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result
      .then( result => {
        this.newSuppressionResult = result;
        this.$rootScope.$broadcast('refresh-suppressed-clusters', true);
      })
      .catch( err => {
        this.newSuppressionError = err;
      });
  }

  openResumeNotificationsModal(suppression) {
    this.resumeNotificationsResult = null;
    this.resumeNotificationsError = null;
    return this.$uibModal
      .open({
        animation: false,
        component: 'resumeNotifications',
        size: 'md',
        resolve: {
          suppression: () => suppression,
        },
        windowClass: 'aiq-modal register-cluster-modal',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result
      .then( result => {
        this.resumeNotificationsResult = result;
        this.$rootScope.$broadcast('refresh-suppressed-clusters', true);
      })
      .catch( err => {
        this.resumeNotificationsError = err;
      });
  }
}

export const SuppressedClustersComponent = {
  bindings: {
    suppressAuthorization: '<',
  },
  template: require('./suppressed-clusters.tpl.html'),
  controller: SuppressedClustersController,
};
