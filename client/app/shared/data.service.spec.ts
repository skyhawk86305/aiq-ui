'use strict';

describe('Data Service', function () {
  let rootScope,
      service,
      http,
      location,
      response,
      pathSpy;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function ($rootScope, DataService, $httpBackend, $location) {
    rootScope = $rootScope;
    service = DataService;
    http = $httpBackend;
    location = $location;
    pathSpy = jasmine.createSpyObj('path', ['search']);
    location.url('/foo/bar?baz=fuz');
    spyOn(location, 'path').and.returnValue(pathSpy);
  }));

  afterEach(function () {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  describe('initialization', function () {
    it('should have three functions: callAPI, callGuzzleAPI, and callGraphAPI', function () {
      expect(service.callAPI).toBeDefined();
      expect(service.callGuzzleAPI).toBeDefined();
      expect(service.callGraphAPI).toBeDefined();
    });
  });

  describe('.callAPI', function () {
    it('should make an $http request to the API with the provided method name and params', function () {
      service.callAPI('foobar', {param: 'baz'});
      http.expect('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond({});
      http.flush();
    });

    it('should execute the error callback function and route to the login page if the call is unauthenticated', function () {
      response = {message: 'bar'};
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(401, response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });

    it('should return error message if the api call fails', function () {
      response = 'foobar';
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(400, response);
      service.callAPI('foobar', {param: 'baz'}).catch(err => {expect(err).toEqual('foobar');});
      http.flush();
    });
  });

  describe('.callGuzzleAPI', function () {
    it('should make an $http request to the API with the provided method name and cluster ID', function () {
      service.callGuzzleAPI('12345', 'foobar');
      http.expect('GET', '/state/cluster/12345/foobar').respond([]);
      http.flush();
    });

    it('should make an $http request to the API with the provided cluster ID', function () {
      service.callGuzzleAPI('12345');
      http.expect('GET', '/state/cluster/12345').respond([]);
      http.flush();
    });

    it('should return a rejected promise if there is no clusterID passed', function () {
      let rejected = false;
      service.callGuzzleAPI().catch( () => { rejected = true; });
      rootScope.$apply();
      expect(rejected).toBeTruthy();
    });

    it('should execute the error callback function and route to the login page if the call is unauthenticated', function () {
      response = {message: 'bar'};
      http.when('GET', '/state/cluster/1234').respond(401, response);
      service.callGuzzleAPI('1234');
      http.flush();
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });

    it('should return a resolved promise with an empty array if guzzleAPI returns a 404', function () {
      response = {message: 'bar'};
      http.when('GET', '/state/cluster/1234').respond(404, response);
      service.callGuzzleAPI('1234')
        .then(response => {
          expect(response).toEqual([]);
        });
      http.flush();
    });

    it('should a return a rejected promise with the error message if the call fails and is neither a 404 nor 401 error', function () {
      response = {message: 'bar'};
      http.when('GET', '/state/cluster/1234').respond(400, response);
      service.callGuzzleAPI('1234')
        .catch( err => {
          expect(err.data).toEqual(response);
        });
      http.flush();
    });
  });

  describe('.callGraphAPI', function () {
    it('should make an $http request to the API with the provided graph name and snapshot', function () {
      service.callGraphAPI('foobar', {clusterID: 123, snapshot: true});
      http.expect('GET', '/graph/cluster/123/foobar/snapshot').respond({});
      http.flush();
    });

    it('should make an $http request to the API with the provided graph name and graph params', function () {
      const params = {
        clusterID: 123,
        start: new Date('Wed Feb 08 2017 14:04:38 GMT-0700 (MST)'),
        end: new Date('Wed Feb 09 2017 14:04:38 GMT-0700 (MST)'),
        resolution: 3024000
      }, 
      endpoint = '/graph/cluster/123/foobar?startTime=2017-02-08T21:04:38.000Z&endTime=2017-02-09T21:04:38.000Z&resolution=3024';
      response = {timestampSec: [1,2,3]};
      service.callGraphAPI('foobar', params);
      http.expect('GET', endpoint).respond(response);
      http.flush();
    });

    it('should simply return the api call response for a snapshot', function () {
      http.when('GET', '/graph/cluster/456/foobar/snapshot').respond('foobar');
      service.callGraphAPI('foobar', {clusterID: 456, snapshot: true})
        .then( response => {
          expect(response.data).toEqual('foobar');
        });
      http.flush();
    });

    it('should return a response with timestamps that are converted to seconds', function () {
      const params = {
          clusterID: 456,
          start: new Date('Wed Feb 08 2017 14:04:38 GMT-0700 (MST)'),
          end: new Date('Wed Feb 09 2017 14:04:38 GMT-0700 (MST)'),
          resolution: 3024000
        }, 
        endpoint = '/graph/cluster/456/foobar?startTime=2017-02-08T21:04:38.000Z&endTime=2017-02-09T21:04:38.000Z&resolution=3024';
      response = {timestampSec: [1,2,3]};
      http.when('GET', endpoint).respond(response);
      service.callGraphAPI('foobar', params)
        .then( response => {
          expect(response.data.timestamps).toEqual([1000, 2000, 3000]);
        });
      http.flush();
    });

    it('should execute the error callback function and route to the login page if the call is unauthenticated', function () {
      response = {message: 'bar'};
      http.when('GET', '/graph/cluster/789/foobar/snapshot').respond(401, response);
      service.callGraphAPI('foobar', {clusterID: 789, snapshot: true});
      http.flush();
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });

    it('should return a rejected promise with the error message if the call fails and is not a 401 error', function () {
      response = {message: 'bar'};
      http.when('GET', '/graph/cluster/789/foobar/snapshot').respond(400, response);
      service.callGraphAPI('foobar', {clusterID: 789, snapshot: true})
        .catch( err => {
          expect(err.data).toEqual(response);
        });
      http.flush();
    });
  });

});
