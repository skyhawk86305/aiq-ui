export function TableBadgeAlertSeverityFilter() {
  return function (data) {
    let ucData;

    if (typeof data === 'string') {
      ucData = data.toUpperCase();
    } else {
      ucData = data;
    }

    switch (ucData) {
      case 'INFO':
        return '<div class="table-badge -info">INFO</div>';
      case 'WARNING':
        return '<div class="table-badge -warning">WARNING</div>';
      case 'ERROR':
        return '<div class="table-badge -error">ERROR</div>';
      case 'CRITICAL':
        return '<div class="table-badge -critical">CRITICAL</div>';
      case 'BESTPRACTICE':
        return '<div class="table-badge -bestPractice">BEST PRACTICE</div>';
      default:
        return data;
    }
  };
}
