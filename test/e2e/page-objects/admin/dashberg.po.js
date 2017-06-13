'use strict';

module.exports = class DashbergPage {
  constructor() {
    this.el = element(by.css('.dashberg-page'));
    this.nodeBox = element(by.css('.node-info-box'));
    this.volumeBox = element(by.css('.volume-info-box'));
    this.volumeSizeBox = element(by.css('.volume-size-info-box'));
    this.volumeAccessBox = element(by.css('.volume-access-info-box'));
    this.IOPBox = element(by.css('.IOP-info-box'));
    this.bandwidthBox = element(by.css('.bandwidth-info-box'));
    this.sessionBox = element(by.css('.session-info-box'));
    this.snapshotBox = element(by.css('.snapshot-info-box'));
  }
}