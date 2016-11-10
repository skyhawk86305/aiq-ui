'use strict';

var ClusterOverviewDashboardComponent = function () {
  var component = this,
      performanceGraph,
      performanceUtilizationGraph,
      infoBar;

  component.el = element(by.tagName('overview-dashboard-page'));

  component.performanceGraph = function () {
    performanceGraph = element(by.id('sync-graph-1-service'));
    return {
      el: performanceGraph
    };
  };
  component.performanceUtilizationGraph = function () {
    performanceUtilizationGraph = element(by.id('sync-graph-2-service'));
    return {
      el: performanceUtilizationGraph
    };
  };
  component.infoBar = function () {
    infoBar = element(by.id('sync-graph-3-service'));
    return {
      el: infoBar,
      badges: {
        count: usedGraph.all(by.css('.info-box-content')).count(),
        blockCapacity: usedGraph.element(by.id('used-capacity-used-badge')),
        metadataCapacity: usedGraph.element(by.id('warning-threshold-used-badge')),
        efficiency: usedGraph.element(by.id('error-threshold-used-badge')),
        utilization: usedGraph.element(by.id('total-capacity-used-badge')),
        iops: usedGraph.element(by.id('current-state-used-badge')),
        bandwidth: usedGraph.element(by.id('current-state-used-badge')),
        // HOW TO HANDLE @ BADGES IN A BADGE CONTAINER
        iops: usedGraph.element(by.id('current-state-used-badge')),
        iops: usedGraph.element(by.id('current-state-used-badge'))
      }
    };
  };
};

module.exports = ClusterOverviewDashboardComponent;
