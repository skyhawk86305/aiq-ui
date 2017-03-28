'use strict';

const TableComponent = require('../components/sf-components.po').table;
const InfoBarComponent = require('../components/info-bar.po');

module.exports = class CapacityLicensingDetailsPage {
  constructor() {
    this.el = element(by.css('.capacity-licensing-details-page'));
    this.infoBar = new InfoBarComponent(null, this.el.element(by.css('.info-bar')));
    this.clustersTable = new TableComponent('capacity-licensed-clusters');
    this.nodesTable = new TableComponent('capacity-licensed-nodes');
  }
}
