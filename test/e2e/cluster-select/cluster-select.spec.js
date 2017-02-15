/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var support = require('../support.js');
var clusterSelect = new support.clusterSelectComponent();

var dropDownMenu, hintsTooltip;


describe('The cluster select component on initial page load', function() {
  beforeEach(function(done) {
    support.login(function() {
      browser.get('#').then(done);
    });
  });


  afterEach(function(done) {
    support.logout(done);
  });

  it('should display on initial page load', function() {
    expect(clusterSelect.el.isPresent()).to.eventually.be.true;
  });

  it('should default to All Clusters when none are selected', function () {
    expect(clusterSelect.selectedCluster.getText()).to.eventually.equal('All Clusters');
  });
});

describe('The cluster select component', function() {
  //dropDownMenu = clusterSelect.open();

  beforeEach(function(done) {
    support.login(function() {
      browser.get('#').then(done);
    });
  });

  afterEach(function(done) {
    support.logout(done);
  });

  it('should open a drop down menu when clicking on it', function() {
    dropDownMenu = clusterSelect.open();
    expect(dropDownMenu.el.isDisplayed()).to.eventually.be.true;
  });

  describe('it\'s drop down menu', function() {
    it('should display a list of all clusters', function() {
      dropDownMenu = clusterSelect.open();
      expect(dropDownMenu.activeTab.getText()).to.eventually.equal('All Clusters');
      expect(dropDownMenu.allClustersList().customers.count()).to.eventually.equal(21);
    });

    it('should have a scrollbar if there are too many clusters to display on the page', function() {
      dropDownMenu = clusterSelect.open();
      support.checkScroll(dropDownMenu.scrollableMenu,true);
    });

    it('should allow the user to view a list of recently viewed clusters', function() {
      dropDownMenu = clusterSelect.open();
      dropDownMenu.recentlyViewedTab.click();
      expect(dropDownMenu.activeTab.getText()).to.eventually.equal('Recently Viewed');
      expect(dropDownMenu.emptyList.isDisplayed()).to.eventually.be.true;
    });

    describe('filtering clusters', function() {
      it('should display hints in a tooltip', function() {
        dropDownMenu = clusterSelect.open();
        hintsTooltip = dropDownMenu.viewHints();
        expect(hintsTooltip.menu.isDisplayed()).to.eventually.be.true;
        hintsTooltip = dropDownMenu.viewHints();
        expect(hintsTooltip.menu.getText()).to.eventually.contain('Search for cluster');
      });

      it('should filter by text (clusterName OR customerName) AND (single word OR multi word)', function() {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.allClustersTab.click();

        dropDownMenu.filter('foo').then(function() {
          var expectedClusters = [
            { customer: 'Bob', clusters: ['fooCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);
        });

        dropDownMenu.filter('f cluster').then(function() {
          var expectedClusters = [
            { customer: 'ACME', clusters: ['sxzysf-cluster-01'] },
            { customer: 'Bob', clusters: ['fooCluster'] },
            { customer: 'John', clusters: ['fizCluster'] },
            { customer: 'RKXV', clusters: ['ny-sfcluster1'] },
            { customer: 'xiWeb', clusters: ['SolidFire-Cluster01'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);
        });

        dropDownMenu.filter('ba').then(function() {
          var expectedClusters = [
            { customer: 'Bill', clusters: ['barCluster'] },
            { customer: 'Cloud Cluster (Technical Solutions Inc)', clusters: ['CBA-MYSQL-1'] },
            { customer: 'Jim', clusters: ['bazCluster'] },
            { customer: 'Something.com', clusters: ['COBALT-SA03.CMS.NET'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);
        });

        dropDownMenu.filter('Bill').then(function() {
          var expectedClusters = [
            { customer: 'Bill', clusters: ['barCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);
        });

        // This one should have one result for customer name and one hit for cluster name
        dropDownMenu.filter('rkxv').then(function() {
          var expectedClusters = [
            { customer: 'RKXV', clusters: ['ny-sfcluster1'] },
            { customer: 'Zebra Media, Inc.', clusters: ['RKXV-SF01'] }
          ];
          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);
        });
      });

      it('should filter by id', function(done) {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('id:26').then(function() {
          var expectedClusters = [
            { customer: 'Bill', clusters: ['barCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);

          dropDownMenu.filter('id:9').then(function() {
            var expectedClusters = [
              { customer: 'Jim', clusters: ['bazCluster'] }
            ];

            compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
          });
        });
      });

      it('should filter by version', function(done) {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('version:8').then(function() {
          var expectedClusters = [
            { customer: 'ACME', clusters: ['p-a-c_m+n&o-cluster-01', 'sxzysf-cluster-01'] },
            { customer: 'ATSC (ABCD Technical Solutions Corporation)', clusters: ['ABCDEFGHIJKLMNOP95-00010'] },
            { customer: 'Bill', clusters: ['barCluster'] },
            { customer: 'Bob', clusters: ['fooCluster'] },
            { customer: 'Cloud Cluster (Technical Solutions Inc)', clusters: ['CBA-MYSQL-1'] },
            { customer: 'Jim', clusters: ['bazCluster'] },
            { customer: 'John', clusters: ['fizCluster'] },
            { customer: 'NetApp-Internal-Vienna-demolab-6th-floor', clusters: ['wok1sucpiqnsfx2000.oamp.sgns.net'] },
            { customer: 'PMPX Network Enterprises', clusters: ['solidfire-tr-iscsi', 'VA7-R25-SFIRE-CL02'] },
            { customer: 'Random Cloud Services', clusters: ['XYZSFIRECLUS02'] },
            { customer: 'RKXV', clusters: ['ny-sfcluster1'] },
            { customer: 'Smith Jones Anderson Associates, Inc.', clusters: ['sf-dc2.345.web.co.za'] },
            { customer: 'SmithCorp (Green)', clusters: ['s01infoclst01'] },
            { customer: 'SmithCorp (Yellow)', clusters: ['cdefg-sa05.cms.net'] },
            { customer: 'Some Random State Federal Credit Union', clusters: ['PD4OiJ7fXxfKwo2000.snmp.acme.net'] },
            { customer: 'Something.com', clusters: ['COBALT-SA03.CMS.NET'] },
            { customer: 'Zebra Media, Inc.', clusters: ['RKXV-SF01'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);

          dropDownMenu.filter('version:8.1.2.3').then(function() {
            var expectedClusters = [
              { customer: 'John', clusters: ['fizCluster'] }
            ];

            compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
          });
        });
      });

      it('should filter by uid', function(done) {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('uid:b').then(function() {
          var expectedClusters = [
            { customer: 'ATSC (ABCD Technical Solutions Corporation)', clusters: ['ABCDEFGHIJKLMNOP95-00010'] },
            { customer: 'Bill', clusters: ['barCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);

          dropDownMenu.filter('uid:d').then(function() {
            var expectedClusters = [
              { customer: 'ACME', clusters: ['p-a-c_m+n&o-cluster-01'] },
              { customer: 'John', clusters: ['fizCluster'] }
            ];

            compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
          });
        });
      });

      it('should filter by uuid', function(done) {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('uuid:333').then(function() {
          var expectedClusters = [
            { customer: 'ABC-Cloud R&D_Americas.com', clusters: ['AB-DC1-Cluster01'] },
            { customer: 'Jim', clusters: ['bazCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters);

          dropDownMenu.filter('uuid:111').then(function() {
            var expectedClusters = [
              { customer: 'Bob', clusters: ['fooCluster'] },
              { customer: 'SmithCorp (Yellow)', clusters: ['cdefg-sa05.cms.net'] },
              { customer: 'Some Random State Federal Credit Union', clusters: ['PD4OiJ7fXxfKwo2000.snmp.acme.net'] }
            ];

            compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
          });
        });
      });

      it('should not have a scrollbar if the clusters fit on one page', function() {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('uuid:111');
        support.checkScroll(dropDownMenu.scrollableMenu,false);
      });

      it('should allow combining more than one filter type', function(done) {
        dropDownMenu = clusterSelect.open();
        dropDownMenu.filter('version:8.1.2 ba').then(function() {
          var expectedClusters = [
            { customer: 'Jim', clusters: ['bazCluster'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
        });
      });

      it('should reset with an empty filter', function(done) {
          dropDownMenu = clusterSelect.open();
          dropDownMenu.filter('').then(function() {
          var expectedClusters = [
            { customer: 'ABC-Cloud R&D_Americas.com', clusters: ['AB-DC1-Cluster01'] },
            { customer: 'ACME', clusters: ['p-a-c_m+n&o-cluster-01', 'sxzysf-cluster-01'] },
            { customer: 'ATSC (ABCD Technical Solutions Corporation)', clusters: ['ABCDEFGHIJKLMNOP95-00010'] },
            { customer: 'Bill', clusters: ['barCluster'] },
            { customer: 'Bob', clusters: ['fooCluster'] },
            { customer: 'Cloud Cluster (Technical Solutions Inc)', clusters: ['CBA-MYSQL-1'] },
            { customer: 'Haßermaaß (Haß)', clusters: ['c-storage-002'] },
            { customer: 'Jim', clusters: ['bazCluster'] },
            { customer: 'John', clusters: ['fizCluster'] },
            { customer: 'NetApp-Internal-Vienna-demolab-6th-floor', clusters: ['wok1sucpiqnsfx2000.oamp.sgns.net'] },
            { customer: 'PMPX Network Enterprises', clusters: ['solidfire-tr-iscsi', 'VA7-R25-SFIRE-CL02'] },
            { customer: 'Random Cloud Services', clusters: ['XYZSFIRECLUS02'] },
            { customer: 'RKXV', clusters: ['ny-sfcluster1'] },
            { customer: 'Smith Jones Anderson Associates, Inc.', clusters: ['sf-dc2.345.web.co.za'] },
            { customer: 'SmithCorp (Green)', clusters: ['cmszb-sa', 's01infoclst01'] },
            { customer: 'SmithCorp (Yellow)', clusters: ['cdefg-sa05.cms.net', 'cmssp-sa03'] },
            { customer: 'Some Random State Federal Credit Union', clusters: ['PD4OiJ7fXxfKwo2000.snmp.acme.net'] },
            { customer: 'Something.com', clusters: ['COBALT-SA03.CMS.NET'] },
            { customer: 'Xenon Temp Humidity Sensors (c/o Neon)', clusters: ['Petabytesolid01'] },
            { customer: 'xiWeb', clusters: ['SolidFire-Cluster01'] },
            { customer: 'Zebra Media, Inc.', clusters: ['RKXV-SF01'] }
          ];

          compareExpectedAllClustersList(dropDownMenu.allClustersList(), expectedClusters, done);
        });
      });
    });


  });
});

fdescribe('selecting clusters', function() {

  beforeAll(function(done) {
    support.login(function() {
      browser.get('#').then(done);
    });
  });

  afterAll(function(done) {
    support.logout(done);
  });

  var selectClusterSequence = function() {
    dropDownMenu = clusterSelect.open();
    var list = dropDownMenu.allClustersList();

    dropDownMenu.allClustersTab.click();
    expect(list.customers.count()).to.eventually.equal(21);
    return list.customer('Bill').then(function(customer) {
      customer.selectCluster('barCluster');
    });
  };

  it('should close the drop down and update the selected cluster', function(done) {
    selectClusterSequence().then(function () {
      expect(dropDownMenu.el.isDisplayed()).to.eventually.be.false;
      expect(clusterSelect.selectedCluster.getText()).to.eventually.equal('barCluster');
      done();
    });
  });

  it('should navigate the user to the default /cluster route with the selected clusterID embedded in the url', function(done) {
    selectClusterSequence().then(function () {
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/reporting/overview');
      done();
    });
  });

  it('should add the selected cluster to the top of the recently viewed', function() {
    var list,
      expectedClusters = [
        'fooCluster',
        'barCluster'
      ];
    selectClusterSequence();
    dropDownMenu = clusterSelect.open();
    list = dropDownMenu.allClustersList();

    list.customer('Bob').then(function(customer) {
      customer.selectCluster('fooCluster');
      dropDownMenu = clusterSelect.open();
      dropDownMenu.recentlyViewedTab.click();

      compareExpectedRecentlyViewedList(dropDownMenu.recentlyViewedList.clusters, expectedClusters);
    });
  });
});

function compareExpectedAllClustersList(clusterList, expectedClustersArr, done) {
  expect(clusterList.customers.count()).to.eventually.equal(expectedClustersArr.length);
  clusterList.customers.each(function (customerElem, customerIndex) {
    customerElem.element(by.css('span')).getText().then(function (name) {
      clusterList.customer(name).then(function(customer) {
        console.log(customer.name);
        expect(customer.name).to.equal(expectedClustersArr[customerIndex].customer);
        expect(customer.clusters.count()).to.eventually.equal(expectedClustersArr[customerIndex].clusters.length);
        customer.clusters.each(function (clusterElem, clusterIndex) {
          expect(clusterElem.getText()).to.eventually.equal(expectedClustersArr[customerIndex].clusters[clusterIndex]);
        });
        if(typeof done === 'function') {
          done();
        }
      });
    });
  });
}

function compareExpectedRecentlyViewedList(clusterList, expectedClustersArr) {
  expect(clusterList.count()).to.eventually.equal(expectedClustersArr.length);
  clusterList.each(function (clusterElem, clusterIndex) {
    expect(clusterElem.getText()).to.eventually.equal(expectedClustersArr[clusterIndex]);
  });
}
