'use strict';

var ClusterSelectComponent = function () {
  var component = this;

  component.el = element(by.css('.cluster-select[uib-dropdown]'));
  component.selectedCluster = element(by.css('#cluster-select-anchor > span'));
  component.open = function() {
    component.el.click();
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
        };
      },
      activeTab: element(by.css('.cluster-select-list-tab.active')),
      allClustersTab: element(by.css('.cluster-select-list-tab.all-clusters')),
      scrollableMenu: element(by.css('.cluster-select-list.scrollable-menu')),
      recentlyViewedTab: element(by.css('.cluster-select-list-tab.recently-viewed')),
      emptyList: element(by.css('.cluster-select-empty')),
      // just a list of clusters - without customer
      clustersList: function() {
          var list = element(by.css('div.cluster-select-list')),
          clusterList = list.all(by.css('div.cluster-select-list-item'));
          return {
            el: list,
            clusters: clusterList,
            selectClusterByIndex: function(index) {
              return clusterList.get(index).click();
            }
          }
      },
      // allows selection of cluster by customer
      allClustersList: function () {
        var list = element(by.css('div.cluster-select-list')),
            customerList = list.all(by.css('div.cluster-select-list-group'));
        return {
          el: list,
          customers: customerList,
          customer: function(customerName) {
            return customerList.filter(function (el) {
              return el.element(by.css('span')).getText().then(function (text) {
                return customerName === text;
              });
            }).then(function(list) {
              if(list.length > 0) {
                return {
                  name: customerName,
                  clusters: list[0].all(by.css('div.cluster-select-list-item')),
                  selectCluster: function (clusterName) {
                    return {
                      cluster: this.clusters.filter(function (el) {
                        return el.getText().then(function (text) {
                          return clusterName === text;
                        });
                      }).first().click()
                    };
                  }
                };
              } else {
                return null;
              }
            });
          }
        };
      },
      recentlyViewedList: {
        el: element(by.css('div.cluster-select-list')),
        clusters: element.all(by.css('div.cluster-select-list-item')),
        selectCluster: function(cluster) {
          this.clusters.filter(function(el) {
            return el.getText().then(function(text) {
              return cluster === text;
            });
          }).first().click();
        }
      }
    };
  };
  component.close = function() {
    element(by.css('.cluster-select[aria-expanded="true"]')).isPresent().then(function(isPresent) {
      if(isPresent) {
        component.el.click();
      }
    });
  };
};

module.exports = ClusterSelectComponent;
