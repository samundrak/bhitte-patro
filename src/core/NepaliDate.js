import data from '../data/data-source.json';

class NepaliDate {
  constructor() {
    this.data = data;
    this._cursor = null;
  }

  cursor(cursor) {
    this._cursor = cursor;
  }

  /**
   * Returns number of days available in month
   * @param {Number} month
   */
  getDaysInMonth(month) {
    return this._cursoredData()[month][1];
  }

  /**
   * Returns week start of month,
   * return number is gap from sunday
   * @param {Number} month
   */
  getWeekStartOfMonth(month) {
    return this._cursoredData()[month][0];
  }
  _cursoredData() {
    return this.data[this._cursor];
  }
}
export default NepaliDate;
