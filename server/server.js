'use strict';

var express = require('express'),
  webpack = require('webpack'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  serverConfig = require('./server.config'),
  argv = require('yargs')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('m', 'mock').argv,
  host = argv.host || serverConfig.defaultHost,
  port = argv.port || serverConfig.defaultPort,
  testingTask = argv._[0] === 'test:e2e' || argv._[0] === 'test:acceptance',
  useMock = testingTask || argv.hasOwnProperty('mock'),
  serveProd = argv.hasOwnProperty('prod'),
  routes = useMock ? require('./mock.routes') : require('./proxy.routes'),
  fixture = typeof argv.mock === 'string' ? argv.mock : serverConfig.defaultFixture,
  server = express(),
  compiler = webpack(require('../webpack/webpack.dev'));

/**
 * Configure and start local server
 */
if (useMock) {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));
} else {
  server.use(cookieParser());
}

if (serveProd) {
  server.use(express.static('build'));
} else {
  server.use(require('webpack-dev-middleware')(compiler, {noInfo: true}));
  server.use(require("webpack-hot-middleware")(compiler));
}
server.use('/', routes);
server.listen(port, host);

console.log('\n\n');
console.log('Node server started on: ' + host + ':' + port);
if(useMock) { console.log('Using fixture: ' + fixture); }
else { console.log('Using proxy end point: ' + require('./proxy.config').endPoint); }
console.log('\n');
console.log('Use ctrl+C to kill the server');
console.log('\n');
