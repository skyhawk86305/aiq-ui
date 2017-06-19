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

  it('should load dashberg page correctly', function() {
    expect(dashberg.el.isDisplayed()).to.eventually.be.true;
  })

  describe('node info box', function() {
    it('should load node info box correctly', function() {
      expect(dashberg.nodeInfoBox.nodeBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain node data title, description and data table', function() {
      expect(dashberg.nodeInfoBox.nodeDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.nodeInfoBox.nodeDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.nodeInfoBox.nodeDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('volume info box', function() {
    it('should load volume info box correctly', function() {
      expect(dashberg.volumeInfoBox.volumeBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain volume data title, description and data table', function() {
      expect(dashberg.volumeInfoBox.volumeDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeInfoBox.volumeDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeInfoBox.volumeDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('volume access info box', function() {
    it('should load volume access info box correctly', function() {
      expect(dashberg.volumeAccessInfoBox.volumeAccessBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain volume access data title, description and data table', function() {
      expect(dashberg.volumeAccessInfoBox.volumeAccessDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeAccessInfoBox.volumeAccessDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.volumeAccessInfoBox.volumeAccessDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('IOP info box', function() {
    it('should load IOP info box correctly', function() {
      expect(dashberg.IOPInfoBox.IOPBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain IOP data title, description and data table', function() {
      expect(dashberg.IOPInfoBox.IOPDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.IOPInfoBox.IOPDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.IOPInfoBox.IOPDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('bandwidth info box', function() {
    it('should load bandwidth info box correctly', function() {
      expect(dashberg.bandwidthInfoBox.bandwidthBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain bandwidth data title, description and data table', function() {
      expect(dashberg.bandwidthInfoBox.bandwidthDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.bandwidthInfoBox.bandwidthDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.bandwidthInfoBox.bandwidthDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('session info box', function() {
    it('should load session info box correctly', function() {
      expect(dashberg.sessionInfoBox.sessionBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain session data title, description and data table', function() {
      expect(dashberg.sessionInfoBox.sessionDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.sessionInfoBox.sessionDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.sessionInfoBox.sessionDataTable.isPresent()).to.eventually.be.true;
    })
  })

  describe('snapshot info box', function() {
    it('should load snapshot info box correctly', function() {
      expect(dashberg.snapshotInfobox.snapshotBox.isDisplayed()).to.eventually.be.true;
    })

    it('should contain snapshot data title, description and data table', function() {
      expect(dashberg.snapshotInfobox.snapshotDataTitle.isPresent()).to.eventually.be.true;
      expect(dashberg.snapshotInfobox.snapshotDataDescription.isPresent()).to.eventually.be.true;
      expect(dashberg.snapshotInfobox.snapshotDataTable.isPresent()).to.eventually.be.true;
    })
  })
});