# Bar Chart

The bar chart supports:

- Single Series Bar
- Multi Series Bar
- Stacked Bar
- Stacked Normalized Bar
- Marimekko Chart

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/BarChart/BarChart.story.tsx)


### Single Series

The single series bar chart will render a bar for each data point.
The only required properties is the `data` object.

For the single series chart, you pass an array of objects with
a `key` and a `data` property.

```jsx
import { BarChart } from 'reaviz';

const data = [
  { key: 'Malware', data: 10 },
  ...more data...
];

<BarChart
  width={350}
  height={250}
  data={data}
/>
```

To customize the chart more, you can pass a `BarSeries` to the chart:

```jsx
import { BarChart, BarSeries, Bar } from 'reaviz';

<BarChart
  data={[]}
  series={
    <BarSeries
      colorScheme={chroma
        .scale(['ACB7C9', '418AD7'])
        .colors(data.length)}
      bar={<Bar width={5} />}
      padding={0.5}
    />
  }
/>
```

In the above example we are customizing the:

- color scheme
- setting a custom bar width
- applying custom padding between bars

There are many other properties available to customize, examples
can be found in the demos.


### Multi Series

The multi series bar chart will render multiple groupings of bars. The
options are similar to the single series except for the data object is 
slightly different.

```jsx
import { BarChart } from 'reaviz';

const data = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML'
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<BarChart
  width={350}
  height={250}
  data={data}
/>
```

### Stacked Bar

The stacked bar chart is a multi series bar chart preconfigured
for stacked data sets. This configuration will automatically
set the series type to `stacked`.

```jsx
import { StackedBarChart } from 'reaviz';

const multiCategoryData = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML'
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<StackedBarChart
  width={350}
  height={350}
  data={multiCategoryData}
  series={
    <StackedBarSeries
      colorScheme={chroma
        .scale(['ACB7C9', '418AD7'])
        .colors(multiCategoryData[0].data.length)}
    />
  }
/>
```

### Stacked Normalized Bar

The stacked normalized bar is a multi series bar chart preconfigured
for normalized stacked data sets. This configuration includes:

- Turning off y-axis label rotation
- Formatting y-axis labels for percentage
- Setting the series type to `stackedNormalized`
- Configuring the tooltip to show values in percentages

```jsx
import { StackedNormalizedBarChart } from 'reaviz';

const multiCategoryData = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML'
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<StackedNormalizedBarChart
  width={350}
  height={350}
  data={multiCategoryData}
  series={
    <StackedBarSeries
      colorScheme={chroma
        .scale(['ACB7C9', '418AD7'])
        .colors(multiCategoryData[0].data.length)}
    />
  }
/>
```

### Marimekko Chart

The marimekko chart is a multi series bar chart preconfigured
similar to normalized stacked data sets with one difference: The
width of each series is calculated based on its relation to the
entire data set.

```jsx
import { MarimekkoChart, MarimekkoBarSeries } from 'reaviz';

const multiCategoryData = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML'
        data: 5
      },
      ...more data...
    ]
  },
  ...more data...
];

<MarimekkoChart
  width={350}
  height={350}
  data={multiCategoryData}
  series={
    <MarimekkoBarSeries
      colorScheme={chroma
        .scale(['ACB7C9', '418AD7'])
        .colors(multiCategoryData[0].data.length)}
    />
  }
/>
```
