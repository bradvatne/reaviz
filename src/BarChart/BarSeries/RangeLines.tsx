import React, { Component } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { PosedRangeLine } from './PosedRangeLines';

export interface RangeLinesProps {
  height: number;
  width: number;
  x: number;
  y: number;
  index: number;
  strokeWidth: number;
  yScale: any;
  type: 'top' | 'bottom';
  data: ChartInternalShallowDataShape;
  color: string;
  barCount: number;
  animated: boolean;
}

export class RangeLines extends Component<RangeLinesProps> {
  static defaultProps: Partial<RangeLinesProps> = {
    type: 'top',
    strokeWidth: 1
  };

  getEnter(rangeLineHeight: number) {
    const { x, y, height, type } = this.props;

    let newY;
    if (type !== 'bottom') {
      newY = y;
    } else {
      newY = y + height - rangeLineHeight;
    }

    return {
      x,
      y: newY
    };
  }

  getExit(rangeLineHeight: number) {
    const { x, yScale, height, type } = this.props;

    let y;
    const maxY = Math.max(...yScale.range());
    if (type !== 'bottom') {
      y = maxY;
    } else {
      y = maxY + height - rangeLineHeight;
    }

    return {
      y,
      x
    };
  }

  getLineHeight() {
    return Math.min(this.props.strokeWidth, this.props.height);
  }

  render() {
    const { color, data, width, animated, index, barCount } = this.props;
    const rangeLineHeight = this.getLineHeight();
    const enterProps = this.getEnter(rangeLineHeight);
    const exitProps = this.getExit(rangeLineHeight);

    return (
      <PosedRangeLine
        pose="enter"
        poseKey={data}
        fill={color}
        enterProps={enterProps}
        exitProps={exitProps}
        height={rangeLineHeight}
        barCount={barCount}
        width={width}
        index={index}
        animated={animated}
      />
    );
  }
}
