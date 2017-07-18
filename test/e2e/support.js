/*global document */

'use strict';

var support,
  path = require('path'),
  fs = require('fs'),
  HttpBackend = require('httpbackend'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  serverConfig = require('../../server/server.config'),
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
  login: function() {
    var LoginPage = require('./page-objects/login.po'),
      loginPage = new LoginPage;
    browser.get('#/login');
    loginPage.usernameInput.enter(serverConfig[argv.env].username);
    loginPage.passwordInput.enter(serverConfig[argv.env].password);
    loginPage.loginButton.click();
  },
  logout: function() {
    var navBar = new support.navbarComponent;
    navBar.menu.expand().select('Logout');
  },
  fixture: function(method) {
    return require('../../server/fixtures/' + argv.fixture + '/' + method);
  },
  $filter: function(name, args) {
    return browser.executeScript( (name, args) => {
      const $filter = angular.element(document.documentElement).injector().get('$filter');
      return $filter(name)(...args);
    }, name, args);
  },
  testTableData: function(table, columns, maxRows, uniqueKey, fixture) {
    const defaultRows = maxRows > 5 ? 5 : maxRows;
    const customRowCount = maxRows > argv.tableRows ? argv.tableRows : maxRows;
    const rowsToTest = argv.tableRows ? customRowCount : defaultRows;

    // Loop through a subset of all visible rows on the given table
    for(let rowIndex = 0; rowIndex < rowsToTest; rowIndex++) {
      table.content.row(rowIndex).data(uniqueKey).getText()
        .then(key => compareFixtureToUiValue(rowIndex, key));
    }

    // Use the uniqueKey for a given table row to find its matching fixture within the provided array
    function compareFixtureToUiValue(rowIndex, key) {
      // ToDo: test will break if uniqueKey field uses a custom formatter
      const fixtureMatch = fixture.find( obj => obj[uniqueKey].toString() === key );

      // Loop through every column of that row and match the UI text against the formatted fixture data
      columns.forEach( column => {
        if (column.exclude) return;
        const fixtureData = fixtureMatch[column.key];

        if(column.format) {
          const filterArgs = column.format.args ? [fixtureData, ...column.format.args] : [fixtureData];
          support.$filter(column.format.filter, filterArgs)
            .then( formattedFixtureData => {
              testTableCell(rowIndex, column.key, formattedFixtureData);
            });
        }
        else {
          testTableCell(rowIndex, column.key, fixtureData);
        }
      });
    }

    function testTableCell(rowIndex, columnKey, expectedValue) {
      const cellContent = table.content.row(rowIndex).data(columnKey).getText();
      const errorMessage = `Row: ${rowIndex}, Column: ${columnKey}`;
      support.expect(cellContent).to.eventually.equal(expectedValue, errorMessage);
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
  },
  getFirstClusterId: function(openedClusterSelect) {
    return new Promise(function(resolve, reject) {
      openedClusterSelect.clustersList().selectClusterByIndex(0).then(function () {
        browser.getCurrentUrl().then(function (url) {
          resolve(url.split('/cluster\/')[1].split('\/reporting').shift());
        });
      });
    });
  },
  checkBreadcrumb: function(nav, item, breadcrumb, cluster, main, sub, menu) {
    nav.item(item).click();
    support.expect(breadcrumb.el.isDisplayed()).to.eventually.be.true;

    if (main) {
      support.expect(breadcrumb.main.getText()).to.eventually.equal(main); 
    } else {
      if (cluster) {
        support.expect(breadcrumb.cluster.isDisplayed()).to.eventually.be.true;
      } else {
        support.expect(breadcrumb.main.isPresent()).to.eventually.be.false;
      }        
    }

    if (sub) {
      support.expect(breadcrumb.sub.getText()).to.eventually.equal(sub);
    } else {
      support.expect(breadcrumb.sub.isPresent()).to.eventually.be.false;            
    }

    if (menu) {
       support.expect(breadcrumb.menu.getText()).to.eventually.equal(menu);    
    } else {
      support.expect(breadcrumb.menu.isPresent()).to.eventually.be.false;            
    }   
  }
};

module.exports = support;
