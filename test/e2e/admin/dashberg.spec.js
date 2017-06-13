'use strict';

const DashbergPage = require('../page-objects/admin/dashberg.po');
const dashberg = new DashbergPage();
const support = require('../support.js');
const expect = support.expect;
const fixtureNode = mapFixture(support.fixture('DashbergNode'));
const fixtureBandwidth = mapFixture(support.fixture('DashbergBandwidth'));
const fixtureIOP = mapFixture(support.fixture('DashbergIOP'));
const fixtureSession = mapFixture(support.fixture('DashbergSession'));
const fixtureSnapshot= mapFixture(support.fixture('DashbergSnapshot'));
const fixtureVolume = mapFixture(support.fixture('DashbergVolume'));
const fixtureVolumeAccess = mapFixture(support.fixture('DashbergVolumeAccess'));
const fixtureVolumeSize = mapFixture(support.fixture('DashbergVolumeSize'));

function mapFixture(rowFixture) {
  return rowFixture.result;
};

describe('The Dashberg Page', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function() {
    browser.get('#/admin/dashberg');
  });

  afterAll(function() {
    support.logout();
  });

  it('should load dashberg page correctly', function() {
    expect(dashberg.el.isDisplayed()).to.eventually.be.true;
  })

  it('should load node info box correctly', function() {
    expect(dashberg.nodeBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load volume info box correctly', function() {
    expect(dashberg.volumeBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load volume size info box correctly', function() {
    expect(dashberg.volumeSizeBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load volume access info box correctly', function() {
    expect(dashberg.volumeAccessBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load IOP info box correctly', function() {
    expect(dashberg.IOPBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load bandwidth info box correctly', function() {
    expect(dashberg.bandwidthBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load session info box correctly', function() {
    expect(dashberg.sessionBox.isDisplayed()).to.eventually.be.true;
  })

  it('should load snapshot info box correctly', function() {
    expect(dashberg.snapshotBox.isDisplayed()).to.eventually.be.true;
  })

  it('should be checked when clicked nodeDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.nodeDataCheckbox).click().perform();
    expect( dashberg.nodeCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.nodeDataCheckbox).click().perform();
    expect( dashberg.nodeCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked volumeDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.volumeDataCheckbox).click().perform();
    expect( dashberg.volumeCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.volumeDataCheckbox).click().perform();
    expect( dashberg.volumeCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked volumeSizeDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.volumeSizeDataCheckbox).click().perform();
    expect( dashberg.volumeSizeCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.volumeSizeDataCheckbox).click().perform();
    expect( dashberg.volumeSizeCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked volumeAccessDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.volumeAccessDataCheckbox).click().perform();
    expect( dashberg.volumeAccessCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.volumeAccessDataCheckbox).click().perform();
    expect( dashberg.volumeAccessCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked bandwidthDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.bandwidthDataCheckbox).click().perform();
    expect( dashberg.bandwidthCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.bandwidthDataCheckbox).click().perform();
    expect( dashberg.bandwidthCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked IOPDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.IOPDataCheckbox).click().perform();
    expect( dashberg.IOPCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.IOPDataCheckbox).click().perform();
    expect( dashberg.IOPCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked sessionDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.sessionDataCheckbox).click().perform();
    expect( dashberg.sessionCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.sessionDataCheckbox).click().perform();
    expect( dashberg.sessionCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should be checked when clicked snapshotDataCheckbox, and be unchecked when clicked again', function() {
    browser.actions().mouseMove(dashberg.snapshotDataCheckbox).click().perform();
    expect( dashberg.snapshotCheckboxModel.isSelected() ).to.eventually.be.true;
    browser.actions().mouseMove(dashberg.snapshotDataCheckbox).click().perform();
    expect( dashberg.snapshotCheckboxModel.isSelected() ).to.eventually.be.false;
  })

  it('should contain node data title, description and data table', function() {
    expect(dashberg.nodeDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.nodeDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.nodeDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain volume data title, description and data table', function() {
    expect(dashberg.volumeDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain volume size data title, description and data table', function() {
    expect(dashberg.volumeSizeDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeSizeDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeSizeDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain volume access data title, description and data table', function() {
    expect(dashberg.volumeAccessDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeAccessDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.volumeAccessDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain IOP data title, description and data table', function() {
    expect(dashberg.IOPDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.IOPDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.IOPDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain bandwidth data title, description and data table', function() {
    expect(dashberg.bandwidthDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.bandwidthDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.bandwidthDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain session data title, description and data table', function() {
    expect(dashberg.sessionDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.sessionDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.sessionDataTable.isPresent()).to.eventually.be.true;
  })

  it('should contain snapshot data title, description and data table', function() {
    expect(dashberg.snapshotDataTitle.isPresent()).to.eventually.be.true;
    expect(dashberg.snapshotDataDescription.isPresent()).to.eventually.be.true;
    expect(dashberg.snapshotDataTable.isPresent()).to.eventually.be.true;
  })
});