'use strict';

const protractor = require('protractor');

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
      allClustersList() {
        const el = element(by.css('div.cluster-select-list'));
        const customerList = el.all(by.css('div.cluster-select-list-group'));

        return {
          el,
          customers: customerList.then( customers => customers.map(instrumentCustomer) ),
          customer(customerName) {
            return customerList
              .filter( el =>
                el.element(by.css('span')).getText().then( text => customerName === text )
              )
              .then( list => {
                if(list.length > 0) {
                  return instrumentCustomer(list[0]);
                } else {
                  return null;
                }
              });
          }
        };

        function instrumentCustomer(customerEl) {
          return {
            el: customerEl,
            name: customerEl.element(by.css('span')).getText(),
            clusters: customerEl.all(by.css('div.cluster-select-list-item')),
            selectCluster(name) {
              return this.clusters
                .filter( el => el.getText().then( text => name === text ) )
                .first()
                .click();
            }
          };
        }
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
