import React, { Component } from 'react';

interface RadialAxisArcProps {
  width: number;
  padding: number;
  minRadius: number;
  count: number;
  index: number;
  stroke: ((index: number) => string) | string;
  strokeDasharray: ((index: number) => string) | string;
}

export class RadialAxisArc extends Component<RadialAxisArcProps, {}> {
  getInnerRadius(index: number) {
    const { minRadius, count, padding, width } = this.props;
    return minRadius + (count - (index + 1)) * (width + padding);
  }

  getOuterRadius(index: number) {
    const { width } = this.props;
    return this.getInnerRadius(index) + width;
  }

  render() {
    const { padding, index, stroke, strokeDasharray } = this.props;
    const r = this.getOuterRadius(index) + padding;
    const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
    const strokeDash =
      typeof strokeDasharray === 'string'
        ? strokeDasharray
        : strokeDasharray(index);

    return (
      <circle
        fill="none"
        strokeDasharray={strokeDash}
        stroke={strokeColor}
        cx="0"
        cy="0"
        r={r}
      />
    );
  }
}
