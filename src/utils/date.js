export const getDate = (year = 1900, month = 0, day = 1) =>
  year instanceof Date ? year : new Date(year, month, day);

export const addDays = (date, amount) =>
  new Date(date.getTime() + 86400000 * amount);

export const MONTH = [
  { full: 'January', short: 'Jan' },
  { full: 'February', short: 'Feb' },
  { full: 'March', short: 'Mar' },
  { full: 'April', short: 'Apr' },
  { full: 'May', short: 'May' },
  { full: 'June', short: 'Jun' },
  { full: 'July', short: 'Jul' },
  { full: 'August', short: 'Aug' },
  { full: 'September', short: 'Sep' },
  { full: 'October', short: 'Oct' },
  { full: 'November', short: 'Nov' },
  { full: 'December', short: 'Dec' },
];

export const DAY = [
  { full: 'Sunday', short: 'Sun', sShort: 'Su' },
  { full: 'Monday', short: 'Mon', sShort: 'Mo' },
  { full: 'Tuesday', short: 'Tue', sShort: 'Tu' },
  { full: 'Wednesday', short: 'Wed', sShort: 'We' },
  { full: 'Thursday', short: 'Thu', sShort: 'Th' },
  { full: 'Friday', short: 'Fri', sShort: 'Fr' },
  { full: 'Saturday', short: 'Sat', sShort: 'Sa' },
];

export const CALENDAR_DEFAULT_OPTIONS = {
  startDay: 0,
  format: 'MMM D, YYYY',
};
const isCalendarEnd = (base, current, options) => {
  const startDay = options.startDay === 0 ? 7 : options.startDay;
  if (startDay - current.getDay() !== 1) return false;

  // current is next month
  if (base.getMonth() < current.getMonth()) return true;

  // current is last date of the month
  const next = addDays(current, 1);
  if (current.getMonth() < next.getMonth()) return true;

  return false;
};
export const getCalendar = (
  year,
  month,
  options = CALENDAR_DEFAULT_OPTIONS,
) => {
  const base = getDate(year, month);
  base.setDate(1);
  let current = addDays(base, (base.getDay() - options.startDay) * -1);
  const result = [current];

  while (!isCalendarEnd(base, current, options)) {
    current = addDays(current, 1);
    result.push(current);
  }

  return result;
};

// workaround padStart is not avaliable on IE
const padZeroStart = (num) => (num < 10 ? '0' : '') + num;

export const formatDate = (d, options = CALENDAR_DEFAULT_OPTIONS) => {
  const { format } = options;
  let result = format;
  // handle year
  if (result.match(/YYYY/)) {
    result = result.replace(/YYYY/, d.getFullYear());
  } else if (result.match(/YY/)) {
    result = result.replace(/YY/, String(d.getFullYear()).slice(2));
  }

  // handle month
  if (result.match(/MMMM/)) {
    result = result.replace(/MMMM/, MONTH[d.getMonth()].full);
  } else if (result.match(/MMM/)) {
    result = result.replace(/MMM/, MONTH[d.getMonth()].short);
  } else if (result.match(/MM/)) {
    result = result.replace(/MM/, padZeroStart(d.getMonth() + 1));
  } else if (result.match(/M/)) {
    result = result.replace(/M/, d.getMonth() + 1);
  }

  // handle date
  if (result.match(/DD/)) {
    result = result.replace(/DD/, padZeroStart(d.getDate()));
  } else if (result.match(/D/)) {
    result = result.replace(/D/, d.getDate());
  }

  // handle day of week
  if (result.match(/dddd/)) {
    result = result.replace(/dddd/, DAY[d.getDay()].full);
  } else if (result.match(/ddd/)) {
    result = result.replace(/ddd/, DAY[d.getDay()].short);
  } else if (result.match(/dd/)) {
    result = result.replace(/dd/, DAY[d.getDay()].sShort);
  }
  return result;
};
const equalsDateOptions = { format: 'DD MMM YYYY' };
export const equalsDate = (d1, d2) =>
  formatDate(d1, equalsDateOptions) === formatDate(d2, equalsDateOptions);
