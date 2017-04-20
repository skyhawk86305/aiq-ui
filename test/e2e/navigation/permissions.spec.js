const support = require('../support.js');
const mockBackend = support.mockBackend;
const expect = require('../support.js').expect;
const navbar = new support.navbarComponent();

describe('The permission framework', function() {

  describe('without internalAdmin permission', function() {
    beforeAll(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
        result: {
          user: {
            userID: 12345,
            username: "john.doe@netapp.com",
            permissions: [ 'internalUser' ] ,
          },
        }
      }]);
    });

    afterAll(function() {
      mockBackend.disable();
    });

    it('Should not allow navigation to the VMware Alarms page by URL', function() {
      browser.get('#/cluster/1234/vmware-alarms');
      expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
    });

    it('Should not expose a link to the VMware Alarms page in the navbar', function() {
      browser.get('#/cluster/1234/reporting/overview');
      expect(navbar.subNavbar.item('cluster-vmwareAlarms').isDisplayed()).to.eventually.be.false;
    });
  });

  describe('with internalAdmin permission', function() {
    beforeAll(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
        result: {
          user: {
            userID: 12345,
            username: "john.doe@netapp.com",
            permissions: [ 'internalAdmin' ] ,
          },
        }
      }]);
    });

    afterAll(function() {
      mockBackend.disable();
    });

    it('Should allow navigation to the VMware Alarms page by URL', function() {
      browser.get('#/cluster/1234/vmware-alarms');
      expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/1234/vmware-alarms');
    });

    it('Should expose a link to the VMware Alarms page in the navbar', function() {
      browser.get('#/cluster/1234/reporting/overview');
      expect(navbar.subNavbar.item('cluster-vmwareAlarms').isDisplayed()).to.eventually.be.true;
    });
  });

});
