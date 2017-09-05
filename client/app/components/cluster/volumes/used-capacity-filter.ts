export function UsedCapacityFilter() {
  return function(percentUsed) {
    const badgeType = getBadgeType(percentUsed);
    const displayValue = isNaN(percentUsed) ? '-' : `${percentUsed}%`;
    return `<div class="table-badge -${badgeType}">${displayValue}</div>`;
  };
}

function getBadgeType(percentUsed) {
  if (isNaN(percentUsed)) return 'empty';
  if (percentUsed > 95) return 'critical';
  if (percentUsed > 80) return 'warning';
  return 'normal';
}
