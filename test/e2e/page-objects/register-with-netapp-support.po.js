'use strict';

var RegisterWithNetappSupportPage = function () {
  var page = this;
  
  page.el = element(by.css('.register-with-netapp-support'));
  page.section = {
    header: element(by.css('.page-section .section-label')),
    registerButton: element(by.css('.register-with-netapp-support-btn')),
    takeMeToAiqLink: element(by.css('.take-me-to-aiq-link'))
  }
};

module.exports = RegisterWithNetappSupportPage;
