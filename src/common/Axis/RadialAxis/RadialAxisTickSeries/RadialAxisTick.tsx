import React, { Component } from 'react';
import { RadialAxisTickLine } from './RadialAxisTickLine';
import { RadialAxisTickLabel } from './RadialAxisTickLabel';

interface RadialAxisTickProps {
  scale: any;
  outerRadius: number;
  tick: any;
  index: number;
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

export class RadialAxisTick extends Component<RadialAxisTickProps, {}> {
  render() {
    const { line, label, scale, outerRadius, tick, index } = this.props;
    const rotation = (scale(tick) * 180) / Math.PI - 90;
    const transform = `rotate(${rotation}) translate(${outerRadius + 25},0)`;

    return (
      <g transform={transform}>
        {line.show && (
          <RadialAxisTickLine size={line.size} stroke={line.stroke} />
        )}
        {label.show && (
          <RadialAxisTickLabel
            {...label}
            index={index}
            rotation={rotation}
            lineSize={line.size}
            tick={tick}
          />
        )}
      </g>
    );
  }
}
