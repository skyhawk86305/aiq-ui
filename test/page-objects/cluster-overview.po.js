'use strict';
var GraphTimeSeries = require('./graph-time-series.po');
var Table = require('./table.po');

var ClusterOverviewComponent = function () {

  this.el = element(by.css(".overview-dashboard-page"));

  this.graphs = {
    clusterPerformance: new GraphTimeSeries('performance-graph'),
    performanceUtilization: new GraphTimeSeries('utilization-graph')
  };

  var infoBar = element(by.css('.sf-widget > .info-bar-row'));

  this.infoBar = {
    el: infoBar,
    infoBoxes: infoBar.all(by.css(".info-box")),
    infoBox: function(name) {
      var box = element(by.css(".info-box.-" + name));
      return {
        value: box.element(by.css(".value")),
        badge: function(name){
          var badge = name ? box.element(by.css(".badge.-" + name)) : box.element(by.css(".badge"));
          return {
            value: badge.element(by.css(".value")),
            el: badge
          }
        }
      };

    }
  };

  this.alertTable = new Table('alert-table')
};


module.exports = ClusterOverviewComponent;

