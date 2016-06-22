(function () {
  'use strict';

  angular
    .module('elementUiPerNode')
    .controller('SettingsController', [
      '$timeout',
      'SFClient',
      'sfHelpers',
      SettingsController
    ]);

  function SettingsController($timeout, SFClient, sfHelpers) {
    var self = this;

    self.pageState = 'loading';
    self.currentState = 'default';
    self.config = {};
    self.ethernetInfo = {};
    self.formattedEnsemble = '';

    // Initialize config
    SFClient.api.getConfig()
      .then(function(response) {
          setForm(response);
          self.pageState = 'loaded';
      })
      .catch(function(error) {
        sfHelpers.handleError(error.method + ' Failed: ' + error.message);
      });

    self.updateConfig = function() {
      self.currentState = 'loading';
      SFClient.api.setConfig({cluster: self.config.cluster, network: self.config.network})
        .then(function(response) {
          setForm(response);
          self.currentState = 'success';
          $timeout(function() { self.currentState = 'default'; }, 3000);
        })
        .catch(function(error) {
          sfHelpers.handleError(error.method + ' Failed: ' + error.message);
          self.currentState = 'default';
        });
    };

    self.whenProcessing = function() {
      return self.currentState !== 'default';
    };

    self.addRoute = function(type) {
      self.config.network[type].routes.push({type:'', target:'', netmask:'', gateway:''});
    };

    self.removeRoute = function(index, type) {
      self.config.network[type].routes.splice(index, 1);
    };

    function setForm(response) {
      if(response.result && response.result.config){
        self.config = response.result.config;
        self.ethernetInfo = getEthernetInfo(self.config.network);
        self.formattedEnsemble = getFormattedEnsemble(self.config.cluster);
      }
    }

    function getFormattedEnsemble(cluster) {
      var formattedEnsemble = '';
      if (cluster && cluster.ensemble) {
        for (var i = 0; i < cluster.ensemble.length; i++) {
          formattedEnsemble += cluster.ensemble[i];
          if (i !== cluster.ensemble.length-1) {
            formattedEnsemble += '</br>';
          }
        }
      }
      return formattedEnsemble;
    }

    function getEthernetInfo(networkConfig) {
      var ethernetInfo = { bond1G: [],  bond10G: [] },
          ethernetKeys = networkConfig ? Object.keys(networkConfig).filter(function(key) { return key.indexOf('eth') >= 0; }) : [];

      ethernetKeys.forEach(function(ethernetKey) {
        var ethernet = networkConfig[ethernetKey],
            type = ethernet['bond-master'],
            data = { mac: ethernet.macAddress, port: ethernetKey };

        if (type === 'Bond1G') { ethernetInfo.bond1G.push(data); }
        if (type === 'Bond10G') { ethernetInfo.bond10G.push(data); }
      });

      return ethernetInfo;
    }

  }
}());
