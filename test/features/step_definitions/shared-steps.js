'use strict';

module.exports = function() {
  this.Given(/^The app is open in a browser$/, function () {
    browser.get('#');
  });

  this.When(/^I navigate to the "(.*)" page$/, function (page) {
    browser.get('#/' + page);
  });

  this.Then(/^I see a SolidFire table with "(.*)" data$/, function (type) {
    return this.expect(this.table(type).el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^The "(.*)" table contains columns: "(.*)"$/, function (type, array, done) {
    var world = this,
        columns = array.split(/,\s*/);

    columns.forEach(function(column, i) {
      world.expect(world.table(type).headers.get(i).getText()).to.eventually.equal(column);
    });
    world.expect(world.table(type).headers.count()).to.eventually.equal(columns.length).notify(done);
  });

  this.Then(/^The "(.*)" table contains "(.*)" data with attrs: "(.*)"$/, function (type, method, array, done) {
    var world = this,
        attrs = array.split(/,\s*/),
        expectedData = this.fixture(type, method),
        itemsPerPage = 20,
        maxRows = expectedData.length > itemsPerPage ? itemsPerPage : expectedData.length,
        randomIndex = Math.floor((Math.random() * maxRows)),
        randomSample = expectedData[randomIndex];

    attrs.forEach(function(attr) {
      world.expect(world.table(type).data(type, attr, randomIndex).getText()).to.eventually.equal(randomSample[attr].toString());
    });
    world.expect(world.table(type).rows.count()).to.eventually.equal(maxRows+1).notify(done);
  });
};
