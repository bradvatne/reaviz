import React, { Component } from 'react';
import { formatValue } from '../../../common/utils/formatting';
import { PosedArcLabelGroup } from './PosedArcLabelGroup';

export interface PieArcLabelProps {
  data: any;
  innerArc: any;
  outerArc: any;
  outerRadius: number;
  show: boolean;
  format?: (v) => any;
  fontFill: string;
  fontSize: number;
  fontFamily: string;
  lineStroke: string;
  padding: string;
}

const mid = ({ startAngle, endAngle }) =>
  Math.PI > startAngle + (endAngle - startAngle) / 2;

export class PieArcLabel extends Component<PieArcLabelProps, {}> {
  static defaultProps: Partial<PieArcLabelProps> = {
    show: false,
    format: undefined,
    lineStroke: 'rgba(127,127,127,0.5)',
    fontFill: '#8F979F',
    fontSize: 11,
    fontFamily: 'sans-serif',
    padding: '.35em'
  };

  render() {
    const {
      outerArc,
      innerArc,
      outerRadius,
      data,
      lineStroke,
      padding,
      fontSize,
      fontFill,
      format,
      fontFamily
    } = this.props;
    const text = format ? format(data.data) : formatValue(data.data.key);
    const midPoint = mid(data);
    const textAnchor = midPoint ? 'start' : 'end';
    const linePosition = outerArc.centroid(data);
    const textPosition = midPoint
      ? `${linePosition[0] + outerRadius * 0.5},${linePosition[1]}`
      : `${linePosition[0] - outerRadius * 0.5},${linePosition[1]}`;

    return (
      <PosedArcLabelGroup>
        <text
          dy={padding}
          fill={fontFill}
          fontSize={fontSize}
          fontFamily={fontFamily}
          transform={`translate(${textPosition})`}
          textAnchor={textAnchor}
          style={{ shapeRendering: 'crispEdges' }}
        >
          {text}
        </text>
        <polyline
          fill="none"
          stroke={lineStroke}
          points={`${innerArc.centroid(data)},${linePosition},${textPosition}`}
        />
      </PosedArcLabelGroup>
    );
  }
}
