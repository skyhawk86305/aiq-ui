'use strict';
/* globals browser */
module.exports = function TakeScreenshot() {
  this.After(function (scenario, callback) {
    if (scenario.isFailed()) {
      browser.takeScreenshot().then(function (png) {
        var decodedImage = new Buffer(png, 'base64').toString('binary');
        scenario.attach(decodedImage, 'image/png');
        //browser.manage().logs().get('browser').then(function(browserLog) {
        //  if(browserLog.length !== 0){
        //    // util.inspect(object, showHidden=false, depth=2, colorize=true);
        //    var browserLogString = require('util').inspect(browserLog, false, 5, true);
        //    scenario.attach(browserLogString,'application/json');
        //    console.log('javascript log:',browserLogString);
        //  }
        //});
        callback();
      });
    } else {
      callback();
    }
  });
};
