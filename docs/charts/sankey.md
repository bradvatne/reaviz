# Sankey Chart

The Sankey chart renders a [Sankey diagram](https://bost.ocks.org/mike/sankey/) and is built with [D3's Sankey layout code](https://github.com/d3/d3-sankey).

View [Demo Source Code](https://github.com/jask-oss/reaviz/blob/master/src/Sankey/Sankey.story.tsx)

### Simple Sankey

As default, the Sankey chart shows the link/flow with gradation based on the given colorScheme. You can turn off the gradation by passing `false` to SankeyLink component's `gradient` property (e.g. `gradient={false}`).

To render, the `nodes` and `links` of the Sankey component are required and `colorScheme` is optianal but is recommended to spacify
to make Sankeys easier to interpret.

For the `nodes`, you can pass the node's name through `title` property of SankeyNode.

For the edges, SankeyLink's `source`, `target`, and `value` properties are all required. For `source` and `target`, you can use
the index of the nodes' array or the node's `id` if it's assigned.

```jsx
import { Sankey, SankeyNode, SankeyLink } from 'reaviz';

<Sankey
  colorScheme={[
    '#2b908f',
    '#22a596',
    '#2fba97',
    …
  ]}
  height={300}
  width={500}
  nodes={[
    <SankeyNode title="A1" id="1" />,
    <SankeyNode title="A2" id="2" />,
    <SankeyNode title="B1" id="3" />,
    <SankeyNode title="B2" id="4" />
  ]}
  links={[
    <SankeyLink source="1" target="3" value="8" gradient={false} />,
    <SankeyLink source="2" target="4" value="4" gradient={false} />,
    <SankeyLink source="1" target="4" value="2" gradient={false} />
  ]}
/>
```

### Multilevel Sankeys

The Sankey chart supports multiple levels of links with [alignments](https://github.com/d3/d3-sankey#alignments)
through `justification` property (`'justify' (default) | 'center' | 'left' | 'right'`).

```jsx
import { Sankey, SankeyNode, SankeyLink } from 'reaviz';

<Sankey
  colorScheme={[
    '#2b908f',
    '#22a596',
    '#2fba97',
    …
  ]}
  height={600}
  width={964}
  justification="right"
  nodes={[
    <SankeyNode title="Agricultural 'waste'" />,
    <SankeyNode title="Bio-conversion" />,
    <SankeyNode title="Liquid" />,
    <SankeyNode title="Losses" />,
    …
  ]}
  links={[
    <SankeyLink source={0} target={1} value={124.729} />,
    <SankeyLink source={1} target={2} value={0.597} />,
    <SankeyLink source={1} target={3} value={26.862} />,
    <SankeyLink source={1} target={4} value={280.322} />,
    <SankeyLink source={1} target={5} value={81.144} />,
    <SankeyLink source={6} target={2} value={35} />,
    …
  ]}
/>
```
