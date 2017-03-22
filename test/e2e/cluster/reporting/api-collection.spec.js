'use strict';

const support = require('../../support.js');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const table = new TableComponent('api-collection');
const clusterSelect = new support.clusterSelectComponent();
const fixture = mapFixture(support.fixture('GetGuzzleAPIs'));
const uniqueKey = 'source';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  {key: 'source', label: 'Element API Method', format: {filter: 'apiCollectionLink', args:['26']}},
  {key: 'ingestedTime', label: 'Last Updated', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}}
];
let clusterId;

function mapFixture(rawFixture) {
  const apiBlacklist = [
    'GetProcessInfo',
    'GetStartupFlags',
    'GetTime',
    'ListCoreFiles',
    'ListMountedFileSystems'
  ];

  return rawFixture.filter(api => {
    return (api && api.source) ? (apiBlacklist.indexOf(api.source) < 0) : false;
  });
}

describe('The Cluster API Collection Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/apiCollection').then(done);
  });

  afterAll(function() {
    support.logout();
  });


  it('@any @smoke should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  // TODO: Test currently fails due to the unique key having a custom formatter applied
  // support.testTableData needs to be updated.
  xit('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
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
