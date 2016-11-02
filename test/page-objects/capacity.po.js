'use strict';

var CapacityComponent = function () {
  var component = this,
      contextButtons,
      provisionedGraph,
      usedGraph,
      metadataGraph;

  component.el = element(by.tagName('sf-sync-graphs'));
  component.contextGraph = {
    el: element(by.id('cluster-provisioned-context'))
  };
  component.contextButtons = function () {
    contextButtons = element(by.css('.selection-buttons'));
    return {
      el: contextButtons,
      count: contextButtons.all(by.css('.button')).count(),
      provisioned: contextButtons.element(by.css('.-sync-graph-1-service')),
      used: contextButtons.element(by.css('.-sync-graph-2-service')),
      metadata: contextButtons.element(by.css('.-sync-graph-3-service'))
    };
  };
  component.provisionedGraph = function () {
    provisionedGraph = element(by.id('sync-graph-1-service'));
    return {
      el: provisionedGraph,
      badges: {
        count: provisionedGraph.all(by.css('.info-box-content')).count(),
        maxProvisionedSpace: provisionedGraph.element(by.id('max-provisioned-space-provisioned-badge')),
        warningThreshold: provisionedGraph.element(by.id('warning-threshold-provisioned-badge')),
        criticalThreshold: provisionedGraph.element(by.id('critical-threshold-provisioned-badge')),
        currentState: provisionedGraph.element(by.id('current-state-provisioned-badge'))
      }
    };
  };
  component.usedGraph = function () {
    usedGraph = element(by.id('sync-graph-2-service'));
    return {
      el: usedGraph,
      badges: {
        count: usedGraph.all(by.css('.info-box-content')).count(),
        usedCapacity: usedGraph.element(by.id('used-capacity-used-badge')),
        warningThreshold: usedGraph.element(by.id('warning-threshold-used-badge')),
        errorThreshold: usedGraph.element(by.id('error-threshold-used-badge')),
        totalCapacity: usedGraph.element(by.id('total-capacity-used-badge')),
        currentState: usedGraph.element(by.id('current-state-used-badge'))
      }
    };
  };
  component.metadataGraph = function () {
    metadataGraph = element(by.id('sync-graph-3-service'));
    return {
      el: metadataGraph,
      badges: {
        count: metadataGraph.all(by.css('.info-box-content')).count(),
        usedCapacity: metadataGraph.element(by.id('used-capacity-metadata-badge')),
        totalCapacity: metadataGraph.element(by.id('total-capacity-metadata-badge')),
        currentState: metadataGraph.element(by.id('current-state-metadata-badge'))
      }
    };
  };
};

module.exports = CapacityComponent;
