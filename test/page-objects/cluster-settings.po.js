'use strict';

var ClusterSettingsPage = function () {
  this.form = {
    el: element(by.id('cluster-settings-fieldset')),
    inputs: {
      role: element(by.id('cluster-role')),
      hostname: element(by.id('cluster-hostname')),
      clusterName: element(by.id('cluster-name')),
      membership: element(by.id('cluster-membership')),
      version: element(by.id('cluster-version')),
      ensemble: element(by.id('cluster-ensemble')),
      nodeID: element(by.id('cluster-node-id')),
      pendingNodeID: element(by.id('cluster-pending-node-id')),
      interface: element(by.id('cluster-interface')),
      managementInterface: element(by.id('cluster-management-interface')),
      storageInterface: element(by.id('cluster-storage-interface'))
    },
    submit: element(by.css('.update-cluster-settings-btn'))
  };
  this.errorModal = element(by.id('clusterSettings')).element(by.css('.sf-modal-alert'));
};

module.exports = ClusterSettingsPage;
