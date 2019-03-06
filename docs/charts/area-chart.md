# Area Chart

The area chart supports:

- Single Series Areas
- Multi Series Areas
- Stacked Area
- Stacked Normalized Area

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/AreaChart/AreaChart.story.tsx)

### Single Series

The single series area chart will render a single arc. The only
required property is the `data` object.

For the single series chart, pass an array of objects with
a `key` and `data` property. Ideally, the `key` property is a
date or numeric value.

```jsx
import { AreaChart } from 'reaviz';

const data = [
  { key: new Date(), data: 10 },
  ...more data...
];

<AreaChart
  width={250}
  height={250}
  data={data}
/>
```

To further customize the chart, you can pass a `AreaSeries` to the chart:

```jsx
import { AreaChart } from 'reaviz';

<AreaChart
  data={[]}
  series={
    <AreaSeries
      colorScheme={['27efb5', '00bfff']}
      line={<Line strokeWidth={3} />}
      area={
        <Area
          pattern={true}
          gradient={[
            { offset: '10%', stopOpacity: 0 },
            { offset: '80%', stopOpacity: 1 }
          ]}
        />
      }
    />
  }
/>;
```

In the above example we are customizing the:

- color scheme
- line stroke width
- applying a svg pattern
- applying a custom gradient path

There are many other properties available to customize, examples
can be found in the demos.

### Multi Series

The multi series area chart will render multiple area arcs. The options
are similar to the single series except for the data object is slightly
different.

```jsx
import { AreaChart } from 'reaviz';

const data = [
  {
    key: 'Threat Intel',
    data: [
      {
        key: new Date()
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<AreaChart
  width={250}
  height={250}
  data={data}
/>
```

### Stacked Area

The stacked area is a multi series area chart preconfigured
for stacked data sets. This configuration will automatically
set the series type to `stacked`.

```jsx
import { StackedAreaChart } from 'reaviz';

const data = [
  {
    key: 'Threat Intel',
    data: [
      {
        key: new Date()
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<StackedAreaChart
  width={250}
  height={250}
  data={data}
/>
```

### Stacked Normalized Area

The stacked normalized area is a multi series area chart preconfigured
for normalized stacked data sets. This configuration includes:

- Turning off y-axis label rotation
- Formatting y-axis labels for percentage
- Setting the series type to `stackedNormalized`
- Configuring the tooltip to show values in percentages

```jsx
import { StackedNormalizedAreaChart } from 'reaviz';

const data = [
  {
    key: 'Threat Intel',
    data: [
      {
        key: new Date()
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<StackedNormalizedAreaChart
  width={250}
  height={250}
  data={data}
/>
```
