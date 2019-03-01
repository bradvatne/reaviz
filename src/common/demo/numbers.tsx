import { range } from 'd3-array';
import { randomNumber } from './utils';

export const numberData = range(50)
  .filter(() => randomNumber(1, 2) % 2)
  .map(i => ({
    key: randomNumber(i - 5, i + 5),
    data: randomNumber(1, 10)
  }))
  .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
