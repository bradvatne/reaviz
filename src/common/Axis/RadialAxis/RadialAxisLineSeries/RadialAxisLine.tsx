import React, { Component } from 'react';

export const degrees = (radians: number) => (radians / Math.PI) * 180 - 90;

interface RadialAxisLineProps {
  index: number;
  radius: any;
  angle: any;
  stroke: ((index: number) => string) | string;
}

export class RadialAxisLine extends Component<RadialAxisLineProps, {}> {
  static defaultProps = {
    style: () => {}
  };

  render() {
    const { index, angle, radius, stroke } = this.props;
    const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
    const rotation = degrees(angle(index));
    const [x1, x2] = radius.range();

    return (
      <line
        stroke={strokeColor}
        transform={`rotate(${rotation})`}
        x1={x1}
        x2={x2}
      />
    );
  }
}
