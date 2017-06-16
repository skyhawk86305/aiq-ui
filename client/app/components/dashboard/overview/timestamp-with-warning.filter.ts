import * as moment from 'moment';

// Returns HTML for the timestamp, and includes a warning icon if the filtered timestamp is older
// than the threshold value passed in as a filter parameter.
export function TimestampWithWarningFilter($filter) {
  return function(date: Date, threshold, warnTooltip) {
    const dateString = $filter('aiqDate')(date);

    if (moment().diff(date, 'seconds') > threshold) {
      return `
        <span class="timestamp-with-warning" title="${dateString}">
          <i class="fa fa-warning" title="${warnTooltip}"></i>
          ${dateString}
        </span>
      `;
    }
    return `
      <span class="timestamp-with-warning" title="${dateString}">
        ${dateString}
      </span>
    `;
  };
}

TimestampWithWarningFilter.$inject = [ '$filter' ];
