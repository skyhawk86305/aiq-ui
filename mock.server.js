'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    mockConfig = require('./mock.config'),
    MockData = require('./server/mock-data'),
    server = express(),
    authenticated = true;

/**
 * Configure and start the mock server either locally or on jenkins
 */
server.use('/', express.static('build'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.listen(mockConfig.port, mockConfig.host);

/**
 * Catch API requests and respond with the matching fixture data
 */
server.post('/v2/api', function (req, res) {
  var fixture = require('./test/fixtures/' + req.body.method),
      response = fixture || {};
  res.send(response);
});

/**
 * Catch API get request to sessions and return status based on user authentication status
 */
server.get('/sessions', function (req, res) {
  if (authenticated) {
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

/**
 * Catch API put request to sessions and sign in user based on username and password
 */
server.put('/sessions', function (req, res) {
  if (req.body.username === 'testuser@solidfire.com' &&
    req.body.password === new Buffer('password123').toString('base64')) {
    authenticated = true;
    res.status(200).send();
  } else {
    authenticated = false;
    res.status(400).send();
  }
});

/**
 * Catch API delete request to sessions and set authenticated to false
 */
server.delete('/sessions', function (req, res) {
  authenticated = false;
  res.status(200).send();
});

/**
 * Catch capacity page graph data requests and respond with random data
 * in the correct response format.
 */
server.get('/graph/cluster/:clusterId/capacity', function (req, res) {
  var data = MockData.getTimeSeriesData(req.query.startTime, req.query.endTime, req.query.resolution, 0, ['usedSpace', 'maxUsedSpace', 'usedMetadataSpace', 'maxUsedMetadataSpace', 'provisionedSpace', 'maxProvisionedSpace']),
    response = data || {};

  res.send(response);
});

/**
 * Catch capacity page graph data requests and respond with random data
 * in the correct response format.
 */
server.get('/graph/cluster/:clusterId/performance', function (req, res) {
  var data = MockData.getTimeSeriesData(req.query.startTime, req.query.endTime, req.query.resolution, 0, ['clusterUtilizationPct', 'readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec', 'readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec']),
    response = data || {};

  response.clusterUtilizationPct = response.clusterUtilizationPct.map(function(val) {
    return (val / 1000000000000);
  });

  response.readOpsPerSec = response.readOpsPerSec.map(function(val) {
    return (val / 100000000000);
  });

  response.writeOpsPerSec = response.writeOpsPerSec.map(function(val) {
    return (val / 100000000000);
  });

  response.totalOpsPerSec = response.totalOpsPerSec.map(function(val) {
    return (val / 100000000000);
  });

  res.send(response);
});


server.get('/graph/cluster/:clusterId/capacity/snapshot', function (req, res) {
  var response = {"timestampSec":1479401909,"usedSpace":2935990947150,"maxUsedSpace":42805052899328,"usedMetadataSpace":180152187904,"maxUsedMetadataSpace":2080115870926,"provisionedSpace":59728017932288,"maxProvisionedSpace":138254831476736,"thinProvisioningFactor":7.833951255671171,"deDuplicationFactor":1.808344330383057,"compressionFactor":2.8194204035516706,"efficiencyFactor":15.76773144525874,"activeSessions":80,"peakActiveSessions":100};
  res.send(response);

});

server.get('/graph/cluster/:clusterId/performance/snapshot', function (req, res) {
  var response ={"timestampSec":1479495910,"readOpsPerSec":2020,"writeOpsPerSec":7890,"totalOpsPerSec":8765,"readBytesPerSec":22973537,"writeBytesPerSec":153109641,"totalBytesPerSec":176083178,"clusterUtilizationPct":10.747204393148422};
  res.send(response);

});


