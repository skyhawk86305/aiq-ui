'use strict';
var GraphTimeSeries = require('./graph-time-series.po');

var ClusterOverviewComponent = function () {
  this.el = element(by.css('.overview-dashboard-page'));
  this.infoBar = {
    el: element(by.css('.sf-widget > .info-bar-row')),
    infoBoxes: element.all(by.css('.info-box')),
    infoBoxHeaders: element.all(by.css('.info-box-content > .title')),
    infoBox: function(name) {
      var box = element(by.css('.info-box.-' + name));
      return {
        value: box.element(by.css('.value')),
        badge: function(name){
          var badge = name ? box.element(by.css('.badge.-' + name)) : box.element(by.css('.badge'));
          return {
            value: badge.element(by.css('.value')),
            el: badge
          };
        }
      };
    }
  };
};


module.exports = ClusterOverviewComponent;

