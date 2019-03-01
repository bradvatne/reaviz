import React, { Component } from 'react';
import * as css from './GridStripe.module.scss';

export interface GridStripeProps {
  height: number;
  width: number;
  position: 'horizontal' | 'vertical';
  direction: 'all' | 'x' | 'y';
  scale: any;
  fill: string;
  data: number;
  index: number;
}

export class GridStripe extends Component<GridStripeProps, {}> {
  static defaultProps: Partial<GridStripeProps> = {
    fill: '#2a3138'
  };

  getCoords() {
    const { position, data, height, width, scale, fill, index } = this.props;
    const pos = scale(data);
    const stripeFill = index % 2 ? 'none' : fill;
    const dim = scale.bandwidth();

    if (position === 'vertical') {
      return {
        y: 0,
        x: pos,
        height: height,
        width: dim,
        fill: stripeFill
      };
    } else {
      return {
        y: pos,
        x: 0,
        height: dim,
        width,
        fill: stripeFill
      };
    }
  }

  render() {
    const coords = this.getCoords();
    return <rect className={css.gridStripe} {...coords} />;
  }
}
