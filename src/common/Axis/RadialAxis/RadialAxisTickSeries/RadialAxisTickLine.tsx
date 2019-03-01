import React, { Component } from 'react';

interface RadialAxisTickLineProps {
  size: number;
  stroke: string;
}

export class RadialAxisTickLine extends Component<RadialAxisTickLineProps, {}> {
  render() {
    const { stroke, size } = this.props;

    return <line x2={0} x1={size} stroke={stroke} />;
  }
}
