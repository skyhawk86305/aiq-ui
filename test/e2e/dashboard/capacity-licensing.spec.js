'use strict';

const support = require('../support.js');
const expect = support.expect;
const TableComponent = require('../page-objects/components/sf-components.po').table;
const table = new TableComponent('capacity-licensing');
const fixture = mapFixture(support.fixture('ListCustomerLicensingInfo'));
const uniqueKey = 'customerID';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  { label: 'Customer ID', key: 'customerID', format: { filter: 'string' } },
  { label: 'Customer Name', key: 'customerName' },
  { label: 'Number of Capacity Licensed Nodes', key: 'licensedNodes', format: { filter: 'string' } },
  { label: 'Entitled Licensed Capacity', key: 'entitledCapacity', format: { filter: 'bytes' } },
  { label: 'Provisioned Licensed Capacity', key: 'provisionedLicensedCapacity', format: { filter: 'bytes' } },
];

function mapFixture(rawFixture) {
  return rawFixture.result.customers;
}

describe('The Capacity Licensing Page', function () {

  beforeAll(function() {
    support.login();
  });

  beforeEach(function() {
    browser.get('#/dashboard/capacity-licensing');
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach( column => {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});

