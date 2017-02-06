export function GraphResolutionFilter() {
  return function (resolutionMS, graph) {
    var resolutionSec = resolutionMS / 1000;

    switch (graph) {
      case 'capacity':            return getClusterCapacity(resolutionSec);
      case 'efficiency':          return getClusterCapacity(resolutionSec);
      case 'activeISCSISessions': return getClusterCapacity(resolutionSec);
      case 'performance':         return getClusterStats(resolutionSec);
      case 'volumeIops':          return listVolumeStatsByVolume(resolutionSec); // ToDo: Replace - placeholder for test coverage
      case 'thresholds':          return getClusterFullThreshold(resolutionSec); // ToDo: Replace - placeholder for test coverage
      default: return resolutionSec;
    }
  };

  function getClusterStats(resolutionSec) {
    switch (true) {
      case resolutionSec <= 10:    return 10;
      case resolutionSec <= 60:    return 60;
      case resolutionSec <= 120:   return 120;
      case resolutionSec <= 300:   return 300;
      case resolutionSec <= 600:   return 600;
      case resolutionSec <= 1200:  return 1200;
      case resolutionSec <= 3600:  return 3600;
      case resolutionSec <= 7200:  return 7200;
      case resolutionSec <= 14400: return 14400;
      case resolutionSec <= 28800: return 28800;
      case resolutionSec <= 43200: return 43200;
      default: return 86400;
    }
  }

  function listVolumeStatsByVolume(resolutionSec) {
    switch (true) {
      case resolutionSec <= 60:    return 60;
      case resolutionSec <= 120:   return 120;
      case resolutionSec <= 300:   return 300;
      case resolutionSec <= 600:   return 600;
      case resolutionSec <= 1200:  return 1200;
      case resolutionSec <= 3600:  return 3600;
      case resolutionSec <= 7200:  return 7200;
      case resolutionSec <= 14400: return 14400;
      case resolutionSec <= 28800: return 28800;
      case resolutionSec <= 43200: return 43200;
      default: return 86400;
    }
  }

  function getClusterCapacity(resolutionSec) {
    switch (true) {
      case resolutionSec <= 300:   return 300;
      case resolutionSec <= 600:   return 600;
      case resolutionSec <= 1200:  return 1200;
      case resolutionSec <= 3600:  return 3600;
      case resolutionSec <= 7200:  return 7200;
      case resolutionSec <= 14400: return 14400;
      case resolutionSec <= 28800: return 28800;
      case resolutionSec <= 43200: return 43200;
      default: return 86400;
    }
  }

  function getClusterFullThreshold(resolutionSec) {
    switch (true) {
      case resolutionSec <= 3600:  return 3600;
      case resolutionSec <= 7200:  return 7200;
      case resolutionSec <= 14400: return 14400;
      case resolutionSec <= 28800: return 28800;
      case resolutionSec <= 43200: return 43200;
      default: return 86400;
    }
  }
}
