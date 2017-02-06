export function TableBadgeDrivesFilter() {
  return function (data, column) {
    let criticalThreshold = column === 'wear' ? 10 : 1;
    let warningThreshold = column === 'wear' ? 80 : 20;
    let percentage = column === 'wear' ? '%' : '';
    let type = 'normal';

    if (isNaN(parseFloat(data))) {
      return '<div class="table-badge -empty">-</div>';
    }

    if (data < criticalThreshold) {
      type = 'critical';
    } else if (data < warningThreshold) {
      type = 'warning';
    }

    return '<div class="table-badge -' + type + '">' + data + percentage + '</div>';
  };
}
