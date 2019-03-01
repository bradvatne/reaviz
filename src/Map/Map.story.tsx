import React from 'react';
import { storiesOf } from '@storybook/react';
import { Map } from './Map';
import { MapMarker } from './MapMarker';

storiesOf('Charts/Map', module)
  .add('Simple', () => <Map height={350} width={500} />)
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <Map />
    </div>
  ))
  .add('Markers', () => (
    <Map
      height={350}
      width={500}
      markers={[
        <MapMarker coordinates={[-122.490402, 37.786453]} />,
        <MapMarker coordinates={[-58.3816, -34.6037]} />,
        <MapMarker coordinates={[-97.7437, 30.2711]} tooltip="Austin, TX" />
      ]}
    />
  ));
