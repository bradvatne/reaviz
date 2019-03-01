import { range } from 'd3-array';
import { randomNumber } from './utils';

export const categoryData = [
  {
    key: 'Phishing Attack',
    data: 10
  },
  {
    key: 'IDS',
    data: 14
  },
  {
    key: 'Malware',
    data: 5
  },
  {
    key: 'DLP',
    data: 18
  }
];

const generateData = count =>
  range(count).map(i => ({
    key: categoryData[randomNumber(0, categoryData.length - 1)].key + '' + i,
    data: randomNumber(0, 50)
  }));

export const largeCategoryData = generateData(50);

export const multiCategory = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 150
      },
      {
        key: 'SSH',
        data: 112
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 188
      },
      {
        key: 'JSON',
        data: 135
      },
      {
        key: 'HTTPS',
        data: 190
      },
      {
        key: 'SSH',
        data: 100
      }
    ]
  },
  {
    key: 'Exploitation',
    data: [
      {
        key: 'XML',
        data: 70
      },
      {
        key: 'JSON',
        data: 130
      },
      {
        key: 'HTTPS',
        data: 110
      },
      {
        key: 'SSH',
        data: 115
      }
    ]
  },
  {
    key: 'Threat Intelligence',
    data: [
      {
        key: 'XML',
        data: 130
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 200
      },
      {
        key: 'SSH',
        data: 160
      }
    ]
  },
  {
    key: 'Breach',
    data: [
      {
        key: 'XML',
        data: 5
      },
      {
        key: 'JSON',
        data: 10
      },
      {
        key: 'HTTPS',
        data: 15
      },
      {
        key: 'SSH',
        data: 20
      }
    ]
  }
];
