import { storiesOf } from '@storybook/react';
import React from 'react';

import { singleDateData, medDateData, smallDateData } from '../common/demo';
import { SparklineChart } from './SparklineChart';
import { AreaSparklineChart } from './AreaSparklineChart';
import { BarSparklineChart } from './BarSparklineChart';

storiesOf('Charts/Sparkline', module)
  .add('Line', () => (
    <SparklineChart width={200} height={55} data={medDateData} />
  ))
  .add('Area', () => (
    <AreaSparklineChart width={200} height={85} data={singleDateData} />
  ))
  .add('Bar', () => (
    <BarSparklineChart width={200} height={55} data={smallDateData} />
  ));
