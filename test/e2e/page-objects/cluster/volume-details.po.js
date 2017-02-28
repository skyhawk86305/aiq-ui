'use strict';

var SyncGraphsComponent = require('../components/sf-components.po').syncGraphs;
var InfoBarComponent = require('../components/info-bar.po');

var VolumeDetailsPage = function () {
  var page = this;

  page.el = element(by.css('.volume-details-page'));
  page.label = page.el.element(by.css('.volume-label'));
  page.infoBar = new InfoBarComponent(null, page.el.element(by.css('.info-bar')));
  page.syncGraphs = new SyncGraphsComponent('volume-sync-graphs');
};

module.exports = VolumeDetailsPage;