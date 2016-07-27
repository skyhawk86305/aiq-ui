'use strict';

var ClusterSelectComponent = function () {
  this.el = element(by.css('.cluster-select[uib-dropdown]'));
  this.selectedCluster = element(by.css('#cluster-select-anchor > span'));
  this.open = function() {
    this.el.click();
    return {
      el: element(by.id('cluster-select-menu')),
      filter: function(input) {
        var filterInput = element(by.id('cluster-select-filter'));
        return filterInput.clear().then(function() { filterInput.sendKeys(input); });
      },
      viewHints: function() {
        element(by.css('.cluster-select-hints')).click();
        return {
          menu: element(by.css('.cluster-select-hints-tooltip'))
        }
      },
      activeTab: element(by.css('.cluster-select-list-tab.active')),
      allClustersTab: element(by.css('.cluster-select-list-tab.all-clusters')),
      recentlyViewedTab: element(by.css('.cluster-select-list-tab.recently-viewed')),
      emptyList: element(by.css('.cluster-select-empty')),
      clusterList: {
        el: element(by.css('ul.cluster-select-list')),
        items: element.all(by.repeater('cluster in (recentlyViewed ? $ctrl.recentlyViewed : $ctrl.clusters) | clusterSelectFilter : filterInput')),
        select: function(cluster) {
          this.items.filter(function(el) {
            return el.getText().then(function(text) {
              return cluster === text;
            });
          }).first().click();
        }
      }
    };
  };
  this.close = function() {
    element(by.css('.cluster-select[aria-expanded="true"]')).isPresent().then(function(isPresent) {
      if(isPresent) {
        this.el.click();
      }
    });
  };
};

module.exports = ClusterSelectComponent;
