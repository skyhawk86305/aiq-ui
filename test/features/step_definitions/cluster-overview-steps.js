'use strict';

module.exports = function() {
  this.Then(/^I see a sf-infobar-widget with (.*) widgets:"$/, function (count) {
    return this.expect(this.clusterOverview.infoBar.el.isDisplayed()).to.eventually.be.true;
    this.expect(this.clusterOverview.infobar.badges.count).toEqual(count);

  });

  //   And the sf-widget contains "Nodes, Block Capacity, Metadata Capacity, Efficiency, Utilization, IOPS, Bandwidth, Cluster Faults"
  this.Then(/^the "(.*)" sf-widget contains the title "(.*)"/, function (id, text) {
    this.expect(this.clusterOverview.infoBar.getText()).to.eventually.contain(text);
  });
};
