'use strict';

module.exports = function() {
  this.Given(/^I stub in mock data for the http call under test$/, function () {
    var myMockData = {
      result: {
        volumes: [
          {
            volumeID: 1,
            name: 'myFoo'
          },
          {
            volumeID: 2,
            name: 'myBar'
          },
          {
            volumeID: 2,
            name: 'myBaz'
          }
        ]
      }
    };
    this.mockBackend.http.whenPOST('/v2/api').respond(myMockData);
  });

  this.Then(/^I see default fixture data served by the mock server$/, function (done) {
    this.expect(element.all(by.repeater('volume in appCtrl.volumes')).count()).to.eventually.equal(2);
    this.expect(element.all(by.css('.volume-data')).get(0).getText()).to.eventually.contain('foobar');
    this.expect(element.all(by.css('.volume-data')).get(1).getText()).to.eventually.contain('barbaz').notify(done);
  });

  this.Then(/^I see my stubbed in data$/, function (done) {
    this.expect(element.all(by.repeater('volume in appCtrl.volumes')).count()).to.eventually.equal(3);
    this.expect(element.all(by.css('.volume-data')).get(0).getText()).to.eventually.contain('myFoo');
    this.expect(element.all(by.css('.volume-data')).get(1).getText()).to.eventually.contain('myBar');
    this.expect(element.all(by.css('.volume-data')).get(2).getText()).to.eventually.contain('myBaz').notify(done);
  });
};
