'use strict';

const support = require('../../support.js');
const _ = require('lodash');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const snapshotSchedulesTable = new TableComponent('snapshot-schedules');
const clusterSelect = new support.clusterSelectComponent();
const fixture = mapFixture(support.fixture('ListSchedules-Guzzle'));
const itemsPerPage = 25;
const uniqueKey = 'scheduleID';
let clusterId;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  {key: 'scheduleID', label: 'ID', format: {filter: 'string'}},
  {key: 'scheduleName', label: 'Name', format: {filter: 'string'}},
  {key: 'scheduleFrequency', label: 'Frequency', format: {filter: 'string'}},
  {key: 'recurring', label: 'Recurring', format: {filter: 'boolean', args: ['Yes', 'No']}},
  {key: 'scheduleVolumeIDs', label: 'Volume IDs', format: {filter: 'string'}},
  {key: 'lastRunTimeStarted', label: 'Last Run', format: {filter: 'aiqDate', args: ['yyyy-MM-dd HH:mm:ss'] }},
  {key: 'lastRunStatus', label: 'Last Run Status', format: {filter: 'string'}},
  {key: 'paused', label: 'Manually Paused', format: {filter: 'boolean', args: ['Yes', 'No']}}
];

function mapFixture(rawFixture) {
  return rawFixture.schedules.map(schedule => {
    const volumeID = _.get(schedule, 'scheduleInfo.volumeID');
    const volumeIDs = _.get(schedule, 'scheduleInfo.volumes');
    schedule.scheduleFrequency = _.get(schedule, 'attributes.frequency');
    schedule.scheduleVolumeIDs = volumeID ? volumeID : ( volumeIDs ? volumeIDs.join(', ') : null);
    return Object.assign({}, schedule);
  });
}

describe('The Snapshot Schedules Page', function() {

  beforeAll(function() {
    support.login();
    const openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect)
      .then( firstClusterId => {
        clusterId = firstClusterId;
      });
  });

  beforeEach(function() {
    browser.get('#/cluster/' + clusterId + '/volumes/snapshot-schedules');
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a snapshot schedules table component on page load', function () {
    expect(snapshotSchedulesTable.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(snapshotSchedulesTable.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(snapshotSchedulesTable.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(snapshotSchedulesTable, columns, maxRows, uniqueKey, fixture, done);
  });

  it('@any should have an export button for the table', function() {
    expect(snapshotSchedulesTable.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
