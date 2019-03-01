import React, { Component } from 'react';
import bind from 'memoize-bind';
import { ChartInternalShallowDataShape } from '../data';
import { PosedCircle } from './PosedCircle';

export interface CircleProps {
  size: number;
  point: ChartInternalShallowDataShape;
  fill: string;
  cursor: string;
  yScale: any;
  xScale: any;
  visible: boolean;
  animated: boolean;
  onClick: (event) => void;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
}

export class Circle extends Component<CircleProps> {
  static defaultProps: Partial<CircleProps> = {
    size: 4,
    cursor: 'auto',
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  onClick(event: MouseEvent) {
    const { onClick, point } = this.props;
    onClick({
      value: point,
      nativeEvent: event
    });
  }

  onMouseEnter(event: MouseEvent) {
    const { onMouseEnter, point } = this.props;
    onMouseEnter({
      value: point,
      nativeEvent: event
    });
  }

  onMouseLeave(event: MouseEvent) {
    const { onMouseLeave, point } = this.props;
    onMouseLeave({
      value: point,
      nativeEvent: event
    });
  }

  getCircleEnter() {
    const { yScale, xScale, size, point } = this.props;
    return {
      cy: yScale(point.y1),
      cx: xScale(point.x),
      r: size
    };
  }

  getCircleExit() {
    const { yScale, xScale, point, animated } = this.props;

    let cy;
    if (animated) {
      cy = Math.max(...yScale.range());
    } else {
      cy = yScale(point.y1);
    }

    return {
      cy,
      cx: xScale(point.x)
    };
  }

  render() {
    const { fill, cursor, visible, animated, size } = this.props;
    const opacity = visible ? 1 : 0;
    const enterProps = this.getCircleEnter();
    const exitProps = this.getCircleExit();

    return (
      <PosedCircle
        className="symbol"
        pose="enter"
        poseKey={`${enterProps.cy}-${enterProps.cx}`}
        enterProps={enterProps}
        exitProps={exitProps}
        animated={animated}
        onClick={bind(this.onClick, this)}
        onMouseEnter={bind(this.onMouseEnter, this)}
        onMouseLeave={bind(this.onMouseLeave, this)}
        cursor={cursor}
        size={size}
        style={{ opacity }}
        pointerEvents="auto"
        fill={fill}
      />
    );
  }
}
