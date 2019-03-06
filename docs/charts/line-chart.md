# Line Chart

The line chart is the area chart component under the hood
with the area fill disabled.

As a result, the line chart supports all the same
properties as the area chart. We have wrapped the area
with a line chart component for convenience.

The line chart supports:

- Single Series Line
- Multi Series Line

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/LineChart/LineChart.story.tsx)


### Single Series

The single series line chart will render a single line. The only
required properties is the `data` object.

For the single series chart, you pass an array of objects with
a `key` and a `data` property. Ideally the `key` property is a 
date or numeric value.

```jsx
import { LineChart } from 'reaviz';

const data = [
  { key: new Date(), data: 10 },
  ...more data...
];

<LineChart
  width={250}
  height={250}
  data={data}
/>
```


### Multi Series

The multi series line chart will render multiple lines. The options
are similar to the single series except for the data object is slightly
different.

```jsx
import { LineChart } from 'reaviz';

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

<LineChart
  width={250}
  height={250}
  data={data}
/>
```
