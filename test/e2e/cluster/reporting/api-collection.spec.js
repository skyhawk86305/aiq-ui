/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('api-collection');
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var fixture = support.fixture('GetGuzzleAPIs');
var uniqueKey = 'source';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'source', label: 'Element API Method', format: {filter: 'apiCollectionLink', args:['26']}},
  {key: 'ingestedTime', label: 'Last Updated', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}}
];

describe('The Cluster API Collection Page', function () {

  /* have to use URL right now as we have disabled navigation to this page temporarily
  beforeEach(function(done) {
    support.login(function() {
      browser.get('#/');
      clusterSelect.open().clustersList().selectClusterByIndex(0);
      navbar.subNavbar.click('cluster-reporting').then(function() {
          navbar.subNavMenu.click('cluster-reporting-apiCollection').then(done);
      });
    });
  });
  */
  beforeEach(function(done) {
    support.login(function() {
      browser.get('#/cluster/26/reporting/apiCollection').then(done);
    });
  });

  afterEach(function(done) {
      support.logout(done);
  });

  it('should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  // TODO: Test currently fails due to the unique key having a custom formatter applied
  // support.testTableData needs to be updated.
  xit('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture, done);
  });

  describe('clicking an API link', function () {
    it('should go to the correct API page of results', function (done) {
      browser.get('#/cluster/26/reporting/apiCollection');
      table.content.el.element(by.id(fixture[0].source + 'Link')).click();
      browser.getAllWindowHandles().then(function(handles) {
        browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
        browser.switchTo().window(handles[1]).then(function () {
          browser.driver.getCurrentUrl().then(function(url) {
            expect(url).to.contain('/state/cluster/26/' + fixture[0].source);
            browser.close();
          });
        });
        browser.ignoreSynchronization = false;
        browser.switchTo().window(handles[0]);
        done();
      });
    });
  });

  describe('when changing to a different cluster', function () {
    it('should update the URLs for each API link', function (done) {
      browser.get('#/cluster/26/reporting/apiCollection');
      table.content.el.element(by.id(fixture[0].source + 'Link')).click();
      browser.getAllWindowHandles().then(function(handles) {
        browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
        browser.switchTo().window(handles[1]).then(function () {
          browser.driver.getCurrentUrl().then(function(url) {
            expect(url).to.contain('/state/cluster/26/' + fixture[0].source);
            browser.close();
          });
        });
        browser.ignoreSynchronization = false;
        browser.switchTo().window(handles[0]);
        browser.get('#/cluster/11/reporting/apiCollection');
        table.content.el.element(by.id(fixture[0].source + 'Link')).click();
        browser.getAllWindowHandles().then(function(handles) {
          browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
          browser.switchTo().window(handles[1]).then(function () {
            browser.driver.getCurrentUrl().then(function(url) {
              expect(url).to.contain('/state/cluster/11/' + fixture[0].source);
              browser.close();
            });
          });
          browser.ignoreSynchronization = false;
          browser.switchTo().window(handles[0]);
          done();
        });
      });
    });
  });
});
