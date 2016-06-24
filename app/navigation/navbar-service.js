/* globals angular */
(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('NavbarService', [NavbarService]);

  function NavbarService() {
    this.config = [
      {sref:'dashboard', id:'main-navbar-dashboard', label:'Dashboard', visible: true,
        subNavbarItems: [
          {sref:'dashboard.overview', id:'sub-navbar-overview', label:'Overview', visible: true}
        ]
      },
      {sref:'cluster', id:'main-navbar-cluster', label:'Cluster', visible: true,
        subNavbarItems: [
          {sref:'cluster.nodes', id:'sub-navbar-nodes', label:'Nodes', visible: true},
          {sref:'cluster.drives', id:'sub-navbar-drives', label:'Drives', visible: true},
          {sref:'cluster.volumes', id:'sub-navbar-volumes', label:'Volumes', visible: true}
        ]
      },
      {sref:'users', id:'main-navbar-users', label:'Users', visible: true} //ToDo: make dynamic based off of user auth
    ];
  }
})();
