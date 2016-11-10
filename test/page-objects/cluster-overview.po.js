'use strict';

var ClusterOverviewComponent = function () {
  var performanceGraph,
      performanceUtilizationGraph,
      infoBar;

  this.el = element(by.css("overview-dashboard-page"));

  this.performanceGraph = function () {
    performanceGraph = element(by.css("sf-graph-time-series[component-id=performance-graph]"));
    return {
      el: performanceGraph
    };
  };
  this.performanceUtilizationGraph = function () {
    performanceUtilizationGraph = element(by.css("sf-graph-time-series[component-id=utilization-graph]"));
    return {
      el: performanceUtilizationGraph
    };
  };
  this.infoBar = function () {
    infoBar = element(by.id('.sf-widget.info-bar'));
    return {
      el: infoBar,
      badges: {
        // Badge count = 8 (badges within clusterFault badge container not counted)
        count: infoBar.all(by.css(".info-box-content")).count(),
        nodeCount: infoBar.all(by.css(".info-box-content.-node-count")),
        blockCapacity: infoBar.element(by.css(".info-box-content.-block-capacity")),
        metadataCapacity: infoBar.element(by.css(".info-box-content.-metadata-capacity")),
        efficiency: infoBar.element(by.css(".info-box-content.-efficiency")),
        utilization: infoBar.element(by.css(".info-box-content.-utilization")),
        iops: infoBar.element(by.css(".info-box-content.-iops")),
        bandwidth: infoBar.element(by.css(".info-box-content.-bandwidth")),
        clusterFaults: infoBar.element(by.css(".info-box-content.-clusterFaults")),
        clusterFaultWarning: infoBar.element(by.css(".-clusterFaults > .badge-container > .-warning")),
        clusterFaultError: infoBar.element(by.css(".-clusterFaults > .badge-container > .-warning"))
      }
    };
  };
};

module.exports = ClusterOverviewComponent;
