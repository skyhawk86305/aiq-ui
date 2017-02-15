/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('virtual-volume');
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListVirtualVolumes'));
var uniqueKey = 'volumeID';
var itemsPerPage = 25;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'volumeID', label: 'Volume ID', format: {filter: 'string'}},
  {key: 'snapshotID', label: 'Snapshot ID', format: {filter: 'string'}},
  {key: 'parentVirtualVolumeID', label: 'Parent Virtual Volume ID', format: {filter: 'string'}},
  {key: 'virtualVolumeID', label: 'Virtual Volume ID', format: {filter: 'string'}},
  {key: 'VMW_VVolName', label: 'Name', format: {filter: 'string'}},
  {key: 'VMW_GosType', label: 'Guest OS Type', format: {filter: 'string'}},
  {key: 'virtualVolumeType', label: 'Type', format: {filter: 'string'}},
  {key: 'access', label: 'Access', format: {filter: 'access'}},
  {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
  {key: 'snapshotInfo', label: 'Snapshot', format: {filter: 'string'}},
  {key: 'minIOPS', label: 'Min IOPS', format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'maxIOPS', label: 'Max IOPS', format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'burstIOPS', label: 'Burst IOPS',  format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'VMW_VmID', label: 'VMW_VmId', format: {filter: 'string'}},
  {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}}
  ];

function mapFixture(rawFixture) {
  return rawFixture.virtualVolumes.map(function(volume) {
    /*jshint camelcase: false*/
    volume.VMW_GosType = volume.metadata.VMW_GosType;
    volume.VMW_VmID = volume.metadata.VMW_VmID;
    volume.VMW_VVolName = volume.metadata.VMW_VVolName;
    volume.access = volume.volumeInfo.access;
    volume.totalSize = volume.volumeInfo.totalSize;
    volume.minIOPS = volume.volumeInfo.qos.minIOPS;
    volume.maxIOPS = volume.volumeInfo.qos.maxIOPS;
    volume.burstIOPS = volume.volumeInfo.qos.burstIOPS;
    volume.createTime = volume.volumeInfo.createTime;
    return volume;
  });
}

describe('The Cluster Virtual Volumes Page', function () {

  beforeAll(function(done) {
    support.manualLogin();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/vvols/virtual-volumes').then(done);
  });

  afterAll(function() {
    support.manualLogout();
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

  it('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture, done);
  }, 60000);

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
