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


/**
 * Proxy API requests to AIQ server
 */
server.use('/v2/api', function (req, res) {
  var cookieJar = request.jar(),
      isAuthenticated = cookie,
      url = localConfig.apiServer + '/json-rpc/2.0',
      sessionUrl = localConfig.apiServer + '/sessions';

  if (isAuthenticated) {
    proxyRequest();
  } else {
    getSessionCookie(function() {
      sendCredentials(function() {
        proxyRequest();
      });
    });
  }

  // Make an initial GET to populate the aiqSession cookie in cookieJar
  function getSessionCookie(cb) {
    request.get({
      uri: sessionUrl,
      jar: cookieJar
    }, cb);
  }

  // PUT the username and base64 encode password to complete auth
  function sendCredentials(cb) {
    request.put({
      uri: sessionUrl,
      jar: cookieJar,
      json: true,
      body: {
        username: localConfig.username,
        password: new Buffer(localConfig.password).toString('base64')
      }
    }, function(error, response, body) {
      cookie = cookieJar.getCookieString(sessionUrl);
      cb();
    });
  }

  // Pipe the original req w/ session cookie to the proxy URL, pipe the response to res
  function proxyRequest() {
    cookieJar.setCookie(cookie, localConfig.apiServer);
    req.pipe(request({
      method: req.method,
      uri: url,
      jar: cookieJar
    }, function(error, response, body) {
      // If session expires or cookie becomes invalid, reset the global so we can re-auth ON NEXT CALL
      if (response && response.statusCode === 401) {
        cookie = null;
      }
    })).pipe(res);
  }
});
