/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var NodesPage = require('../page-objects/cluster/nodes/nodes.po');
var nodesPage = new NodesPage();
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

fdescribe('The Cluster Nodes Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/nodes');
    expect(nodesPage.table.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct columns and headers', function () {
    expect(nodesPage.table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(nodesPage.table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(nodesPage.table, columns, maxRows, uniqueKey, fixture, done);
  });

  it('should have an export button for the table', function() {
    expect(nodesPage.table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });

  it('should display VLAN tag info', function() {
    expect(nodesPage.infoBar.infoBox('mvip').el.isDisplayed()).to.eventually.be.true;
    expect(nodesPage.infoBar.infoBox('mvip-tag').el.isDisplayed()).to.eventually.be.true;
    expect(nodesPage.infoBar.infoBox('svip').el.isDisplayed()).to.eventually.be.true;
    expect(nodesPage.infoBar.infoBox('svip-tag').el.isDisplayed()).to.eventually.be.true;
  });

  it('the info-boxes must be wider than its value text', function(){
    support.infoBoxSizeCheck(nodesPage.infoBar,'mvip');
    support.infoBoxSizeCheck(nodesPage.infoBar,'mvip-tag');
    support.infoBoxSizeCheck(nodesPage.infoBar,'svip');
    support.infoBoxSizeCheck(nodesPage.infoBar,'svip-tag');
  });
});
