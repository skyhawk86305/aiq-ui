/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var ClusterSelectComponent = require('../../page-objects/cluster-select.po');

var clusterSelect = new ClusterSelectComponent();

var dropDownMenu;

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
  });

  describe('selecting clusters', function() {
    it('should close the drop down and update the selected cluster', function() {
      dropDownMenu.allClustersTab.click();
      dropDownMenu.clusterList.select('barCluster');
      expect(dropDownMenu.el.isDisplayed()).to.eventually.be.false;
      expect(clusterSelect.selectedCluster.getText()).to.eventually.equal('barCluster');
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
