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
    this.nodeDataCheckbox = element(by.id('node-data-checkbox'));
    this.nodeCheckboxModel = element(by.model('checkboxNodeModel'));
    this.volumeDataCheckbox = element(by.id('volume-data-checkbox'));
    this.volumeCheckboxModel = element(by.model('checkboxVolumeModel'));
    this.volumeSizeDataCheckbox = element(by.id('volume-size-data-checkbox'));
    this.volumeSizeCheckboxModel = element(by.model('checkboxVolumeSizeModel'));
    this.volumeAccessDataCheckbox = element(by.id('volume-access-data-checkbox'));
    this.volumeAccessCheckboxModel = element(by.model('checkboxVolumeAccessModel'));
    this.IOPDataCheckbox = element(by.id('IOP-data-checkbox'));
    this.IOPCheckboxModel = element(by.model('checkboxIOPModel'));
    this.bandwidthDataCheckbox = element(by.id('bandwidth-data-checkbox'));
    this.bandwidthCheckboxModel = element(by.model('checkboxBandwidthModel'));
    this.sessionDataCheckbox = element(by.id('session-data-checkbox'));
    this.sessionCheckboxModel = element(by.model('checkboxSessionModel'));
    this.snapshotDataCheckbox = element(by.id('snapshot-data-checkbox'));
    this.snapshotCheckboxModel = element(by.model('checkboxSnapshotModel'));
    this.nodeDataTitle = element(by.css('.node-data-title'));
    this.nodeDataDescription = element(by.css('.node-data-description'));
    this.nodeDataTable = element(by.css('.node-data-table'));
    this.volumeDataTitle = element(by.css('.volume-data-title'));
    this.volumeDataDescription = element(by.css('.volume-data-description'));
    this.volumeDataTable = element(by.css('.volume-data-table'));
    this.volumeSizeDataTitle = element(by.css('.volume-size-data-title'));
    this.volumeSizeDataDescription = element(by.css('.volume-size-data-description'));
    this.volumeSizeDataTable = element(by.css('.volume-size-data-table'));
    this.volumeAccessDataTitle = element(by.css('.volume-access-data-title'));
    this.volumeAccessDataDescription = element(by.css('.volume-access-data-description'));
    this.volumeAccessDataTable = element(by.css('.volume-access-data-table'));
    this.IOPDataTitle = element(by.css('.IOP-data-title'));
    this.IOPDataDescription = element(by.css('.IOP-data-description'));
    this.IOPDataTable = element(by.css('.IOP-data-table'));
    this.bandwidthDataTitle = element(by.css('.bandwidth-data-title'));
    this.bandwidthDataDescription = element(by.css('.bandwidth-data-description'));
    this.bandwidthDataTable = element(by.css('.bandwidth-data-table'));
    this.sessionDataTitle = element(by.css('.session-data-title'));
    this.sessionDataDescription = element(by.css('.session-data-description'));
    this.sessionDataTable = element(by.css('.session-data-table'));
    this.snapshotDataTitle = element(by.css('.snapshot-data-title'));
    this.snapshotDataDescription = element(by.css('.snapshot-data-description'));
    this.snapshotDataTable = element(by.css('.snapshot-data-table'));
  }
}