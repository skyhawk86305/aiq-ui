/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var mockBackend = support.mockBackend;
var ResetPasswordPage = require('../page-objects/reset-password.po');

var page = new ResetPasswordPage();
var navbar = new support.navbarComponent();

describe('Reset password', function() {
  describe('Send password reset email', function() {
    beforeEach(function() {
      mockBackend.enable(browser);
      browser.get('#/reset-password');
    });

    afterEach(function() {
      mockBackend.disable();
    });

    it('should not let me click the send email button if the email field is empty', function() {
      expect(page.sendEmailButton.isEnabled()).to.eventually.be.false;
    });

    it('should not let me click the send email button if the entered email is invalid', function() {
      page.emailInput.enter('invalidemail');
      expect(page.sendEmailButton.isEnabled()).to.eventually.be.false;
      expect(page.invalidEmailError.isDisplayed()).to.eventually.be.true;
    });

    it('should let me click the send email button if the entered email is valid', function() {
      page.emailInput.enter('testUser@solidfire.com');
      expect(page.sendEmailButton.isEnabled()).to.eventually.be.true;
    });

    it('should show a message indicating success when the send email button is clicked', function() {
      mockBackend.http.whenPOST('/password-reset').respond(() => [200, null]);
      page.emailInput.enter('testUser@solidfire.com');
      expect(page.sendEmailButton.isEnabled()).to.eventually.be.true;
      page.sendEmailButton.click();
      expect(page.passwordResetEmailSentMessage.isDisplayed()).to.eventually.be.true;
    });

    it('should show a message indicating an error occurred if the send email API request fails', function() {
      mockBackend.http.whenPOST('/password-reset').respond(() => [500, null, null, 'Unexpected error occurred']);
      page.emailInput.enter('testUser@solidfire.com');
      expect(page.sendEmailButton.isEnabled()).to.eventually.be.true;
      page.sendEmailButton.click();
      expect(page.passwordResetEmailSentMessage.isDisplayed()).to.eventually.be.false;
      expect(page.passwordResetEmailErrorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.passwordResetEmailErrorMessage.getText()).to.eventually.equal('Error: 500 Unexpected error occurred');
    });
  });

  describe('Set new password via reset token', function() {
    beforeEach(function() {
      mockBackend.enable(browser);
      browser.get('#/reset-password?token=00000000-0000-0000-0000-000000000000&user=testUser%40solidfire.com');
    });

    afterEach(function() {
      mockBackend.disable();
    });

    it('should show the correct email address as decoded from the URL', function() {
      expect(page.passwordResetUsernameNote.getText()).to.eventually.contain('testUser@solidfire.com');
    });

    it('should disable the set password button if the fields are empty', function() {
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the set password button if the new password is not repeated', function() {
      page.newPassword.enter('NewPassword123');
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should show an error if the new passwords don\'t match', function() {
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword1234');
      expect(page.reenterNewPasswordMatchError.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the set password button if the new password doesn\'t contain a number', function() {
      const newPassword = 'NewInvalidPassword';
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordNumberError.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the set password button if the new password doesn\'t contain an upper-case letter', function() {
      const newPassword = 'invalidpassword123';
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordUpperCaseError.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the set password button if the new password is too short', function() {
      const newPassword = 'TooShort123'; // 11 chars
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordMinLengthError.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should disable the set password button if the new password is too long', function() {
      const newPassword = 'LongPassword123LongPassword1234'; // 31 chars
      page.newPassword.enter(newPassword);
      page.reenterNewPassword.enter(newPassword);
      expect(page.newPasswordMaxLengthError.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.false;
    });

    it('should show no errors and enable the set password button if all fields are valid', function() {
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      expect(page.newPasswordMinLengthError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordMaxLengthError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordNumberError.isDisplayed()).to.eventually.be.false;
      expect(page.newPasswordUpperCaseError.isDisplayed()).to.eventually.be.false;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should have a password input field type of password on all three fields', function () {
      expect(page.newPassword.el.getAttribute('type')).to.eventually.equal('password');
      expect(page.reenterNewPassword.el.getAttribute('type')).to.eventually.equal('password');
    });

    it('should show an error message if an unexpected error occurs', function() {
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/password-reset/00000000-0000-0000-0000-000000000000')
        .respond( () => [500, null, null, 'test error']);
      page.setNewPasswordButton.click();
      expect(page.setNewPasswordErrorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordErrorMessage.getText()).to.eventually.equal('Error: 500 test error');
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.true;
    });

    it('should show a success message if the password reset is successful', function() {
      page.newPassword.enter('NewPassword123');
      page.reenterNewPassword.enter('NewPassword123');
      mockBackend.http.whenPOST('/password-reset/00000000-0000-0000-0000-000000000000')
        .respond( () => [200, null]);
      page.setNewPasswordButton.click();
      expect(page.setNewPasswordErrorMessage.isDisplayed()).to.eventually.be.false;
      expect(page.setNewPasswordSuccessMessage.isDisplayed()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isEnabled()).to.eventually.be.true;
      expect(page.setNewPasswordButton.isDisplayed()).to.eventually.be.false;
    });

  });

});

