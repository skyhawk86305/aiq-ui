'use strict';

const support = require('../support.js');
const expect = support.expect;
const TableComponent = require('../page-objects/components/sf-components.po').table;
const table = new TableComponent('clusters');
const fixture = mapFixture(support.fixture('ListClusterDetails'));
const uniqueKey = 'id';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  { label: 'Customer', key: 'customerName' },
  { label: 'Cluster Name', key: 'name' },
  { label: 'Cluster ID', key: 'id', format: { filter: 'string' } },
];

function mapFixture(rawFixture) {
  return rawFixture.result.clusters;
}

describe('The Dashboard Overview Page', function() {

  beforeAll(function() {
    support.login();
  });

  beforeEach(function() {
    browser.get('#/dashboard/overview');
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function() {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function() {
    columns.forEach( column => {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('@any should show the correct columns when the Overview group is selected', function() {
    table.controlBar.columnGroups.buttons.get(0).click();
    expect(table.content.columns.getText()).to.eventually.deep.equal([
      'Customer',
      'Cluster Name',
      'Cluster ID',
      'Version',
      'Nodes',
      'Volumes',
      'Used Block Capacity',
      'Average IOPS',
      'Efficiency',
      'Unresolved Alerts',
      'SVIP',
      'MVIP',
      'Last Update Time',
    ]);
  });

  it('@any should show the correct columns when the Performance Details group is selected', function() {
    table.controlBar.columnGroups.buttons.get(1).click();
    expect(table.content.columns.getText()).to.eventually.deep.equal([
      'Customer',
      'Cluster Name',
      'Cluster ID',
      'Average IOPS',
      'Peak IOPS',
      'Performance Utilization',
      'iSCSI Sessions',
    ]);
  });

  it('@any should show the correct columns when the Capacity Details group is selected', function() {
    table.controlBar.columnGroups.buttons.get(2).click();
    expect(table.content.columns.getText()).to.eventually.deep.equal([
      'Customer',
      'Cluster Name',
      'Cluster ID',
      'Total Block Capacity',
      'Used Block Capacity',
      'Total Metadata Capacity',
      'Used Metadata Capacity',
      'Provisioned Space',
      'Efficiency',
      'Deduplication',
      'Compression',
      'Thin Provisioning',
    ]);
  });

  it('@any should show the correct columns when the Cluster Stats group is selected', function() {
    table.controlBar.columnGroups.buttons.get(3).click();
    expect(table.content.columns.getText()).to.eventually.deep.equal([
      'Customer',
      'Cluster Name',
      'Cluster ID',
      'Version',
      'Nodes',
      'Current IOPS',
      'Average IOPS',
      'Peak IOPS',
      'Compression',
      'Deduplication',
      'Thin Provisioning',
      'Efficiency',
      'Volumes',
      'iSCSI Sessions',
      'Performance Utilization',
      'Used Block Capacity',
      'Provisioned Space',
    ]);
  });

  it('should display data from the correct API and properly format it in the table', function() {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});

