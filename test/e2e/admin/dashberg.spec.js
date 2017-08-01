'use strict';

const DashbergPage = require('../page-objects/admin/dashberg.po');
const dashberg = new DashbergPage();
const support = require('../support.js');
const expect = support.expect;

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

  describe('performance info box', function() {
    it('should load perfomance info box correctly', function() {
      expect(dashberg.performanceInfobox.performanceBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain performance data title, description and data table', function() {
      expect(dashberg.performanceInfobox.performanceTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.performanceInfobox.performanceDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.performanceInfobox.performanceTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('bandwidth info box', function() {
    it('should load bandwidth info box correctly', function() {
      expect(dashberg.bandwidthInfoBox.bandwidthBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain bandwidth data title, description and data table', function() {
      expect(dashberg.bandwidthInfoBox.bandwidthTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.bandwidthInfoBox.bandwidthDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.bandwidthInfoBox.bandwidthTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('volume size info box', function() {
    it('should load volume size info box correctly', function() {
      expect(dashberg.volumeSizeInfoBox.volumeSizeBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain volume size data title, description and data table', function() {
      expect(dashberg.volumeSizeInfoBox.volumeSizeTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeSizeInfoBox.volumeSizeDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeSizeInfoBox.volumeSizeTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('metadata info box', function() {
    it('should load metadata info box correctly', function() {
      expect(dashberg.metadataInfoBox.metadataBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain metadata title and table', function() {
      expect(dashberg.metadataInfoBox.metadataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.metadataInfoBox.metadataTable.isPresent()).to.eventually.be.true;
    })
  })
});