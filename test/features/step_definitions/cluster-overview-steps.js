//   And I see a sf-widget with "highLevel" stats

//   And I see a sf-widget with "highLevel" stats
this.Then(/^I see a sf-widget with "(.*)" stats/, function (text) {
  this.expect(this.clusterOverview.infoBar.getText()).to.eventually.contain(text);
});

//   And the sf-widget contains "Nodes, Block Capacity, Metadata Capacity, Efficiency, Utilization, IOPS, Bandwidth, Cluster Faults"
this.Then(/^the sf-widget contains "(.*)"/, function (text) {
  return this.expect(this.clusterOverview.infoBar.el.isDisplayed()).to.eventually.be.true;
});
