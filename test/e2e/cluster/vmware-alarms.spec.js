'use strict';

const _ = require('lodash');
const moment = require('moment');
const support = require('../support.js');
const expect = support.expect;
const TableComponent = require('../page-objects/components/sf-components.po').table;
const table = new TableComponent('vmware-alarms');
const fixture = mapFixture(support.fixture('get_alarm_info-Guzzle'));
const uniqueKey = 'creationEventId';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const clusterSelect = new support.clusterSelectComponent();
const columns = [
  { label: 'Creation ID', key: 'creationEventId', width: 100, format: { filter: 'aiqNumber', args: [0, true] } },
  { label: 'Alarm ID', key: 'alarmId', width: 100 },
  { label: 'Alarm Name', key: 'name' },
  { label: 'Description', key: 'description', exclude: true }, // Some descriptions include HTML formatting
  { label: 'Last Modified Time', key: 'lastModifiedTime', format: { filter: 'aiqDate' } },
  { label: 'Last Modified User', key: 'lastModifiedUser' },
  { label: 'Entity ID', key: 'entityId' }
];
let clusterId;

function mapFixture(rawFixture) {
  return _.get(rawFixture, 'vcenter-alarms', []).map( alarm => {
    return Object.assign({}, alarm, {
      alarmId: _.get(alarm, 'alarm._moId'),
      entityId: _.get(alarm, 'entity._moId'),
      lastModifiedTime: moment(_.get(alarm, 'lastModifiedTime')).format('x')
    });
  });
}

describe('The VMware Alarms Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/vmwareAlarms').then(done);
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

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
