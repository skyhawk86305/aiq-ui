/* globals angular */
(function () {
  'use strict';

  angular
    .module('elementUiPerNode')
    .service('NavbarService', [NavbarService]);

  function NavbarService() {
    this.config = [
      {sref:'networkSettings', id:'main-navbar-network-settings', label:'Network Settings', visible: true,
        subNavbarItems: [
          {sref:'networkSettings.bondOneG', id:'sub-navbar-bond-one-g', label:'Bond 1G', visible: true},
          {sref:'networkSettings.bondTenG', id:'sub-navbar-bond-ten-g', label:'Bond 10G', visible: true}
        ]
      },
      {sref:'clusterSettings', id:'main-navbar-cluster-settings', label:'Cluster Settings', visible: true}
    ];
  }
})();
