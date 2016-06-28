module.exports = function JsonOutputHook() {
  'use strict';
  var Cucumber = require('cucumber');
  var JsonFormatter = Cucumber.Listener.JsonFormatter();
  var fs = require('fs');
  var path = require('path');
  var reportOutputDirectory = 'report/cucumber/cucumber-test-results.json';
  JsonFormatter.log = function (json) {
    var destination = path.join(__dirname, '../../../' + reportOutputDirectory);
    console.log('***********************' + destination);
    fs.open(destination, 'w+', function (err, fd) {
      if (err) {
        fs.mkdirsSync(destination);
        fd = fs.openSync(destination, 'w+');
      }
      fs.writeSync(fd, json);
      console.log('json file location: ' + destination);
    });
  };
  this.registerListener(JsonFormatter);
};
