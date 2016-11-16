'use strict';

module.exports = function() {
  this.Then(/^I see a sf-infobar-widget$/, function () {
    return this.expect(this.clusterOverview.infoBar.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^The sf-infobar-widget has "(.*)" widgets$/, function (count) {
    this.expect(this.clusterOverview.infoBar.infoBoxes.count()).to.eventually.equal(parseInt(count));
  });

  this.Then(/^The sf-infobar-widget contains infoboxes: "(.*)"$/, function (array, done) {
    var world = this,
        columns = array.split(/,\s*/);

    columns.forEach(function(column, i) {
      world.expect(world.clusterOverview.infoBar.infoBoxHeaders.get(i).getText()).to.eventually.equal(column);
    });
    world.expect(world.clusterOverview.infoBar.infoBoxHeaders.count()).to.eventually.equal(columns.length).notify(done);
  });
};


