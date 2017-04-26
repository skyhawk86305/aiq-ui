'use strict';

const support = require('../support.js');
const mockBackend = support.mockBackend;
const expect = require('../support.js').expect;
const MessageBanner = require('../page-objects/components/sf-components.po').messageBanner;
const messageBanner = new MessageBanner('aiq-message-banner');

describe('The message banner', function() {

  describe('with a valid message JSON', function() {
    afterEach(function() {
      mockBackend.disable();
    });

    it('@default should display the banner', function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/banner-message').respond( () => [200, {
        message: "Test",
        timestamp: "0",
        type: "info"
      }]);
      browser.get('#/dashboard/overview');
      expect(messageBanner.el.isDisplayed()).to.eventually.be.true;
      expect(messageBanner.text.getText()).to.eventually.equal('Test');
      expect(messageBanner.button.getText()).to.eventually.equal('Dismiss');
    });

    describe('and the dismiss button is clicked', function() {
      //browser.driver.sleep(30000);
      it('should not display the banner', function() {
        mockBackend.enable(browser);
        mockBackend.http.whenGET('/banner-message').respond( () => [200, {
          message: "Test",
          timestamp: "0",
          type: "info"
        }]);
        browser.get('#/dashboard/overview');
        messageBanner.button.click();
        expect(messageBanner.el.isPresent()).to.eventually.be.false;
      });
    });

    describe('and a type of "warning"', function() {
      it('should display a yellow banner', function() {
        mockBackend.enable(browser);
        mockBackend.http.whenGET('/banner-message').respond( () => [200, {
          message: "Test",
          timestamp: "0",
          type: "warning"
        }]);
        browser.get('#/dashboard/overview');
        messageBanner.el.getAttribute('class').then(function(classes) {
          console.log(classes);
          expect(classes.indexOf('sf-message-banner-warning')).not.to.equal(-1);
        });
      });
    });

    describe('and a type of "error"', function() {
      it('should display a red banner', function() {
        mockBackend.enable(browser);
        mockBackend.http.whenGET('/banner-message').respond( () => [200, {
          message: "Test",
          timestamp: "0",
          type: "error"
        }]);
        browser.get('#/dashboard/overview');
        messageBanner.el.getAttribute('class').then(function(classes) {
          expect(classes.indexOf('sf-message-banner-error')).not.to.equal(-1);
        });
      });
    })

  });

  describe('with an invalid message JSON', function() {
    beforeAll(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/banner-message').respond( () => [200, {}] );
      browser.get('#/dashboard/overview');
    });

    afterAll(function() {
      mockBackend.disable();
    });

    it('should not display the banner', function() {
      expect(messageBanner.el.isPresent()).to.eventually.be.false;
    });
  });
});
