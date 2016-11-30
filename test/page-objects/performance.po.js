'use strict';

var PerformanceComponent = function () {
  var component = this,
      contextButtons,
      utilizationGraph,
      iopsGraph,
      bandwidthGraph;

  component.el = element(by.tagName('sf-sync-graphs'));
  component.contextGraph = {
    el: element(by.id('cluster-iops-context'))
  };
  component.contextButtons = function () {
    contextButtons = element(by.css('.selection-buttons'));
    return {
      el: contextButtons,
      count: contextButtons.all(by.css('.button')).count(),
      iops: contextButtons.element(by.css('.-sync-graph-1-service')),
      bandwidth: contextButtons.element(by.css('.-sync-graph-2-service')),
      utilization: contextButtons.element(by.css('.-sync-graph-3-service'))
    };
  };
  component.iopsGraph = function () {
    iopsGraph = element(by.id('sync-graph-1-service'));
    return {
      el: iopsGraph,
      infoBox: {
        count: iopsGraph.all(by.css('.info-box-content')).count()
      }
    };
  };
  component.bandwidthGraph = function () {
    bandwidthGraph = element(by.id('sync-graph-2-service'));
    return {
      el: bandwidthGraph,
      infoBox: {
        count: bandwidthGraph.all(by.css('.info-box-content')).count()
      }
    };
  };
  component.utilizationGraph = function () {
    utilizationGraph = element(by.id('sync-graph-3-service'));
    return {
      el: utilizationGraph,
      infoBox: {
        count: utilizationGraph.all(by.css('.info-box-content')).count()
      }
    };
  };
};

module.exports = PerformanceComponent;
