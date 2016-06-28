'use strict';

var Cucumber = require('cucumber'),
    fs = require('fs-extra'),
    path = require('path');

var JsonFormatter = Cucumber.Listener.JsonFormatter();

var reportsDir = path.join(__dirname, '../../../report/cucumber');
var reportFile = path.join(reportsDir, 'cucumber-test-results.json');

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    fs.open(reportFile, 'w+', function (err, fd) {
      if (err) {
        fs.mkdirsSync(reportsDir);
        fd = fs.openSync(reportFile, 'w+');
      }

      fs.writeSync(fd, json);

      console.log('json file location: ' + reportFile);
    });
  };

  this.registerListener(JsonFormatter);
};
