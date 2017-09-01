export function UsedCapacityFilter() {
  return function (data, column) {
    let type = 'normal';

    if (isNaN(parseFloat(data))) {
      return '<div class="table-badge -empty">-</div>';
    }

    if (data <= 50) {
      type = 'normal';
    } else if (data > 50 && data <= 75) {
      type = 'warning';
    }
    else if (data > 75) {
      type = 'critical';
    }

    return '<div class="table-badge -' + type + '">' + data + '%</div>';
  };
}
