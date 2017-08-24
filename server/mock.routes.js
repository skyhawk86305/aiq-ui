'use strict';

var _ = require('lodash'),
  express = require('express'),
  mockRoutes = express.Router(),
  mockTimeSeriesData = require('./mock.time-series-data'),
  serverConfig = require('./server.config.js'),
  argv = require('yargs').alias('m', 'mock').argv,
  fixtureDir = typeof argv.mock === 'string' ? argv.mock : serverConfig.local.fixture,
  authenticated = true,
  ssoAuthenticated = false,
  ssoLoginTarget = '/';

/**
 * Catch API requests and respond with the matching fixture data
 */
mockRoutes.post('/json-rpc/2.0', function (req, res) {
  var fixture = require('./fixtures/' + fixtureDir + '/' + req.body.method),
    response = fixture || {};
  res.send(response);
});

mockRoutes.get('/dashberg/customers/:customerID/:method', function(req, res) {
  var fixture = require('./fixtures/' + fixtureDir + '/' + req.params.method),
    response = fixture || {};
  res.send(response);
})

mockRoutes.get('/dashberg/customers/:method', function(req, res) {
  var fixture = require('./fixtures/' + fixtureDir + '/' + req.params.method),
    response = fixture || {};
  res.send(response);
})

mockRoutes.get('/state/cluster/:clusterId/:method', function (req, res) {
  var fixture = require('./fixtures/' + fixtureDir + '/' + req.params.method + '-Guzzle'),
    response = fixture || {};
  res.send(response);
});

mockRoutes.get('/state/cluster/:clusterId', function (req, res) {
  var fixture = require('./fixtures/' + fixtureDir + '/GetGuzzleAPIs'),
    response = fixture || {};
  res.send(response);
});

/**
 * Catch API get request to sessions and return status based on user authentication status
 */
mockRoutes.get('/sessions', function (req, res) {
  if (authenticated) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

/**
 * Catch API put request to sessions and sign in user based on username and password
 */
mockRoutes.put('/sessions', function (req, res) {
  if (req.body.username === serverConfig.local.username &&
    req.body.password === new Buffer(serverConfig.local.password).toString('base64')) {
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
mockRoutes.delete('/sessions', function (req, res) {
  authenticated = false;
  res.status(200).send();
});


/**
 * SSO mocks
 */
mockRoutes.get('/sso/login', function (req, res) {
  if (req.query.target) {
    ssoLoginTarget = req.query.target;
  } else {
    ssoLoginTarget = '/';
  }
  res.send(`
    <h1>SSO Login</h1>
    <p>This is a fake SSO login page. Click the link below to fake a successful login.</p>
    <a href="/sso/callback">Login</a>
  `);
});

mockRoutes.get('/sso/callback', function (req, res) {
  ssoAuthenticated = true;
  res.header('Location', ssoLoginTarget);
  res.status(302).send();
});

mockRoutes.get('/sso/session', function (req, res) {
  if (ssoAuthenticated) {
    res.send({ userID: 'fakeUser' });
  } else {
    res.status(404).send();
  }
});

mockRoutes.post('/sso/link', function (req, res) {
  if (!ssoAuthenticated) {
    res.status(401).send('SSO session is required');
    return
  }
  if (!authenticated) {
    res.status(401).send('AIQ session is required');
    return
  }
  res.status(200).send('Accounts were successfully linked');
});

mockRoutes.get('/sessions/logout', function (req, res) {
  ssoAuthenticated = false;
  authenticated = false;
  res.status(200).send()
});

/**
 * Catch "send password reset email" requests and always return successfully
 */
mockRoutes.post('/password-reset', function (req, res) {
  res.status(200).send();
});

/**
 * Catch password-reset requests and respond successfully, unless the provided token is all ones (to provide a way to check
 * the interface when an invalid token is used)
 */
mockRoutes.post('/password-reset/:token', function (req, res) {
  if (req.params.token === '11111111-1111-1111-1111-111111111111') {
    res.status(400).send('Invalid token');
  } else {
    res.status(200).send();
  }
});

/**
 * Catch capacity page graph data requests and respond with random data
 * in the correct response format.
 */
mockRoutes.get('/graph/cluster/:clusterId/capacity', function (req, res) {
  const data = mockTimeSeriesData.getTimeSeriesData(
    req.query.startTime, req.query.endTime, req.query.resolution, 0, [
      'usedSpace',
      'maxUsedSpace',
      'usedMetadataSpace',
      'maxUsedMetadataSpace',
      'provisionedSpace',
      'maxProvisionedSpace',
      'thinProvisioningFactor',
      'deDuplicationFactor',
      'compressionFactor',
      'efficiencyFactor',
      'activeSessions',
      'peakActiveSessions',
    ]
  );
  data.thinProvisioningFactor = data.thinProvisioningFactor.map( val => val / 1000000000000 );
  data.deDuplicationFactor = data.deDuplicationFactor.map( val => val / 1000000000000 );
  data.compressionFactor = data.compressionFactor.map( val => val / 1000000000000 );
  data.efficiencyFactor = data.efficiencyFactor.map( val => val / 1000000000000 );
  data.activeSessions = data.activeSessions.map( val => val / 10000000000 );
  data.peakActiveSessions = data.peakActiveSessions.map( val => val / 10000000000 );
  res.send(data);
});

/**
 * Catch capacity page graph data requests and respond with random data
 * in the correct response format.
 */
mockRoutes.get('/graph/cluster/:clusterId/performance', function (req, res) {
  const data = mockTimeSeriesData
    .getTimeSeriesData(
      req.query.startTime,
      req.query.endTime,
      req.query.resolution,
      0,
      ['clusterUtilizationPct', 'readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec', 'readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec']
    );
  data.clusterUtilizationPct = data.clusterUtilizationPct.map( val => val / 1000000000000 );
  data.readOpsPerSec = data.readOpsPerSec.map( val => val / 100000000000 );
  data.writeOpsPerSec = data.writeOpsPerSec.map( val => val / 100000000000 );
  data.totalOpsPerSec = data.totalOpsPerSec.map( val => val / 100000000000 );
  res.send(data);
});

/**
 * Catch capacity page graph data requests and respond with random data
 * in the correct response format.
 */
mockRoutes.get('/graph/cluster/:clusterId/volume/:volumeId/performance', function (req, res) {
  const data = mockTimeSeriesData
    .getTimeSeriesData(
      req.query.startTime,
      req.query.endTime,
      req.query.resolution,
      0,
      ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec', 'readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec', 'readLatencyUSec', 'writeLatencyUSec', 'latencyUSec', 'usedCapacity', 'provisionedCapacity', 'averageIOPSize', 'clientQueueDepth']
    );
  data.clientQueueDepth = data.clientQueueDepth.map( val => val / 1000000000000 );
  data.averageIOPSize = data.averageIOPSize.map( val => val / 1000000000000 );
  data.readLatencyUSec = data.readLatencyUSec.map( val => val / 1000000000000 );
  data.writeLatencyUSec = data.writeLatencyUSec.map( val => val / 1000000000000 );
  data.latencyUSec = data.latencyUSec.map( val => val / 1000000000000 );
  data.readOpsPerSec = data.readOpsPerSec.map( val => val / 100000000000 );
  data.writeOpsPerSec = data.writeOpsPerSec.map( val => val / 100000000000 );
  data.totalOpsPerSec = data.totalOpsPerSec.map( val => val / 100000000000 );
  res.send(data);
});

mockRoutes.get('/banner-message', function(req, res) {
  const response = {
    "message": "This is a mock message.",
    "type": "info",
    "timestamp": "0"
  };

  res.send(response);
});

module.exports = mockRoutes;
