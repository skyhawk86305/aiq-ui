var request = require('request'),
    cookieParser = require('cookie-parser'),
    localConfig = require('./local.config'),
    express = require('express'),
    server = express(),
    cookie;

/**
 * Configure and start local server
 */
server.use(cookieParser());
server.use('/', express.static('build'));
server.listen(localConfig.port, localConfig.host);
console.log("Node server started on " + localConfig.host + ':' + localConfig.port);

server.use('/sessions', function (req, res) {
  var sessionUrl = localConfig.apiServer + '/sessions';
  req.pipe(request({
    method: req.method,
    uri: sessionUrl
  })).pipe(res);
});

server.use('/v2/api', function (req, res) {
  url = localConfig.apiServer + '/json-rpc/2.0',
  req.pipe(request({
    method: req.method,
    uri: url,
  })).pipe(res);
});
