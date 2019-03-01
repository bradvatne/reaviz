# 📊 R2D3
R2D3 is a data visualization library for React based on D3js.

R2D3 provides features a module chart component library that leverages
React natively for rendering the components while using D3js under the
hood for calulcations. The library provides a easy way to get started
creating charts without sacraficing customization ability! 


## 🚀 Features
Chart types include:

- Bar Chart
- Line Chart
- Area Chart
- Pie Chart
- Bubble Chart
- Scatter Plot
- Hive Plot
- Sankey Chart
- Map Chart
- Sparklines

Additional features:

- Legend
- Tooltips
- Animations Enter/Update/Exit
- Advanced Axis Configurability
- Brush
- Panning / Zooming
- Gestures
- Grid/Mark Lines

## 📦 Install

To use R2D3 in your project, install it via npm/yarn:

```
npm i r2d3 --save
```

then import a chart type into your JSX element:

```jsx
import { BarChart } from 'r2d3';

const data = [
  { key: 'IDS', data: 14 },
  { key: 'Malware', data: 5 },
  { key: 'DLP', data: 18 }
];

const App = () => (
  <BarChart
    width={350}
    height={250}
    data={data}
  />
);
```

Checkout this [demo live](https://codesandbox.io/embed/m7rl2z1989) or
visit the [demos page](https://jask-oss.github.io/r2d3/) to learn more!
