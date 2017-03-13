import { RelativeDateFilter } from './relative-date.filter';

describe('Relative Date Filter', function () {
  const relativeDate = RelativeDateFilter();

  it('should return - for falsy values', function() {
    expect(relativeDate(null)).toEqual('-');
    expect(relativeDate(undefined)).toEqual('-');
  });

  it('should return the correct relative descriptions for valid dates', function() {
    const relativeTo = new Date('2017-03-10');
    const tests = [
      [ '2017-03-12', '2 Days' ],
      [ '2017-04-10', '1 Month' ],
      [ '2017-04-12', '1 Month 2 Days' ],
      [ '2017-05-10', '2 Months' ],
      [ '2018-03-11', '1 Year' ],
      [ '2018-03-18', '1 Year' ],
      [ '2018-04-10', '1 Year 1 Month' ],
      [ '2018-04-11', '1 Year 1 Month' ],
      [ '2019-05-14', '2 Years 2 Months' ],
    ];

    tests.forEach( ([then, expectedResult]) => {
      expect(relativeDate( then, relativeTo )).toEqual(expectedResult);
    });
  });

  it('should return "less than one day" if the dates are less than one day apart', function() {
    const relativeTo = new Date('2017-03-10T00:00:00Z');
    const tests = [
      [ '2017-03-10T01:00:00Z', 'less than one day' ],
      [ '2017-03-10T23:59:00Z', 'less than one day' ],
    ];

    tests.forEach( ([then, expectedResult]) => {
      expect(relativeDate( then, relativeTo )).toEqual(expectedResult);
    });
  });

});

