'use strict';

describe('Component: changePassword', function() {
  let $scope,
      AuthService,
      deferred,
      controller,
      spy;

  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(angular.mock.module('componentTemplates'));

  beforeEach(inject(function($rootScope, $location, $q, $componentController, AuthService) {
    $scope = $rootScope.$new();
    deferred = $q.defer();
    spy = spyOn(AuthService, 'changePassword').and.returnValue(deferred.promise);
    const locals = { $scope };
    const bindings = { AuthService, $q };
    controller = $componentController('changePassword', locals, bindings);
    controller.form = {
      $setUntouched: () => {},
      $setPristine: () => {},
    };
  }));

  describe('.submit', function() {

    it('should handle a successful call to AuthService.changePassword', function(done) {
      controller.currentPassword = 'Test password1';
      controller.newPassword = 'New test password1';
      deferred.resolve();
      controller.submit()
        .then(() => {
          expect(spy).toHaveBeenCalledWith('Test password1', 'New test password1');
          expect(controller.successful).toBe(true);
          expect(controller.error).toBeNull();
          expect(controller.incorrectPassword).toBe(false);
        })
        .finally(done)

      $scope.$apply();
    });

    it('should handle an incorrect password error from AuthService.changePassword', function(done) {
      controller.currentPassword = 'Test password1';
      controller.newPassword = 'New test password1';
      deferred.reject({ name: 'IncorrectPasswordFault' });
      controller.submit()
        .then(() => {
          expect(spy).toHaveBeenCalledWith('Test password1', 'New test password1');
          expect(controller.successful).toBe(false);
          expect(controller.error).toBeNull();
          expect(controller.incorrectPassword).toBe(true);
        })
        .finally(done);

      $scope.$apply();
    });

    const errorTypes = {
      'with message': { message: 'test error' },
      'with just a data field': { data: 'test error' },
      'as a bare string': 'test error',
    };
    Object.keys(errorTypes).forEach( key => {
      it(`should handle an error ${key} from AuthService.changePassword`, function(done) {
        controller.currentPassword = 'Test password1';
        controller.newPassword = 'New test password1';
        deferred.reject(errorTypes[key]);
        controller.submit()
          .then(() => {
            expect(spy).toHaveBeenCalledWith('Test password1', 'New test password1');
            expect(controller.successful).toBe(false);
            expect(controller.error).toBe('test error');
            expect(controller.incorrectPassword).toBe(false);
          })
          .finally(done);
        $scope.$apply();
      });
    });

  });
});

