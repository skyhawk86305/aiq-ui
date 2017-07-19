'use strict';

var express = require('express'),
  request = require('request'),
  fs = require('fs'),
  proxyRoutes = express.Router(),
  proxyConfig = fs.existsSync(__dirname + '/proxy.config.js') ? require('./proxy.config') : false;

if(!proxyConfig) {
  console.log('\n\n');
  console.log('ERROR: No proxy configured!');
  console.log('   Add new file /server/proxy.config.js with your own endPoint and user credentials.');
  console.log('   See proxy.example.config.js for an example.');
  console.log('\n\n');
  process.exit();
}

proxyRoutes.use('/banner-message', function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.endPoint + '/banner-message'
  })).pipe(res);
});

proxyRoutes.use('/sessions', function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.endPoint + '/sessions'
  })).pipe(res);
});

proxyRoutes.use(/\/json-rpc\/2\.0$/, function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.endPoint + '/json-rpc/2.0'
  })).pipe(res);
});

proxyRoutes.use('/state/cluster', function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.endPoint + req.originalUrl
  })).pipe(res);
});

proxyRoutes.use('/graph', function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.endPoint + req.originalUrl
  })).pipe(res);
});

proxyRoutes.use('/dashberg*', function (req, res) {
  req.pipe(request({
    method: req.method,
    uri: proxyConfig.dashbergEndPoint + req.originalUrl.replace(/^\/dashberg/, '')
  })).pipe(res);
});

module.exports = proxyRoutes;
