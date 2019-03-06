# Map

The map supports:

- World Map

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/Map/Map.story.tsx)


### World Map

To display the map, no settings are required.

```jsx
import { Map } from 'reaviz';

<Map width={500} height={350} />
```

To add data points to the map, pass an array of `MapMarkers` which
contain `x` and `y` coordinates for the location. Optionally, pass
a string to display a tooltip on hover.

```jsx
import { Map, MapMarker } from 'reaviz';

<Map
  width={500}
  height={350}
  markers={[
    <MapMarker coordinates={[-122.490402, 37.786453]} />,
    <MapMarker coordinates={[-97.7437, 30.2711]} tooltip="Austin, TX" />
  ]}
/>
```