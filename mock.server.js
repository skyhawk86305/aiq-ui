var express = require('express'),
    bodyParser = require('body-parser'),
    mockConfig = require('./mock.config'),
    server = express();

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
