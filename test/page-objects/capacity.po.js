'use strict';

var CapacityComponent = function () {
  this.el = element(by.tagName('sf-sync-graphs'));
  this.contextGraph = {
    el: {},
    buttons: {
      count: this.el.all(by.css('')).count(),
      provisioned: {},
      used: {},
      metadata: {}
    }
  };
  this.provisionedGraph = {
    el: {},
    badges: {
      count: this.el.all(by.css('info-box-content')).count(),
      maxProvisionedSpace: element(by.id('max-provisioned-space-provisioned-badge')),
      warningThreshold: element(by.id('warning-threshold-provisioned-badge')),
      criticalThreshold: element(by.id('critical-threshold-provisioned-badge')),
      currentState: element(by.id('current-state-provisioned-badge'))
    }
  };
  this.usedGraph = {
    el: {},
    badges: {
      count: this.el.all(by.css('info-box-content')).count(),
      usedCapacity: element(by.id('used-capacity-used-badge')),
      warningThreshold: element(by.id('warning-threshold-used-badge')),
      errorThreshold: element(by.id('error-threshold-used-badge')),
      totalCapacity: element(by.id('total-capacity-used-badge')),
      currentState: element(by.id('current-state-used-badge'))
    }
  };
  this.metadataGraph = {
    el: {},
    badges: {
      count: this.el.all(by.css('info-box-content')).count(),
      usedCapacity: element(by.id('used-capacity-metadata-badge')),
      totalCapacity: element(by.id('total-capacity-metadata-badge')),
      currentState: element(by.id('current-state-metadata-badge'))
    }
  };
};

module.exports = CapacityComponent;
