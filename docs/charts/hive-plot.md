# Hive Plot

A hive plot is a type of visualization to draw networks rationally. Nodes are mapped to and positioned on a set of categorical axes. Edges shows the connections between the nodes as curved links. Hive plots reveals the network structure in a better way so that they make exploring and comparing the netowrks easier.

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/HivePlot/HivePlot.story.tsx)

### Basic Example

```jsx
import { HivePlot } from 'reaviz';

const nodes = [
  {
    x: 0,
    y: 0.6,
    value: '6',
    count: 2
  },
  {
    x: 1,
    y: 0.05555555555555555,
    value: 'Threat Intelligence',
    count: 2
  },
  {
    x: 2,
    y: 0.725925925925926,
    value: '2018-06-07T10:32:06',
    count: 1
  },
  …
];

<HivePlot
  height={350}
  width={350}
  axis={[
    { label: 'Severity', attribute: 'severity' },
    { label: 'Stage', attribute: 'category' },
    { label: 'Time', attribute: 'timestamp' }
  ]}
  nodes={nodes}
  links={[
    {
    color: '#1764ff',
    source: nodes[0],
    target: nodes[1]
    },
    {
      color: '#1764ff',
      source: nodes[1],
      target: nodes[2]
    },
    {
      color: '#1764ff',
      source: nodes[2],
      target: nodes[0]
    },
    {
      color: '#73e4fc',
      source: nodes[3],
      target: nodes[4]
    },
    …
  ]}
/>
```
