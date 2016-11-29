'use strict';

module.exports = function() {
  this.Then(/^I see a SolidFire sf-sync-graphs component with efficiency data$/, function () {
    return this.expect(this.efficiencyComponent.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Efficiency graph$/, function () {
    return this.expect(this.efficiencyComponent.graphs.efficiencyGraph.el.isDisplayed()).to.eventually.be.true;
  });
};


