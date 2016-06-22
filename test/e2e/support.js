var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var supportObject = {
  expect: chai.expect
};

module.exports = supportObject;
