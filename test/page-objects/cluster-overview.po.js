'use strict';

var ClusterOverviewComponent = function () {
  var infoBar;

  this.el = element(by.css("overview-dashboard-page"));

  this.infoBar = function () {
    infoBar = element(by.css('.sf-widget.info-bar'));
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
        clusterFaultError: infoBar.element(by.id(".-clusterFaults > .badge-container > .-error")),
        clusterFaultWarning: infoBar.element(by.id(".-clusterFaults > .badge-container > .-warning"))
      }
    };
  };

}

// node-count-info-box, block-capacity-info-box, metadata-capacity-info-box, efficiency-info-bx, utilization-info-box,
// iops-info-box, bandwidth-info-box, cluster-faults-info-box

module.exports = ClusterOverviewComponent;

