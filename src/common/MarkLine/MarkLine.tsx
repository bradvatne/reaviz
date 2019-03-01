import React, { Component } from 'react';
import * as css from './MarkLine.module.scss';

export interface MarkLineProps {
  height: number;
  pointX?: number;
  strokeColor: string;
  strokeWidth: number;
}

export class MarkLine extends Component<MarkLineProps, {}> {
  static defaultProps: Partial<MarkLineProps> = {
    strokeWidth: 1,
    strokeColor: '#eee'
  };

  render() {
    const { pointX, height, strokeColor, strokeWidth } = this.props;

    return (
      <line
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        y1="0"
        vectorEffect="non-scaling-stroke"
        y2={height}
        x1={pointX}
        x2={pointX}
        className={css.markLine}
      />
    );
  }
}
