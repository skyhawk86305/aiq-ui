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
    }, callback());
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
  testTableData: function(table, columns, maxRows, uniqueKey, fixture) {
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
          colIndex++; if(colIndex >= columns.length) { colIndex=0; rowIndex2++; }
        }
      });
    }
  }
};

module.exports = support;
