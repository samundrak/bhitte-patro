import Axios from 'axios';

export function fetchYearEvents(year) {
  return Axios.get(`/years/${year}.json`);
}
export function noop() {}
