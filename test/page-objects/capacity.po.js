'use strict';

var CapacityComponent = function () {
  var component = this,
      contextButtons,
      provisionedGraph,
      usedGraph,
      metadataGraph,
      staticDateSelector;

  component.el = element(by.tagName('sf-sync-graphs'));
  component.contextGraph = {
    el: element(by.id('cluster-block-context'))
  };
  component.contextButtons = function () {
    contextButtons = element(by.css('.selection-buttons'));
    return {
      el: contextButtons,
      count: contextButtons.all(by.css('.button')).count(),
      used: contextButtons.element(by.css('.-sync-graph-1-service')),
      metadata: contextButtons.element(by.css('.-sync-graph-2-service')),
      provisioned: contextButtons.element(by.css('.-sync-graph-3-service'))
    };
  };
  component.usedGraph = function () {
    usedGraph = element(by.id('sync-graph-1-service'));
    return {
      el: usedGraph,
      infoBox: {
        count: usedGraph.all(by.css('.info-box-content')).count(),
        usedCapacity: usedGraph.element(by.id('used-capacity-used-info-box')),
        warningThreshold: usedGraph.element(by.id('warning-threshold-used-info-box')),
        errorThreshold: usedGraph.element(by.id('error-threshold-used-info-box')),
        totalCapacity: usedGraph.element(by.id('total-capacity-used-info-box')),
        currentState: usedGraph.element(by.id('current-state-used-info-box'))
      }
    };
  };
  component.metadataGraph = function () {
    metadataGraph = element(by.id('sync-graph-2-service'));
    return {
      el: metadataGraph,
      infoBox: {
        count: metadataGraph.all(by.css('.info-box-content')).count(),
        usedCapacity: metadataGraph.element(by.id('used-capacity-metadata-info-box')),
        totalCapacity: metadataGraph.element(by.id('total-capacity-metadata-info-box')),
        currentState: metadataGraph.element(by.id('current-state-metadata-info-box'))
      }
    };
  };
  component.provisionedGraph = function () {
    provisionedGraph = element(by.id('sync-graph-3-service'));
    return {
      el: provisionedGraph,
      infoBox: {
        count: provisionedGraph.all(by.css('.info-box-content')).count()
      }
    };
  };
  component.staticDateSelector = function() {
    staticDateSelector = element(by.id('capacity-sync-graphs-static-date-range-selector'));
    return {
      el: staticDateSelector,
      activeDateRangeOption: staticDateSelector.element(by.css('.active')),
      ranges: {
        count: staticDateSelector.all(by.css('a')).count()
      },
      range: function (index) {
        return staticDateSelector.all(by.css('a')).get(index);
      }
    };
  };
};

module.exports = CapacityComponent;
