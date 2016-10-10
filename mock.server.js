var express = require('express'),
    bodyParser = require('body-parser'),
    mockConfig = require('./mock.config'),
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
    console.log('YOUVE BEEN LOGGED IN');
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
    console.log('YOUVE BEEN LOGGED OUT');
  authenticated = false;
  res.status(200).send();
});
