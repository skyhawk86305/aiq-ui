/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('node');
var fixture = mapFixture(support.fixture('ListActiveNodes'));
var uniqueKey = 'nodeID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'nodeID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'name', label: 'Name', format: {filter: 'string'}},
  {key: 'nodeType', label: 'Type', format: {filter: 'string'}},
  {key: 'softwareVersion', label: 'Version', format: {filter: 'string'}},
  {key: 'serviceTag', label: 'Service Tag', format: {filter: 'string'}},
  {key: 'mip', label: 'Management IP', format: {filter: 'string'}},
  {key: 'cip', label: 'Cluster IP', format: {filter: 'string'}},
  {key: 'sip', label: 'Storage IP', format: {filter: 'string'}},
  {key: 'ipcPort', label: 'Replication Port', format: {filter: 'aiqNumber', args: [0, true]}}
];

function mapFixture(rawFixture) {
  return rawFixture.result.nodes.map(function(node) {
    return node;
  });
}

describe('The Cluster Nodes Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/nodes');
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });
  
  it('should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });
});
