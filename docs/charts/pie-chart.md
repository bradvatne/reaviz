# Pie Chart

The pie chart supports:

- Single Series Pie

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/PieChart/PieChart.story.tsx)


### Single Series

The single series pie chart will render circle sliced into pieces
based on the data points. 

For the chart, you pass an array of objects with a `key` and a 
`data` property.

```jsx
import { PieChart } from 'reaviz';

const data = [
  { key: 'Malware', data: 10 },
  ...more data...
];

<PieChart
  width={250}
  height={250}
  data={data}
/>
```

To customize the chart more, you can pass a `PieArcSeries` to the chart:

```jsx
import { PieChart, PieArcSeries, PieArcLabel } from 'reaviz';

const data = [
  { key: 'Malware', data: 10 },
  ...more data...
];

<PieChart
  width={250}
  height={250}
  data={data}
  series={
    <PieArcSeries
      colorScheme={chroma
        .scale(['ACB7C9', '418AD7'])
        .colors(data.length)}
      doughnut={true}
      label={<PieArcLabel show={true} />}
    />
  }
/>
```

In the above example we are customizing the:

- color scheme
- setting the chart to be a doughnut chart
- turning on the labels for each slice

There are many other properties available to customize, examples
can be found in the demos.
