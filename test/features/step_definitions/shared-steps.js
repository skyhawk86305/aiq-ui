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

  this.Then(/^The "(.*)" table contains "(.*)" data with attrs: "(.*)"$/, function (type, method, array, callback) {
    var world = this,
        attrs = array.split(/,\s*/),
        expectedDataSet, expectedData, actualData,
        fixtureData = this.fixture(type, method),
        itemsPerPage = 20,
        maxRows = fixtureData.length > itemsPerPage ? itemsPerPage : fixtureData.length,
        randomIndex = Math.floor((Math.random() * maxRows)),
        uniqueIdentifier = world.uniqueIdentifier(type);

      world.idValueFromUi(type, uniqueIdentifier, randomIndex).then(function(idValue){
        expectedDataSet = world.idValueFromAPI(fixtureData, uniqueIdentifier, idValue);
        attrs.forEach(function(attr) {
          world.table(type).data(attr, randomIndex).then(function(actualData){
            var p = attr.indexOf('.');
            //check to see if the parameter is part of a nested parameter and if it is break it down
            if (p >= 0){
              var attr1 = attr.substring(0, p),
                attr2 = attr.substring(p + 1, attr.length);
                expectedData = world.format(expectedDataSet[0][attr1][attr2], type, attr);
            }
            else {
              expectedData = world.format(expectedDataSet[0][attr], type, attr);
            }
            world.expect(actualData).to.equal(expectedData.toString());
          });
        });
       });
    world.table(type).rows.count().then(function(actualRowCount){
      world.expect(actualRowCount).to.equal(maxRows+1);
      callback();
    })
  });
};
