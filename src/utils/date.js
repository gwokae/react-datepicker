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
  format: 'YYYY-MM-DD',
};
const isCalendarEnd = (base, current, options) => {
  const startDay = options.startDay === 0 ? 7 : options.startDay;
  // only ends on the last day of the week
  if (startDay - current.getDay() !== 1) return false;

  // current is next month
  if (
    base.getMonth() < current.getMonth() ||
    (base.getMonth() === 11 && current.getMonth() === 0)
  )
    return true;

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
  let diffStart = (base.getDay() - options.startDay + 7) % 7;
  let current = addDays(base, diffStart * -1);
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
  if (result.match(/\bYYYY\b/)) {
    result = result.replace(/\bYYYY\b/, d.getFullYear());
  } else if (result.match(/\bYY\b/)) {
    result = result.replace(/\bYY\b/, String(d.getFullYear()).slice(2));
  }

  // handle month
  if (result.match(/\bMMMM\b/)) {
    result = result.replace(/\bMMMM\b/, MONTH[d.getMonth()].full);
  } else if (result.match(/\bMMM\b/)) {
    result = result.replace(/\bMMM\b/, MONTH[d.getMonth()].short);
  } else if (result.match(/\bMM\b/)) {
    result = result.replace(/\bMM\b/, padZeroStart(d.getMonth() + 1));
  } else if (result.match(/\bM\b/)) {
    result = result.replace(/\bM\b/, d.getMonth() + 1);
  }

  // handle date
  if (result.match(/\bDD\b/)) {
    result = result.replace(/\bDD\b/, padZeroStart(d.getDate()));
  } else if (result.match(/\bD\b/)) {
    result = result.replace(/\bD\b/, d.getDate());
  }

  // handle day of week
  if (result.match(/\bdddd\b/)) {
    result = result.replace(/\bdddd\b/, DAY[d.getDay()].full);
  } else if (result.match(/\bddd\b/)) {
    result = result.replace(/\bddd\b/, DAY[d.getDay()].short);
  } else if (result.match(/\bdd\b/)) {
    result = result.replace(/\bdd\b/, DAY[d.getDay()].sShort);
  }
  return result;
};
const parseMatched = (format, str, re) => {
  let matches = format.match(re);
  if (matches) {
    return parseInt(
      str.slice(matches.index, matches.index + matches[0].length),
      10,
    );
  }
};
export const parseDateString = (str, options = CALENDAR_DEFAULT_OPTIONS) => {
  const { format } = options;

  if (format.trim().length !== str.trim().length) return;

  // handle year
  let year = parseMatched(format, str, /\bYYYY\b/);

  // handle month
  let month = parseMatched(format, str, /\bMM\b/);

  // handle date
  let date = parseMatched(format, str, /\bDD\b/);
  if (year !== undefined && month !== undefined && date !== undefined) {
    return getDate(year, month - 1, date);
  }
};
const equalsDateOptions = { format: 'DD MMM YYYY' };
export const equalsDate = (d1, d2) =>
  formatDate(d1, equalsDateOptions) === formatDate(d2, equalsDateOptions);
