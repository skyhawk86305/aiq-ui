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

  this.Then(/^The "(.*)" table contains "(.*)" data with attribute "(.*)" matching regex format "(.*)"$/, function (type, method, attr, regexMatch, callback) {
    var world = this,
        fixtureData = world.getFixtureData(type, method),
        itemsPerPage = 25,
        maxRows = fixtureData.length > itemsPerPage ? itemsPerPage : fixtureData.length,
        randomIndex = Math.floor((Math.random() * maxRows));

    world.table(type).data(attr, randomIndex).then(function(actualData){
      var regex = new RegExp(regexMatch);
      world.expect(regex.test(actualData)).to.equal(true, attr + ' value: ' + actualData + ' failed to match regex: ' + regexMatch);
      callback();
    });
  });

  this.Then(/^The "(.*)" table contains "(.*)" data with attrs: "(.*)"$/, function (type, method, array, callback) {
    var world = this,
        attrs = array.split(/,\s*/),
        dataMatch, expectedData,
        fixtureData = world.getFixtureData(type, method),
        itemsPerPage = 25,
        maxRows = fixtureData.length > itemsPerPage ? itemsPerPage : fixtureData.length,
        uniqueKey = world.getUniqueKey(type),
        randomIndex = Math.floor((Math.random() * maxRows)),
        randomTableId = world.table(type).data(uniqueKey, randomIndex);

    randomTableId.getText().then(function(id) {
      dataMatch = fixtureData.find(function(data) { return data[uniqueKey].toString() === id; });
      attrs.forEach(function(attr) {
        world.table(type).data(attr, randomIndex).then(function(actualData){
          expectedData = world.formatFixtureData(dataMatch[attr], type, attr);
          world.expect(actualData).to.equal(expectedData, 'Attribute ' + attr + ' failed to match value');
        });
      });
    });

    world.table(type).rows.count().then(function(actualData){
      world.expect(actualData).to.equal(maxRows+1);
      callback();
    });
  });
};
