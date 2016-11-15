'use strict';
var GraphTimeSeries = require('./graph-time-series.po');
var Table = require('./table.po');

var ClusterOverviewComponent = function () {
  var infoBar;

  this.el = element(by.css(".overview-dashboard-page"));

  this.graphs = {
    clusterPerformance: new GraphTimeSeries('performance-graph'),
    performanceUtilization: new GraphTimeSeries('utilization-graph')
  };


  this.infoBar = function () {
    infoBar = element(by.css('.sf-widget > .info-bar-row'));
    return {
      el: infoBar,
      infoBoxes: {
        count: infoBar.all(by.id(".info-box-content")).count(),
        nodeCount: infoBar.element(by.id("node-count-info-box")),
        blockCapacity: infoBar.element(by.id("block-capacity-info-bo")),
        metadataCapacity: infoBar.element(by.id("metadata-capacity-info-box")),
        efficiency: infoBar.element(by.id("efficiency-info-box")),
        utilization: infoBar.element(by.id(".utilization-info-box")),
        iops: infoBar.element(by.id("iops-info-box")),
        bandwidth: infoBar.element(by.id("bandwidth-info-box")),
        clusterFaults: infoBar.element(by.id("cluster-faults-info-box")),
        clusterFaultError: infoBar.element(by.css(".info-box-content > .badge-container > .-error")),
        clusterFaultWarning: infoBar.element(by.css(".info-box-content  > .badge > .-warning"))
      }
    };
  };

}

// node-count-info-box, block-capacity-info-box, metadata-capacity-info-box, efficiency-info-bx, utilization-info-box,
// iops-info-box, bandwidth-info-box, cluster-faults-info-box

this.alertTable = new Table('alert-table')

module.exports = ClusterOverviewComponent;

