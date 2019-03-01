import bigInt from 'big-integer';
import { range } from 'd3-array';
import { generateDate, randomNumber } from './utils';

const generateData = (count, minVal = 1, maxVal = 50) =>
  range(count)
    .map(i => ({
      key: generateDate(i),
      data: randomNumber(minVal, maxVal)
    }))
    .reverse();

export const largeDateData = generateData(100);
export const medDateData = generateData(50);
export const smallDateData = generateData(15);

export const singleDateData = [
  {
    key: generateDate(14),
    data: 10
  },
  {
    key: generateDate(10),
    data: 8
  },
  {
    key: generateDate(5),
    data: 18
  },
  {
    key: generateDate(2),
    data: 10
  }
];

export const multiDateData = [
  {
    key: 'Threat Intel',
    data: [
      {
        key: generateDate(14),
        data: 5
      },
      {
        key: generateDate(10),
        data: 10
      },
      {
        key: generateDate(5),
        data: 12
      },
      {
        key: generateDate(2),
        data: 10
      }
    ]
  },
  {
    key: 'DLP',
    data: [
      {
        key: generateDate(14),
        data: 10
      },
      {
        key: generateDate(10),
        data: 15
      },
      {
        key: generateDate(5),
        data: 12
      },
      {
        key: generateDate(2),
        data: 10
      }
    ]
  },
  {
    key: 'Syslog',
    data: [
      {
        key: generateDate(14),
        data: 10
      },
      {
        key: generateDate(10),
        data: 20
      },
      {
        key: generateDate(5),
        data: 10
      },
      {
        key: generateDate(2),
        data: 12
      }
    ]
  }
];

export const singleDateBigIntData = [
  {
    key: generateDate(14),
    data: bigInt(98476124342)
  },
  {
    key: generateDate(10),
    data: bigInt(76129235932)
  },
  {
    key: generateDate(5),
    data: bigInt(60812341342)
  },
  {
    key: generateDate(2),
    data: bigInt(76129235932)
  }
];
