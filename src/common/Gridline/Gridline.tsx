import React, { Component } from 'react';
import * as css from './Gridline.module.scss';

export interface GridlineProps {
  height: number;
  width: number;
  direction: 'all' | 'x' | 'y';
  scale: any;
  strokeWidth: number;
  strokeColor: string;
  data: number;
  index: number;
}

export class Gridline extends Component<GridlineProps, {}> {
  static defaultProps: Partial<GridlineProps> = {
    strokeWidth: 1,
    direction: 'all',
    strokeColor: 'rgba(153, 153, 153, 0.5)'
  };

  getCoords() {
    const {
      direction,
      data,
      height,
      width,
      scale,
      strokeWidth,
      strokeColor
    } = this.props;
    const pos = scale(data);

    if (direction === 'x') {
      return {
        x1: pos,
        x2: pos,
        y1: 0,
        y2: height,
        fill: 'none',
        stroke: strokeColor,
        strokeWidth
      };
    } else {
      return {
        y1: pos,
        y2: pos,
        x1: 0,
        x2: width,
        fill: 'none',
        stroke: strokeColor,
        strokeWidth
      };
    }
  }

  render() {
    const coords = this.getCoords();
    return <line className={css.gridLine} {...coords} />;
  }
}
