'use strict',

module.exports = class DashbergPage {
  constructor() {
    this.nodeInfoBox = {
      nodeBox: element(by.css('.node-info-box')),
      nodeDataTitle: element(by.css('.node-data-title')),
      nodeDataDescription: element(by.css('.node-data-description')),
      nodeDataTable: element(by.css('.node-data-table'))
    }

    this.volumeInfoBox = {
      volumeBox: element(by.css('.volume-info-box')),
      volumeDataTitle: element(by.css('.volume-data-title')),
      volumeDataDescription: element(by.css('.volume-data-description')),
      volumeDataTable: element(by.css('.volume-data-table'))
    }

    this.volumeSizeInfoBox = {
      volumeSizeBox: element(by.css('.volume-size-info-box')),
      volumeSizeDataTitle: element(by.css('.volume-size-data-title')),
      volumeSizeDataDescription: element(by.css('.volume-size-data-description')),
      volumeSizeDataTable: element(by.css('.volume-size-data-table'))
    }

    this.volumeAccessInfoBox = {
      volumeAccessBox: element(by.css('.volume-access-info-box')),
      volumeAccessDataTitle: element(by.css('.volume-access-data-title')),
      volumeAccessDataDescription: element(by.css('.volume-access-data-description')),
      volumeAccessDataTable: element(by.css('.volume-access-data-table'))
    }

    this.IOPInfoBox = {
      IOPBox: element(by.css('.IOP-info-box')),
      IOPDataTitle: element(by.css('.IOP-data-title')),
      IOPDataDescription: element(by.css('.IOP-data-description')),
      IOPDataTable: element(by.css('.IOP-data-table'))
    }

    this.bandwidthInfoBox = {
      bandwidthBox: element(by.css('.bandwidth-info-box')),
      bandwidthDataTitle: element(by.css('.bandwidth-data-title')),
      bandwidthDataDescription: element(by.css('.bandwidth-data-description')),
      bandwidthDataTable: element(by.css('.bandwidth-data-table'))
    }

    this.sessionInfoBox = {
      sessionBox: element(by.css('.session-info-box')),
      sessionDataTitle: element(by.css('.session-data-title')),
      sessionDataDescription: element(by.css('.session-data-description')),
      sessionDataTable: element(by.css('.session-data-table'))
    }

    this.snapshotInfobox = {
      snapshotBox: element(by.css('.snapshot-info-box')),
      snapshotDataTitle: element(by.css('.snapshot-data-title')),
      snapshotDataDescription: element(by.css('.snapshot-data-description')),
      snapshotDataTable: element(by.css('.snapshot-data-table'))
    }
  }
}