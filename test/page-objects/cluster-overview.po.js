'use strict';

var ClusterOverviewComponent = function () {
  var infoBar;

  this.el = element(by.css("overview-dashboard-page"));

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
        clusterFaultError: infoBar.element(by.css(".-clusterFaults > .badge-container > .-error")),
        clusterFaultWarning: infoBar.element(by.css(".-clusterFaults > .badge-container > .-warning"))
      }
    };
  };

};


module.exports = ClusterOverviewComponent;
