import React, { Component } from 'react';
import { scaleLinear, scalePoint } from 'd3-scale';
import { range } from 'd3-array';
import { RadialAxisLine } from './RadialAxisLine';

interface RadialAxisLineSeriesProps {
  minRadius: number;
  count: number;
  padding: number;
  arcWidth: number;
  height: number;
  stroke: ((index: number) => string) | string;
}

export class RadialAxisLineSeries extends Component<
  RadialAxisLineSeriesProps,
  {}
> {
  getInnerArcRadius(arcWidth: number) {
    const { minRadius, count, padding } = this.props;
    return minRadius + (count - (count - 3)) * (arcWidth + padding);
  }

  render() {
    const { count, stroke, height, arcWidth } = this.props;
    const outerRadius = height / 2;
    const lines = range(count);
    const innerRadius = this.getInnerArcRadius(arcWidth);
    const radius = scaleLinear().range([innerRadius, outerRadius]);
    const angle = scalePoint()
      .domain(range(count + 1) as any)
      .range([0.75, 2.25 * Math.PI]);

    return (
      <g>
        {lines.map((_, i) => (
          <RadialAxisLine
            key={i}
            radius={radius}
            index={i}
            angle={angle}
            stroke={stroke}
          />
        ))}
      </g>
    );
  }
}
