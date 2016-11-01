'use strict';

var exports = module.exports = {},
    Chance = require('chance');

/**
 * @param start {string} The start of the time series, in ISO 8601 format.
 * @param end {string} The end of the time series, in ISO 8601 format.
 * @param resolution {number} The resolution of the data to provide, in milliseconds. Should
 * be a whole number.
 * @param graphIndex {number} A unique value for a graph to keep the chance variable the same
 * @param seriesCount {number} The number of time series data sets to include in the response
 * @returns {Object} If successful, returns an object with 'timestamps' and n number of 'seriesN' array
 * properties. Else returns an object with a 'status' property.
 */
exports.getTimeSeriesData = function(start, end, resolution, graphIndex, seriesCount) {
  var i, j,
    startTime = Date.parse(start),
    endTime = Date.parse(end),
    res = parseInt(resolution),
    index = parseInt(graphIndex),
    count = parseInt(seriesCount),
    random = new Chance(startTime + endTime + index),
    totalTime = Math.floor(endTime - startTime),
    timeSeriesData = {timestamps: []};

  if (resolution < 1) {
    return {
      status: 'Error. Resolution can not be higher than 1 millisecond. Provided resolution was ' + resolution + '.'
    };
  }

  for(i = 0; i < count; i++) {
    timeSeriesData['series' + i] = [];
  }

  for (i = 0; i < totalTime; i += res) {
    timeSeriesData.timestamps.push(new Date(startTime + i).toISOString());
    for(j = 0; j < count; j++) {
      timeSeriesData['series' + j].push(random.integer({min:1, max: 9}));
    }
  }

  return timeSeriesData;
};
