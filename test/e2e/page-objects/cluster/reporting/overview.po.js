'use strict';

var GraphTimeSeriesComponent = require('../../components/sf-components.po').graphTimeSeries;
var InfoBarComponent = require('../../components/info-bar.po');

var OverviewPage = function () {
  var page = this;

  page.el = element(by.css('.overview-dashboard-page'));
  page.graphs = {
    clusterPerformance: new GraphTimeSeriesComponent('performance-graph'),
    performanceUtilization: new GraphTimeSeriesComponent('utilization-graph')
  };
  page.infoBar = new InfoBarComponent(null, page.el.element(by.css('.info-bar')));
};


module.exports = OverviewPage;

