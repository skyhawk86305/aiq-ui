'use strict';

var exports = module.exports = {},
    Chance = require('chance');

/**
 * @param start {string} The start of the time series, in ISO 8601 format.
 * @param end {string} The end of the time series, in ISO 8601 format.
 * @param resolution {number} The resolution of the data to provide, in seconds. Should
 * be a whole number.
 * @param graphIndex {number} A unique value for a graph to keep the chance variable the same
 * @param seriesNames {Array} The set of time series names to include in the result
 * @returns {Object} If successful, returns an object with 'timestampSec' and n number of 'seriesN' array
 * properties. Else returns an object with a 'status' property.
 */
exports.getTimeSeriesData = function(start, end, resolution, graphIndex, seriesNames) {
  var i, j,
    startTime = Date.parse(start),
    endTime = Date.parse(end),
    res = parseInt(resolution),
    index = parseInt(graphIndex),
    random = new Chance(startTime + endTime + index),
    totalTime = Math.floor(endTime - startTime),
    resultNames = seriesNames || ['series0'],
    timeSeriesData = {timestampSec: []};

  if (res < 1) {
    return {
      status: 'Error. Resolution can not be higher than 1 second. Provided resolution was ' + res + '.'
    };
  }

  for(i = 0; i < resultNames.length; i++) {
    timeSeriesData[resultNames[i]] = [];
  }

  for (i = 0; i < totalTime; i += (res * 1000)) {
    timeSeriesData.timestampSec.push(parseInt(new Date(startTime + i).getTime() / 1000));
    for(j = 0; j < seriesNames.length; j++) {
      timeSeriesData[seriesNames[j]].push(random.integer({min:1000000000000, max: 9000000000000}));
    }
  }

  return timeSeriesData;
};
