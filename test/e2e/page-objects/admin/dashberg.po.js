'use strict',

module.exports = class DashbergPage {
  constructor() {
    this.performanceInfobox = {
      performanceBox: element(by.css('.performance-info-box')),
      performanceTitle: element(by.css('.performance-title')),
      performanceDescription: element(by.css('.performance-description')),
      performanceTable: element(by.css('.performance-table'))
    }

    this.volumeSizeInfoBox = {
      volumeSizeBox: element(by.css('.volume-size-info-box')),
      volumeSizeTitle: element(by.css('.volume-size-title')),
      volumeSizeDescription: element(by.css('.volume-size-description')),
      volumeSizeTable: element(by.css('.volume-size-table'))
    }

    this.bandwidthInfoBox = {
      bandwidthBox: element(by.css('.bandwidth-info-box')),
      bandwidthTitle: element(by.css('.bandwidth-title')),
      bandwidthDescription: element(by.css('.bandwidth-description')),
      bandwidthTable: element(by.css('.bandwidth-table'))
    }

    this.metadataInfoBox = {
      metadataBox: element(by.css('.metadata-info-box')),
      metadataTitle: element(by.css('.metadata-title')),
      metadataTable: element(by.css('.metadata-table'))
    }
  }
}