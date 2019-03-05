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

storiesOf('Charts/Axis/Radial', module)
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
  });

