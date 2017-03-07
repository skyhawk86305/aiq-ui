describe('validateEquals directive', function() {
  let $rootScope, $scope, form;

  beforeEach(angular.mock.module('aiqUi'));

  describe('with Uppercase and Number patterns', function() {
    beforeEach(inject(function($compile, _$rootScope_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      const element = angular.element(`
        <form name="form">
          <input ng-model="model.val1" name="val1" />
          <input ng-model="model.val2" name="val2" validate-equals="form.val1" />
        </form>
      `);
      $scope.model = { val1: null, val2: null };
      $compile(element)($scope);
      form = $scope.form;
    }));

    it('should pass validation if neither value is provided', function() {
      expect($scope.model.val1).toBe(null);
      expect($scope.model.val2).toBe(null);
      expect(form.val1.$valid).toBe(true);
      expect(form.val2.$valid).toBe(true);
      expect(form.val1.$error.equals).toBeUndefined();
      expect(form.val2.$error.equals).toBeUndefined();
    });

    it('should pass validation if the values are equal', function() {
      form.val1.$setViewValue('test');
      form.val2.$setViewValue('test');
      $scope.$digest();
      expect($scope.model.val1).toBe('test');
      expect($scope.model.val2).toBe('test');
      expect(form.val1.$valid).toBe(true);
      expect(form.val2.$valid).toBe(true);
      expect(form.val1.$error.equals).toBeUndefined();
      expect(form.val2.$error.equals).toBeUndefined();
    });

    it('should fail validation if the values are not equal', function() {
      form.val1.$setViewValue('test1');
      expect(form.val1.$valid).toBe(true);
      expect(form.val2.$valid).toBe(false);
      expect($scope.model.val1).toBe('test1');
      expect($scope.model.val2).toBe(null);
      form.val2.$setViewValue('test2', 'test');
      expect(form.val2.$valid).toBe(false);
    });

  });

  describe('with no other input defined', function() {
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;
      const element = angular.element(`
        <form name="form">
          <input ng-model="model.val1" name="val1" />
          <input ng-model="model.val2" name="val2" validate-equals />
        </form>
      `);
      $scope.model = { val1: null, val2: null };
      $compile(element)($scope);
      form = $scope.form;
    }));

    it('should not check anything', function() {
      form.val1.$setViewValue('test');
      form.val2.$setViewValue('different');
      $scope.$digest();
      expect($scope.model.val1).toEqual('test');
      expect($scope.model.val2).toEqual('different');
      expect(form.val2.$valid).toBe(true);
      expect(form.val2.$error.equals).toBeUndefined();
    });
  });
});

