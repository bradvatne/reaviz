import React, { Component } from 'react';
import { RadialAxisTick } from './RadialAxisTick';

interface RadialAxisTickSeriesProps {
  scale: any;
  count: number;
  outerRadius: number;
  line: {
    show: boolean;
    stroke: string;
    size: number;
  };
  label: {
    show: boolean;
    fill: string;
    fontSize: number;
    fontFamily: string;
    format?: (value: any, index: number) => any;
  };
}

export class RadialAxisTickSeries extends Component<
  RadialAxisTickSeriesProps,
  {}
> {
  render() {
    const { scale, count, outerRadius, line, label } = this.props;
    const ticks = scale.ticks(count);

    return (
      <g>
        {ticks.map((tick, i) => (
          <RadialAxisTick
            key={i}
            index={i}
            scale={scale}
            tick={tick}
            line={line}
            label={label}
            outerRadius={outerRadius}
          />
        ))}
      </g>
    );
  }
}
