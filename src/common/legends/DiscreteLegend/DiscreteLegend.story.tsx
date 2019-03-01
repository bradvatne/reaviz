import React from 'react';
import { storiesOf } from '@storybook/react';
import { DiscreteLegend } from './DiscreteLegend';
import { DiscreteLegendEntry } from './DiscreteLegendEntry';

storiesOf('Charts/Legend/Discrete', module)
  .add('Vertical', () => (
    <DiscreteLegend
      style={{ width: '200px' }}
      entries={[
        <DiscreteLegendEntry label="DLP" color="green" />,
        <DiscreteLegendEntry label="SIEM" color="blue" />,
        <DiscreteLegendEntry label="AWS" color="yellow" />,
        <DiscreteLegendEntry label="AD" color="purple" />
      ]}
    />
  ))
  .add('Horizontal', () => (
    <DiscreteLegend
      orientation="horizontal"
      entries={[
        <DiscreteLegendEntry label="DLP" color="green" />,
        <DiscreteLegendEntry label="SIEM" color="blue" />,
        <DiscreteLegendEntry label="AWS" color="yellow" />,
        <DiscreteLegendEntry label="AD" color="purple" />
      ]}
    />
  ));
