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

fdescribe('The Dashberg Page', function() {
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

});