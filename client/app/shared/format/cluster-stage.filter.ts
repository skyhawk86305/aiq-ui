export function ClusterStageFilter() {
  return function (stage, getClass) {
    switch (true) {
      case /^stage1/.test(stage): return getClass ? '-no-alert' : 'Normal';
      case /^stage2/.test(stage): return getClass ? '-no-alert' : 'Normal';
      case /^stage3/.test(stage): return getClass ? '-warning'  : 'Warning';
      case /^stage4/.test(stage): return getClass ? '-error'    : 'Error';
      case /^stage5/.test(stage): return getClass ? '-critical' : 'Full';
      default: return getClass ? '' : 'n/a';
    }
  };
}
