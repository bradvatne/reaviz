import React from 'react';
import { storiesOf } from '@storybook/react';
import { RadialAxis } from './RadialAxis';
import { scaleTime } from 'd3-scale';
import { extent, range } from 'd3-array';
import moment from 'moment';

const getData = () => {
  const date = moment()
    .subtract(1, 'day')
    .startOf('day');

  const data = range(13).map(i => ({
    key: date
      .clone()
      .add(i, 'hour')
      .toDate()
  }));

  const domain = extent<{ key: Date }, Date>(data, d => d.key) as Date[];

  const xScale = scaleTime()
    .range([0, 2 * Math.PI])
    .domain(domain);

  return xScale;
};

storiesOf('Common/Axis/Radial', module)
  .add('Simple', () => {
    const xScale = getData();

    return (
      <div style={{ background: '#07111D', padding: '10px' }}>
        <svg width={600} height={600}>
          <g transform="translate(300, 300)">
            <RadialAxis
              height={600}
              xScale={xScale}
              line={{
                ...RadialAxis.defaultProps.line,
                show: false
              }}
            />
          </g>
        </svg>
      </div>
    );
  })
  .add('Advanced', () => {
    const xScale = getData();

    const arc = {
      ...RadialAxis.defaultProps.arc,
      stroke: index => {
        let stroke = '#054856';
        if (index === 4) {
          stroke = '#326AFF';
        } else if (index === 8) {
          stroke = '#00BEE5';
        } else if (index === 10) {
          stroke = '#CE003E';
        } else if (index === 11) {
          stroke = 'none';
        } else if (index === 12) {
          stroke = '#00BEE5';
        }
        return stroke;
      },
      strokeDasharray: index => {
        return index % 4 === 0 || index === 10 ? 'none' : '1,4';
      }
    };

    const line = {
      ...RadialAxis.defaultProps.line,
      stroke: '#054856'
    };

    const ticks = {
      ...RadialAxis.defaultProps.ticks,
      count: 24,
      label: {
        ...RadialAxis.defaultProps.ticks.label,
        format: (value, index) => {
          const format = moment(value).format('H A');
          if (format === '0 AM' || index % 2) {
            return '';
          }
          return format;
        }
      }
    };

    return (
      <div style={{ background: '#07111D', padding: '10px' }}>
        <svg width={600} height={600}>
          <g transform="translate(300, 300)">
            <RadialAxis
              height={600}
              xScale={xScale}
              line={line}
              arc={arc}
              ticks={ticks}
            />
          </g>
        </svg>
      </div>
    );
  });
