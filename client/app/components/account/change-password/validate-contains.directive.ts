(function () {
  'use strict';

  angular
    .module('aiqUi')
    .directive('validateContains', ValidateContainsDirective);

    /*  Adds validation to a form input to check whether the entered value contains a given regex.
     *
     *  The attribute value should be an object with one or more properties, where the value of each property
     *  is a regular expression (as a string). The key of each property, prepended with "contains", will be
     *  used to populate the ngModelController's $validators object with a function that checks the field's
     *  value agains the specified regex, using RegExp.test.
     *
     *  Example: the attribute value { 'Number': '\\d' } will add a "containsNumber" validator that checks
     *  whether the field value contains the regex \d
     */
    function ValidateContainsDirective() {
      return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
          defObj: '=validateContains'
        },
        link(scope: any, elm, attrs, ctrl: ng.INgModelController) {
          if ( !scope.defObj ) return;

          Object.keys(scope.defObj).forEach( key => {
            const validatorKey = `contains${key}`;
            const regex = new RegExp(scope.defObj[key]);
            ctrl.$validators[validatorKey] = value => regex.test(value);
          });
        }
      };
    }

})();
