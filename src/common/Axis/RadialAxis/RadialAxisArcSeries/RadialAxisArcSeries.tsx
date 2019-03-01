import React, { Component } from 'react';
import { RadialAxisArc } from './RadialAxisArc';
import { range } from 'd3-array';

interface RadialAxisArcSeriesProps {
  count: number;
  padding: number;
  minRadius: number;
  stroke: ((index: number) => string) | string;
  strokeDasharray: ((index: number) => string) | string;
  arcWidth: number;
}

export class RadialAxisArcSeries extends Component<
  RadialAxisArcSeriesProps,
  {}
> {
  render() {
    const {
      count,
      padding,
      minRadius,
      stroke,
      strokeDasharray,
      arcWidth
    } = this.props;
    const arcs = range(count);

    return (
      <g>
        {arcs.map(i => (
          <RadialAxisArc
            key={i}
            index={i}
            minRadius={minRadius}
            count={count}
            width={arcWidth}
            padding={padding}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
          />
        ))}
      </g>
    );
  }
}
