'use strict';

var SyncGraphsComponent = require('../../components/sf-components.po').syncGraphs;
var InfoBarComponent = require('../../components/info-bar.po');

var CapacityPage = function () {
  var page = this;
  
  page.syncGraphs = new SyncGraphsComponent('capacity-sync-graphs');
  page.infoBars = {
    blockCapacity: new InfoBarComponent(null, element(by.css('#block-capacity .info-bar'))),
    metadataCapacity: new InfoBarComponent(null, element(by.css('#metadata-capacity .info-bar')))
  };
};

module.exports = CapacityPage;
