import * as moment from 'moment';
import * as _ from 'lodash';

export function RelativeDateFilter() {
  return function(data, reference = new Date()) {
    if (!data) return '-';

    const duration = moment.duration(moment(data).diff(reference));

    if (duration.asHours() < 24) {
      return 'less than one day';
    }

    const unitValues = [
      { unit: 'Year', value: duration.years() },
      { unit: 'Month', value: duration.months() },
      { unit: 'Day', value: duration.days() },
    ];

    return _(unitValues)
      .dropWhile( ({value}) => value === 0 )
      .take(2)
      .filter( ({value}) => value !== 0 )
      .map( ({unit, value}) => value + ' ' + unit + ( value > 1 ? 's' : '' ) )
      .join(' ');
  };
}
