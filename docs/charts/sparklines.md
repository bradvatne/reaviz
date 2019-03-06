# Sparkline Chart

The sparkline chart renders small inline charts without axes and currently supports the following chart types:

- Line
- Area
- Bar

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/Sparkline/SparklineChart.story.tsx)

### Sparkline

The sparkline chart is the line chart component under the hood
and supports all the same properties as the line chart.

To render, the only required properties is the `data` object.
For the single sparkline chart, you pass an array of objects with
a `key` and a `data` property. Ideally the `key` property is a
date or numeric value.

```jsx
import { SparklineChart } from 'reaviz';

const data = [
  { key: new Date(), data: 10 },
  ...more data...
];

<SparklineChart
  width={200}
  height={55}
  data={data}
/>
```

### Sparkline (Area)

The area sparkline chart is similar to the sparkline chart except
the area chart component under the hood.

```jsx
import { AreaSparklineChart } from 'reaviz';

const data = [
  { key: new Date(), data: 10 },
  ...more data...
];

<AreaSparklineChart
  width={200}
  height={85}
  data={data}
/>
```

### Sparkline (Bar)

The bar sparkline chart is similar to the sparkline chart except
the bar chart component under the hood.

```jsx
import { BarSparklineChart } from 'reaviz';

const data = [
  { key: new Date(), data: 10 },
  ...more data...
];

<BarSparklineChart
  width={200}
  height={55}
  data={data}
/>
```
