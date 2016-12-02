'use strict';

module.exports = function () {
  this.Then(/^I see a sf-time-series graph component with "(.*)" data/, function (type) {
    return this.expect(this.overviewPage.graphs[type].el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a sf-infobar-widget$/, function () {
    return this.expect(this.overviewPage.infoBar.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^The sf-infobar-widget contains infoboxes: "(.*)"$/, function (array, done) {
    var world = this,
      columns = array.split(/,\s*/);

    columns.forEach(function (column, i) {
      world.expect(world.overviewPage.infoBar.infoBoxes.get(i).all(by.css('.title')).get(0).getText()).to.eventually.equal(column);
    });
    world.expect(world.overviewPage.infoBar.infoBoxes.count()).to.eventually.equal(columns.length).notify(done);
  });

  this.Then(/^The sf-infobar-widget has "(.*)" widgets$/, function (count) {
    this.expect(this.overviewPage.infoBar.infoBoxes.count()).to.eventually.equal(parseInt(count));
  });
};


