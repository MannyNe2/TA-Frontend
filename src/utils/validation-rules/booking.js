import { differenceInDays, differenceInHours } from 'date-fns';

export const bookingOriginRules = [
  (val) => (val && val.length > 0) || 'Please enter a valid origin',
];

export const bookingDestinationRules = [
  (val) => (val && val.length > 0) || 'Please enter a valid destination',
];

export const bookingDateRules = [
  (val) => !!val || 'Please enter a leaving date.',
  (val) =>
    differenceInHours(new Date(val), Date.now()) > 0 ||
    'Please enter a valid leaving date. Leaving dates must be at least an hour after the current time.',
];

export function bookingReturnDateRules(date) {
  return [
    (val) =>
      !val ||
      differenceInDays(new Date(val), Date.now()) > 0 ||
      'Please enter a valid return date or omit the return date entirely. Return dates must be at least a day after the current date.',
    (val) =>
      !val ||
      (!!date && differenceInDays(new Date(val), new Date(date)) > 0) ||
      `Please enter a valid return date. Return dates must be at least a day after the leaving date.`,
  ];
}

export const bookingPassengersRules = [
  (val) => {
    const lowerLimit = 1,
      upperLimit = 10;
    try {
      return (
        (val &&
          Number.isInteger(parseInt(val)) &&
          val >= lowerLimit &&
          val <= upperLimit) ||
        `Please enter a valid number of passengers (between ${lowerLimit} and ${upperLimit})`
      );
    } catch {
      return false;
    }
  },
];
