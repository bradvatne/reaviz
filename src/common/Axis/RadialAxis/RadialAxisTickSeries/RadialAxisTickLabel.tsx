import React, { Component } from 'react';
import { formatValue } from '../../../utils/formatting';

interface RadialAxisTickLabelProps {
  tick: any;
  lineSize: number;
  rotation: number;
  fill: string;
  fontSize: number;
  fontFamily: string;
  index: number;
  format?: (value: any, index: number) => any;
}

export class RadialAxisTickLabel extends Component<
  RadialAxisTickLabelProps,
  {}
> {
  render() {
    const {
      tick,
      fill,
      fontFamily,
      fontSize,
      format,
      lineSize,
      rotation,
      index
    } = this.props;
    const text = format ? format(tick, index) : formatValue(tick);
    const shouldRotate = rotation > 100 && rotation;
    const rotate = shouldRotate ? 180 : 0;
    const translate = shouldRotate ? -30 : 0;
    const textAnchor = shouldRotate ? 'end' : 'start';

    return (
      <g transform={`rotate(${rotate}) translate(${translate})`}>
        <title>{text}</title>
        <text
          dy="0.35em"
          x={lineSize + 5}
          textAnchor={textAnchor}
          fill={fill}
          fontFamily={fontFamily}
          fontSize={fontSize}
        >
          {text}
        </text>
      </g>
    );
  }
}
