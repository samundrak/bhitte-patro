import anka from './data/anka';

export function replaceNumberWithAnka(angrejiNumber) {
  return String(angrejiNumber)
    .split('')
    .map(number => anka[number])
    .join('');
}
