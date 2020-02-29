export const getDate = (year = 1900, month = 0, day = 1) =>
  year instanceof Date ? year : new Date(year, month, day);

export const addDays = (date, amount) =>
  new Date(date.getTime() + 86400000 * amount);

export const GET_CALENDAR_DEFAULT_OPTIONS = {
  startDay: 0,
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
  options = GET_CALENDAR_DEFAULT_OPTIONS,
) => {
  const base = getDate(year, month);
  let current = addDays(base, (base.getDay() - options.startDay) * -1);
  const result = [current];

  while (!isCalendarEnd(base, current, options)) {
    current = addDays(current, 1);
    result.push(current);
  }

  console.log(result.map((r) => r.toString()));
};
