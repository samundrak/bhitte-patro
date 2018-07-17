export const CALENDAR_VIEW_TYPE = {
  YEAR: { en: 'Year', np: 'वर्ष', value: 'year' },
  MONTH: { en: 'Month', np: 'महिना', value: 'month' },
  // WEEK: { en: 'Week', np: 'हप्ता', value: 'week' },
  // DAY: { en: 'Day', np: 'दिन', value: 'day' },
};
export const YEAR_RANGE_NEPALI = [1970, 2100];
export default {
  gregorianOfCursor: {
    months: [],
    years: [],
  },
  flipAnimation: '',
  currentYear: 2075,
  cursorYear: 2075,
  today: {
    year: 0,
    month: 0,
    day: 0,
  },
  cursor: {
    year: 2075,
    month: 0,
    day: 0,
  },
  calendarView: CALENDAR_VIEW_TYPE.YEAR.value,
};
