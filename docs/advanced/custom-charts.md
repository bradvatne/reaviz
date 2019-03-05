# Custom Charts

All of the chart components are exported so its easy to create your own
charts. Lets say you wanted to create a bar chart with a line chart too.

Below is a psuedo code example of what this might look like:

```jsx
import { AreaSeries, BarSeries } from 'reaviz';

const MyChart = () => (
  <g>
    <AreaSeries
      id="area"
      data={[]}
      xScale={areaXScale}
      yScale={areaYScale}
      height={500}
      width={500}
      colorScheme={['#9b9b9b']}
      markLine={null}
      area={null}
      line={<Line strokeWidth={1} />}
    />
    <BarSeries
      id="bar"
      data={[]}
      height={500}
      width={500}
      data={data}
      isCategorical={true}
      xScale={xScale}
      yScale={yScale}
    />
  </g>
);
```
