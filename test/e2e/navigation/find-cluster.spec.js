'use strict';

const support = require('../support.js');
const mockBackend = support.mockBackend;
const expect = require('../support.js').expect;
const FindClusterPage = require('../page-objects/find-cluster.po');
const page = new FindClusterPage();

describe('The cluster UUID redirect route', function() {

  describe('with a UUID corresponding to a known cluster', function() {
    beforeAll(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, { result: {
        user: {
          userID: 12345,
          username: "john.doe@netapp.com",
          permissions: [ 'internalUser' ],
        },
        clusterID: 1234,
      }}]);
    });

    afterAll(function() {
      mockBackend.disable();
    });

    it('should lookup the clusterID FindCluster and redirect to the requested page', function() {
      browser.get('#/clusterByUUID/test-uuid/nodes');
      expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/1234/nodes');
    });
  });

  describe('with an unknown cluster UUID', function() {
    beforeAll(function() {
      support.login();
    });

    afterAll(function() {
      support.logout();
    });

    it('should show an error saying the cluster was not found', function() {
      // the fixture for FindCluster says the cluster wasn't found, so we don't need mockBackend
      browser.get('#/clusterByUUID/test-uuid/nodes');
      browser.wait( protractor.ExpectedConditions.presenceOf(page.errorMessage) );
      expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.errorMessage.getText()).to.eventually.contain('No cluster was found with the requested UUID');
    });
  });
});
