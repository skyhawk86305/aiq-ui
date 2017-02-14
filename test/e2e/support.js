/*global document */

'use strict';

var support,
  path = require('path'),
  fs = require('fs'),
  HttpBackend = require('httpbackend'),
  chai = require('chai'),
  request = require('request'),
  chaiAsPromised = require('chai-as-promised'),
  argv = require('yargs').argv,
  ngMocksDir = path.dirname(require.resolve('angular-mocks')),
  ngMocksFilePath = path.join(ngMocksDir, 'angular-mocks.js'),
  ngMocksE2E = fs.readFileSync(ngMocksFilePath).toString();

chai.use(chaiAsPromised);

support = {
  expect: chai.expect,
  mockBackend: {
    http: null,
    enable: function(browser) {
      browser.addMockModule('ngMockE2E', ngMocksE2E);
      this.http = new HttpBackend(browser);
      this.http.whenGET(/tpl.html/).passThrough();
    },
    disable: function() {
      this.http.clear();
      browser.clearMockModules();
    }
  },
  navbarComponent: require('./page-objects/components/navbar.po'),
  clusterSelectComponent: require('./page-objects/components/cluster-select.po'),
  getActiveElement: function() {
    return browser.driver.switchTo().activeElement();
  },
  logout: function (callback) {
    request.delete(browser.baseUrl + '/sessions', callback);
  },
  login: function (callback) {
    var params = {username: 'testuser@solidfire.com', password: new Buffer('password123').toString('base64')};
    return request({
      method: 'PUT',
      uri: browser.baseUrl + '/sessions',
      json: true,
      body: params
    }, callback);
  },
  manualLogin: function(username,password) {
    var LoginPage = require('./page-objects/login.po'),
      loginPage = new LoginPage;
    browser.get('#/login');
    loginPage.usernameInput.enter(username);
    loginPage.passwordInput.enter(password);
    loginPage.loginButton.click();
  },
  manualLogout: function() {
    var navBar = new support.navbarComponent;
    navBar.menu.expand().select('Support');
  },
  fixture: function(method) {
    return require('../../server/fixtures/' + argv.fixture + '/' + method);
  },
  $filter: function(name) {
    return function() {
      return browser.executeScript(function(name, args) {
        return angular.element(document.documentElement).injector().get('$filter')(name).apply(null, args);
      }, name, Array.from(arguments));
    };
  },
  testTableData: function(table, columns, maxRows, uniqueKey, fixture, done) {
    var rowIndex, rowIndex2 = 0, colIndex = 0,
      defaultRows = maxRows > 5 ? 5 : maxRows,
      customRowCount = maxRows > argv.tableRows ? argv.tableRows : maxRows,
      rowsToTest = argv.tableRows ? customRowCount : defaultRows;

    // Loop through a subset of all visible rows on the given table
    for(rowIndex=0; rowIndex<rowsToTest; rowIndex++) {
      table.content.row(rowIndex).data(uniqueKey).getText().then(compareFixtureToUiValue);
    }

    // Use the uniqueKey for a given table row to find its matching fixture within the provided array
    function compareFixtureToUiValue(key) {
      var fixtureMatch = fixture.find(function(obj) { return obj[uniqueKey].toString() === key; }); // ToDo: test will break if uniqueKey field uses a custom formatter

      // Loop through every column of that row and match the UI text against the formatted fixture data
      columns.forEach(function(column) {
        var fixtureData = fixtureMatch[column.key];

        if(column.format) {
          var filterArgs = column.format.args ? [fixtureData].concat(column.format.args) : [fixtureData];
          support.$filter(column.format.filter).apply(null, filterArgs).then(testTableCell);
        } else {
          Promise.resolve(fixtureData).then(testTableCell);
        }

        // Because $filter returns a promise we must maintain a separate pointer to the tested table cell with rowIndex2 and colIndex
        function testTableCell(formattedFixtureData) {
          var errorMsg = 'Row: ' + rowIndex2 + ', Column: ' + column.key + ' ';

          if(!column.exclude) {
            //console.log(errorMsg, '  Value:', formattedFixtureData); // For debugging only
            support.expect(table.content.row(rowIndex2).data(column.key).getText()).to.eventually.equal(formattedFixtureData, errorMsg);
          }
          colIndex++;
          if(colIndex >= columns.length) {
            colIndex=0;
            rowIndex2++;
            if(rowIndex2 >= rowsToTest) { browser.sleep(500); done(); } // Delay and signal done to prevent stale element reference
          }
        }
      });
    }
  },

  infoBoxSizeCheck: function infoBoxSizeCheck(infobar,name){
    infobar.infoBox(name).el.getSize().then(function(boxSize){
      infobar.infoBox(name).value.getSize().then(function(dataSize) {
        support.expect(boxSize.width).to.be.at.least(dataSize.width);
        support.expect(boxSize.height).to.be.at.least(dataSize.height);
      });
    });
  },

  pressEnterKey: function() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  },

  checkScroll: function (item, expectScroll) { // is a scrollbar expected? true or false
    //var el = element(by.css('.cluster-select-list.scrollable-menu'));
    // Get scroll height (height of the entire list, clientHeight (height of the dropdown), and browser height
    var promises = [item.getAttribute('scrollHeight'),item.getAttribute('clientHeight'),browser.manage().window().getSize()];
    protractor.promise.all(promises).then(function (results) {
      var scrollHeight = results[0], clientHeight = results[1], browserHeight = results[2].height;
      if(expectScroll) {
        support.expect(scrollHeight).to.be.at.least(0.80 * (browserHeight - 160));
        support.expect(clientHeight).to.be.at.most(0.80 * (browserHeight - 160));
      }
      else {
        support.expect(clientHeight).to.equal(scrollHeight);
      }
    });
  }

};

module.exports = support;
