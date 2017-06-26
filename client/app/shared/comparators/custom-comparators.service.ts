export function CustomComparatorsService($rootScope) {
  let self = this;

  self.alertSeverityInputTemplate = require('./alert-severity-input.tpl.html');
  self.resolvedInputTemplate = require('./resolved-input.tpl.html');

  self.alertSeverityComparators = [
    {label:'is', enum: 'alertSeverityIs', func: alertSeverityIs, controlHtml: self.alertSeverityInputTemplate},
    {label:'is not', enum: 'alertSeverityIsNot', func: alertSeverityIsNot, controlHtml: self.alertSeverityInputTemplate}
  ];

  self.resolvedComparators = [
    {label:'is', enum: 'resolvedIs', func: resolvedIs, controlHtml: self.resolvedInputTemplate},
  ];

  function alertSeverityIs(key, values) {
    return function(data) {
      let expected = data[key];
      return values.some(function(value) {
        return expected === value;
      });
    };
  }

  function alertSeverityIsNot(key, values) {
    return function(data) {
      let expected = data[key];
      return values.some(function(value) {
        return expected !== value;
      });
    };
  }

  function resolvedIs(key, values) {
     return function(data) {
      let expected = data[key] ? 'Yes' : 'No';

      return values.some(function(value) {
        return expected === value;
      });
    };
  }

  /*
   * helper functions
   */

  $rootScope.addSpacing = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  self.addSpacing = $rootScope.addSpacing;

}

CustomComparatorsService.$inject = ['$rootScope'];

