import localforage from 'localforage';
import { CALENDAR_VIEW_TYPE, YEAR_RANGE_NEPALI } from '../state';
import { fetchYearEvents } from '../../api';

export default {
  async create(req, res) {
    const date = { ...req.body.date };
    date.year = parseInt(date.year, 10);
    res.json({});
    req.pendingState = { cursor: date };
  },
  async update(req, res) {
    const { step, value, type } = req.body;
    const state = req.state.app;
    let { year, month, day } = state.cursor;
    const { calendarView } = state;
    let flipAnimation = '';
    if (!step) {
      flipAnimation = 'fadeInDown';
      if (type === 'year') {
        year = parseInt(value, 10);
      } else if (type === 'month') {
        month = parseInt(value + 1, 10);
      } else {
        year = value.year;
        month = value.month;
        day = value.day;
      }
    }
    if (step === '+') {
      flipAnimation = 'fadeInRight';
      switch (calendarView) {
        case CALENDAR_VIEW_TYPE.YEAR.value:
          if (year < YEAR_RANGE_NEPALI[1]) {
            day = 1;
            year = parseInt(year, 10) + 1;
          }
          break;
        case CALENDAR_VIEW_TYPE.MONTH.value:
          month = parseInt(month, 10) + 1;
          if (month > 12) {
            month = 1;
            if (year < YEAR_RANGE_NEPALI[1]) {
              year = parseInt(year, 10) + 1;
            }
          }
          day = 1;
          break;
        default:
          break;
      }
    }
    if (step === '-') {
      flipAnimation = 'fadeInLeft';
      switch (calendarView) {
        case CALENDAR_VIEW_TYPE.YEAR.value:
          if (year > YEAR_RANGE_NEPALI[0]) {
            year = parseInt(year, 10) - 1;
            day = 1;
          }
          break;
        case CALENDAR_VIEW_TYPE.MONTH.value:
          month = parseInt(month, 10) - 1;
          day = 1;
          if (month < 1) {
            month = 12;
            if (year > YEAR_RANGE_NEPALI[0]) {
              year = parseInt(year, 10) - 1;
            }
          }
          break;
        default:
          break;
      }
    }
    const date = { year, month, day };
    res.json({ date, view: calendarView });
    req.pendingState = { cursor: date, flipAnimation };
  },
  async fetchEvents(req, res) {
    const askingYear = req.pendingState.cursor.year;
    try {
      if (req.state.app.calendarView === CALENDAR_VIEW_TYPE.YEAR.value) {
        return req.pendingState;
      }
      const storageKey = `year_${askingYear}`;
      let events = null;
      //First search in memory if not then goto localDB
      if (window.bhittePatroEvents[askingYear] === undefined) {
        const rawEvents = await localforage.getItem(storageKey);
        events = JSON.parse(rawEvents);
        // If not found in localDB then goto remote
        if (!events) {
          const response = await fetchYearEvents(req.pendingState.cursor.year);
          events = response.data;
          localforage.setItem(storageKey, JSON.stringify(events));
        }
        window.bhittePatroEvents[askingYear] = events;
        return { ...req.pendingState, yearEvents: events };
      }
      events =
        window.bhittePatroEvents[askingYear] === null
          ? []
          : window.bhittePatroEvents[askingYear];
      return { ...req.pendingState, yearEvents: events };
    } catch (err) {
      window.bhittePatroEvents[askingYear] = null; // this means we have searched in remote and didnt found
      return { ...req.pendingState, yearEvents: [] };
    }
  },
};
