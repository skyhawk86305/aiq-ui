/* jshint expr: true */
'use strict';

var support = require('./support.js');
var expect = support.expect;
var mockBackend = support.mockBackend;

// THIS IS A DEMO FILE ONLY, IT SHOULD EVENTUALLY BE REMOVED.

xdescribe('An example of how to use the default fixture data for testing', function() {
  it('should display fixture data served from the mock server by default', function() {
    browser.get('#/cluster/11/volumes');
    expect(element.all(by.repeater('volume in appCtrl.volumes')).count()).to.eventually.equal(2);
    expect(element.all(by.css('.volume-data')).get(0).getText()).to.eventually.contain('foobar');
    expect(element.all(by.css('.volume-data')).get(1).getText()).to.eventually.contain('barbaz');
  });
});

xdescribe('An example of how override default fixture data for a specific test', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should display the the mock data I stubbed in before the test', function() {
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
    mockBackend.http.whenPOST('/json-rpc/2.0').respond(myMockData);
    mockBackend.http.whenGET('/sessions').respond();
    browser.get('#/cluster/11/volumes');
    expect(element.all(by.repeater('volume in appCtrl.volumes')).count()).to.eventually.equal(3);
    expect(element.all(by.css('.volume-data')).get(0).getText()).to.eventually.contain('myFoo');
    expect(element.all(by.css('.volume-data')).get(1).getText()).to.eventually.contain('myBar');
    expect(element.all(by.css('.volume-data')).get(2).getText()).to.eventually.contain('myBaz');
  });
});


xdescribe('An example of how the tests revert to using the default fixture data', function() {
  it('should display fixture data served from the mock server anywhere the mockBackend is not explicitly enabled', function() {
    browser.get('#/cluster/11/volumes');
    expect(element.all(by.repeater('volume in appCtrl.volumes')).count()).to.eventually.equal(2);
    expect(element.all(by.css('.volume-data')).get(0).getText()).to.eventually.contain('foobar');
    expect(element.all(by.css('.volume-data')).get(1).getText()).to.eventually.contain('barbaz');
  });
});

