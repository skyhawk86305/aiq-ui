describe('validateContains directive', function() {
  let $scope, form;

  beforeEach(angular.mock.module('aiqUi'));

  describe('with Uppercase and Number patterns', function() {
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;
      const element = angular.element(`
        <form name="form">
          <input
              ng-model="model.someval"
              name="someval"
              validate-contains="{
                'Uppercase': '[A-Z]',
                'Number': '\\\\d+'
              }"/>
        </form>
      `);
      $scope.model = { someval: null };
      $compile(element)($scope);
      form = $scope.form;
    }));

    it('should fail if the value does not contain an uppercase letter', function() {
      form.someval.$setViewValue('test3');
      $scope.$digest();
      expect($scope.model.someval).toBeUndefined();
      expect(form.someval.$valid).toBe(false);
      expect(form.someval.$error.containsUppercase).toBe(true);
    });

    it('should fail if the value does not contain a number', function() {
      form.someval.$setViewValue('Test');
      $scope.$digest();
      expect($scope.model.someval).toBeUndefined();
      expect(form.someval.$valid).toBe(false);
      expect(form.someval.$error.containsNumber).toBe(true);
    });

    it('should pass if the value contains both a number and an uppercase letter', function() {
      form.someval.$setViewValue('Test3');
      $scope.$digest();
      expect($scope.model.someval).toEqual('Test3');
      expect(form.someval.$valid).toBe(true);
      expect(form.someval.$error.containsNumber).toBeUndefined();
      expect(form.someval.$error.containsUppercase).toBeUndefined();
    });
  });

  describe('with no defined validation object', function() {
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;
      const element = angular.element(`
        <form name="form">
          <input
              ng-model="model.someval"
              name="someval"
              validate-contains />
        </form>
      `);
      $scope.model = { someval: null };
      $compile(element)($scope);
      form = $scope.form;
    }));

    it('should not check anything', function() {
      form.someval.$setViewValue('test');
      $scope.$digest();
      expect($scope.model.someval).toEqual('test');
      expect(form.someval.$valid).toBe(true);
    });
  });
});
