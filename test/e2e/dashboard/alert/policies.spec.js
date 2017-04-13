'use strict';

const support = require('../../support.js');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const ModalComponent = require('../../page-objects/components/sf-components.po').modal;
const table = new TableComponent('alert-policy');
const modal = new ModalComponent('delete-policy-form');
const fixture = mapFixture(support.fixture('ListNotifications'));
const uniqueKey = 'notificationName';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  {key: 'notificationName', label: 'Alert Policy Name', format: {filter: 'string'}},
  {key: 'destinationEmail', label: 'Destination', format: {filter:'string'}},
  {key: 'notificationSeverity', label: 'Severity', format: {filter:'string'}, exclude: true}, // Data is manipulated using custom severity filter
  {key: 'username', label: 'Creator', format: {filter:'string'}},
  {key: 'customerName', label: 'Customer', format: {filter:'string'}},
  {key: 'clusterName', label: 'Cluster', format: {filter:'string'}},
  {key: 'notificationFields', label: 'Alert Condition', format: {filter:'alert', args:['condition']} },
  {key: 'deletePolicy', label: 'Delete Policy', exclude: true },
];

function mapFixture(rawFixture) {
  return rawFixture.result.notifications.map(function(policy) {
    return policy;
  });
}

describe('The Alert Policies Page', function () {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });


  beforeEach(function(done) {
    browser.get('#/dashboard/alerts/policies').then(done);
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

  describe('Delete Policy button', function() {
    describe('when clicked', function() {
      it('should successfully delete a policy', function() {
        let deletePolicyButton = table.el.all(by.css('.delete-policy-button')).get(0);
        let policyCount;

        expect(deletePolicyButton.isPresent()).to.eventually.be.true;
        table.content.rows.count().then(count => {
          policyCount = count;deletePolicyButton.click();
          expect(modal.el.isPresent()).to.eventually.be.true;
          modal.footer.submitButton.click();
          expect(modal.el.isPresent()).to.eventually.be.false;
          /* TODO: Try and check that the list of policies has decreased by one.
           * Current API and mocking system won't allow for modifying the return
           * value of the API to include one less record.
           */
        });
      });

      // TODO: Test error handling when API/mocking library allow it
    });
  });
});
