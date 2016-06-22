'use strict';

var NetworkSettingsPage = function (bondMode) {
  this.form = {
    el: element(by.id(bondMode + '-fieldset')),
    staticDetails: {
      method: element(by.id(bondMode + '-method')),
      ethernet1: {
        macAddress: element(by.id(bondMode + '-ethernet-1-mac')),
        port: element(by.id(bondMode + '-ethernet-1-port'))
      },
      ethernet2: {
        macAddress: element(by.id(bondMode + '-ethernet-2-mac')),
        port: element(by.id(bondMode + '-ethernet-2-port'))
      }
    },
    inputs: {
      address: element(by.id(bondMode + '-address')),
      netmask: element(by.id(bondMode + '-netmask')),
      gateway: element(by.id(bondMode + '-gateway')),
      mtu: element(by.id(bondMode + '-mtu')),
      dnsServers: element(by.id(bondMode + '-dns-servers')),
      searchDomains: element(by.id(bondMode + '-search-domains')),
      bondMode: element(by.id(bondMode + '-bond-mode')),
      lacpRate: element(by.id(bondMode + '-lacp-rate')),
      status: element(by.id(bondMode + '-status'))
    },
    routes: {
      add: element(by.css('.network-add-route-btn')).click,
      remove: function(index) {
        element.all(by.css('.network-route-remove-btn')).get(index).click();
      },
      container: function(index) {
        var route = element.all(by.css('.network-route-input-container')).get(index);
        return {
          type: route.element(by.css('.network-route-type')),
          target: route.element(by.css('.network-route-target')),
          netmask: route.element(by.css('.network-route-netmask')),
          gateway: route.element(by.css('.network-route-gateway'))
        };
      }
    },
    submit: element(by.css('.update-network-settings-btn'))
  };
  this.errorModal = element(by.id('networkSettings-' + bondMode === 'bond-ten-g' ? 'bondTenG' : 'bondOneG')).element(by.css('.sf-modal-alert'));
};

module.exports = NetworkSettingsPage;
