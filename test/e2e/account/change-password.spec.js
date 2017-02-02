/* jshint expr: true */
'use strict';

const support = require('../support.js');
const expect = support.expect;
const mockBackend = support.mockBackend;
const AccountPage = require('../page-objects/account.po');

const page = new AccountPage();

describe('Account Settings page', function() {
  describe('Change Password form', function() {

    beforeEach(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
      browser.get('#/account');
      browser.wait( protractor.ExpectedConditions.presenceOf(page.changePasswordButton),
        5000, 'Element taking too long to appear in the DOM');
    });

    afterEach(function() {
      mockBackend.disable();
    });

    it('should disable the change password button if all fields are empty', function() {
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if only the current password field is entered', function() {
      page.currentPassword.enter('CurrentPassword123');
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if the new password is not repeated', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should show an error if the new passwords don\'t match', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword1234');
      expect(page.reenterNewPasswordMatchError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if the new password doesn\'t contain a number', function() {
      page.currentPassword.enter('CurrentPassword123');
      const newPassword = 'NewInvalidPassword';
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordNumberError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if the new password doesn\'t contain an upper-case letter', function() {
      page.currentPassword.enter('CurrentPassword123');
      const newPassword = 'invalidpassword123';
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordUpperCaseError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if the new password is too short', function() {
      page.currentPassword.enter('CurrentPassword123');
      const newPassword = 'TooShort123'; // 11 chars
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordMinLengthError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the change password button if the new password is too long', function() {
      page.currentPassword.enter('CurrentPassword123');
      const newPassword = 'LongPassword123LongPassword1234'; // 31 chars
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordMaxLengthError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should show no errors and enable the change password button if all fields are valid', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      expect(page.newPasswordMinLengthError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordMaxLengthError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordNumberError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordUpperCaseError.isDisplayed()).to.eventually.be.false;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should have a password input field type of password on all three fields', function () {
      expect(page.currentPassword.el.getAttribute('type')).to.eventually.equal('password');
      expect(page.newPassword.el.getAttribute('type')).to.eventually.equal('password');
      expect(page.reenterNewPassword.el.getAttribute('type')).to.eventually.equal('password');
    });

    it('should show an error on the current password field if the entered password was invalid', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
        error: {
          message: 'Incorrect password',
          name: 'IncorrectPasswordFault'
        }
      }]);
      page.changePasswordButton.click();
      expect(page.currentPasswordIncorrectError.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should show a generic error if an unexpected error occurs and has no message', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [500, 'test error']);
      page.changePasswordButton.click();
      expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.errorMessage.getText()).to.eventually.equal('Error: test error');
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should show the message from the error if an unexpected server error occurs and has a message', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [500, {
        error: {
          message: 'error message from the server'
        }
      }]);
      page.changePasswordButton.click();
      expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.errorMessage.getText()).to.eventually.equal('Error: error message from the server');
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should show a success message and clear all fields when password is successfully changed', function() {
      page.currentPassword.enter('CurrentPassword123');
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, { result: {} }] );
      page.changePasswordButton.click();
      expect(page.successMessage.isDisplayed()).to.eventually.be.true;
      expect(page.changePasswordButton.isEnabled()).to.eventually.be.false;
      // fields are cleared
      expect(page.currentPassword.el.getText()).to.eventually.equal('');
      expect(page.newPassword.el.getText()).to.eventually.equal('');
      expect(page.reenterNewPassword.el.getText()).to.eventually.equal('');
      // no errors
      expect(page.currentPasswordIncorrectError.isDisplayed()).to.eventually.be.false;
      expect(page.currentPasswordRequiredError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordRequiredError.isDisplayed()).to.eventually.be.false;
    });
  });
});
