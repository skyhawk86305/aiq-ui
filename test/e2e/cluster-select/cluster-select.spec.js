/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var ClusterSelectComponent = require('../page-objects/components/cluster-select.po');

var clusterSelect = new ClusterSelectComponent();

var dropDownMenu, hintsTooltip;

describe('The cluster select component', function() {
  it('should display on initial page load', function() {
    browser.get('#');
    expect(clusterSelect.el.isPresent()).to.eventually.be.true;
  });

  it('should default to All Clusters when none are selected', function() {
    expect(clusterSelect.selectedCluster.getText()).to.eventually.equal('All Clusters');
  });

  it('should open a drop down menu when clicking on it', function() {
    dropDownMenu = clusterSelect.open();
    expect(dropDownMenu.el.isDisplayed()).to.eventually.be.true;
  });

  describe('it\'s drop down menu', function() {
    it('should display a list of all clusters', function() {
      expect(dropDownMenu.activeTab.getText()).to.eventually.equal('All Clusters');
      expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(4);
    });

    it('should allow the user to view a list of recently viewed clusters', function() {
      dropDownMenu.recentlyViewedTab.click();
      expect(dropDownMenu.activeTab.getText()).to.eventually.equal('Recently Viewed');
      expect(dropDownMenu.emptyList.isDisplayed()).to.eventually.be.true;
    });

    describe('filtering clusters', function() {
      it('should display hints in a tooltip', function() {
        hintsTooltip = dropDownMenu.viewHints();
        expect(hintsTooltip.menu.isDisplayed()).to.eventually.be.true;
      });

      it('should filter by text (clusterName OR customerName) AND (single word OR multi word)', function() {
        dropDownMenu.allClustersTab.click();

        dropDownMenu.filter('foo').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fooCluster');
        });

        dropDownMenu.filter('f cluster').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fooCluster');
        });

        dropDownMenu.filter('ba').then(function() {
          expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(2);
        });

        dropDownMenu.filter('Bill').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('barCluster');
        });
      });

      it('should filter by id', function() {
        dropDownMenu.filter('id:26').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('barCluster');
        });

        dropDownMenu.filter('id:9').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('bazCluster');
        });
      });

      it('should filter by version', function() {
        dropDownMenu.filter('version:8').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fooCluster');
        });

        dropDownMenu.filter('version:8.1.2.3').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fizCluster');
        });
      });

      it('should filter by uid', function() {
        dropDownMenu.filter('uid:b').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('barCluster');
        });

        dropDownMenu.filter('uid:d').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fizCluster');
        });
      });

      it('should filter by uuid', function() {
        dropDownMenu.filter('uuid:333').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('bazCluster');
        });

        dropDownMenu.filter('uuid:111').then(function() {
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fooCluster');
        });
      });

      it('should allow combining more than one filter type',function() {
        dropDownMenu.filter('version:8.1.2 ba').then(function() {
          expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(1);
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('bazCluster');
        });
      });

      it('should allow combining more than one filter type',function() {
        // filters are version and customer/cluster name(no prefix necessary for customer/cluster)
        dropDownMenu.filter('version:8.1.2 ba').then(function() {
          expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(1);
          expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('bazCluster');
        });
      });

      it('should reset with an empty filter', function() {
        dropDownMenu.filter('').then(function() {
          expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(4);
        });
      });
    });

    describe('selecting clusters', function() {
      it('should close the drop down and update the selected cluster', function() {
        dropDownMenu.allClustersTab.click();
        dropDownMenu.clusterList.select('barCluster');
        expect(dropDownMenu.el.isDisplayed()).to.eventually.be.false;
        expect(clusterSelect.selectedCluster.getText()).to.eventually.equal('barCluster');
      });

      it('should navigate the user to the default /cluster route with the selected clusterID embedded in the url', function() {
        expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/reporting/overview');
      });

      it('should add the selected cluster to the top of the recently viewed', function() {
        clusterSelect.open().clusterList.select('fooCluster');
        dropDownMenu = clusterSelect.open();
        dropDownMenu.recentlyViewedTab.click();
        expect(dropDownMenu.clusterList.items.count()).to.eventually.equal(2);
        expect(dropDownMenu.clusterList.items.get(0).getText()).to.eventually.equal('fooCluster');
      });
    });
  });
});
