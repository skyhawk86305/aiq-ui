'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  serverConfig = require('./server.config'),
  argv = require('yargs')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('j', 'jenkins')
    .alias('m', 'mock').argv,
  host = argv.jenkins ? serverConfig.jenkinsHost : argv.host || serverConfig.defaultHost,
  port = argv.jenkins ? serverConfig.jenkinsPort : argv.port || serverConfig.defaultPort,
  useProxy = !argv.hasOwnProperty('mock'),
  routes = useProxy ? require('./proxy.routes') : require('./mock.routes'),
  fixture = typeof argv.mock === 'string' ? argv.mock : serverConfig.defaultFixture,
  server = express();

/**
 * Configure and start local server
 */
if (useProxy) { server.use(cookieParser()); }
else {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));
}
server.use(express.static('build'));
server.use('/', routes);
server.listen(port, host);
console.log('Node server started on: ' + host + ':' + port);
if(useProxy) { console.log('Using proxy end point: ' + require('./proxy.config').endPoint); }
else { console.log('Using fixture: ' + fixture); }
