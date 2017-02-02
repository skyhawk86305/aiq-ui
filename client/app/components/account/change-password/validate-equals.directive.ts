(function () {
  'use strict';

  angular
    .module('aiqUi')
    .directive('validateEquals', ValidateEqualsDirective);

  /*  Adds validation to a form input to check whether the entered value is equal to another input's value.
   *
   *  This will cause both inputs to be considered invalid if they are not equal to each other. It only
   *  starts validating the other input after the input with this directive is $touched.
   */
  function ValidateEqualsDirective() {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        otherInput: '=validateEquals'
      },
      link(scope: any, elm, attrs, ctrl: ng.INgModelController) {
        if (!scope.otherInput) return;

        // run this field's $validate whenever the other field is changed
        scope.$watch( () => scope.otherInput.$viewValue, () => ctrl.$validate() );

        // run the other field's $validate whenever this field is changed
        scope.$watch( () => ctrl.$viewValue, () => scope.otherInput.$validate() );

        // add validator on the other input so it's also considered invalid if not equal
        scope.otherInput.$validators['equals'] = value => {
          // ignore differences if this field hasn't been touched yet
          if (!ctrl.$touched) return true;
          return (value === ctrl.$viewValue);
        };

        return ctrl.$validators['equals'] = value => (value === scope.otherInput.$viewValue);
      }
    };
  }

})();

