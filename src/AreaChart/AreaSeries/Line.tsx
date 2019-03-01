import React, { createRef, Fragment } from 'react';
import { line } from 'd3-shape';
import {
  interpolate,
  InterpolationTypes
} from '../../common/utils/interpolation';
import {
  ChartInternalDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { calculateShowStroke } from '../../common/utils/stroke';
import { PosedLine } from './PosedLine';

export interface LineProps {
  data: ChartInternalDataShape[];
  width: number;
  color: any;
  yScale: any;
  xScale: any;
  index: number;
  strokeWidth: number;
  showZeroStroke: boolean;
  interpolation: InterpolationTypes;
  animated: boolean;
  hasArea: boolean;
}

export class Line extends React.Component<LineProps, {}> {
  static defaultProps: Partial<LineProps> = {
    showZeroStroke: true,
    strokeWidth: 0
  };

  ghostPathRef = createRef<SVGPathElement>();

  getLinePath(data: ChartInternalShallowDataShape[]) {
    const { showZeroStroke, interpolation } = this.props;

    const fn = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y1)
      .defined((d: any) => showZeroStroke || calculateShowStroke(d, data))
      .curve(interpolate(interpolation));

    return fn(data as any);
  }

  getCoords() {
    const { data, xScale, yScale } = this.props;

    return data.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  }

  getLineEnter(coords: ChartInternalShallowDataShape[]) {
    const linePath = this.getLinePath(coords);

    return {
      d: linePath === null ? undefined : linePath
    };
  }

  getLineExit() {
    const { hasArea, yScale, xScale, data } = this.props;

    let coords;
    if (hasArea) {
      const maxY = Math.max(...yScale.range());
      coords = data.map((item: any) => ({
        x: xScale(item.x),
        x1: 0,
        y: maxY,
        y1: maxY,
        y0: maxY
      })) as ChartInternalShallowDataShape[];
    } else {
      coords = this.getCoords();
    }

    const linePath = this.getLinePath(coords);

    return {
      d: linePath === null ? undefined : linePath
    };
  }

  render() {
    const { data, color, index, animated, strokeWidth, hasArea } = this.props;
    const coords = this.getCoords();
    const stroke = color(data, index);
    const enterProps = this.getLineEnter(coords);
    const exitProps = this.getLineExit();

    return (
      <Fragment>
        <PosedLine
          pose="enter"
          poseKey={enterProps.d}
          pointerEvents="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          enterProps={enterProps}
          exitProps={exitProps}
          index={index}
          areaShown={hasArea}
          ghostPathRef={this.ghostPathRef}
          animated={animated}
        />
        <path
          opacity="0"
          d={enterProps.d}
          ref={this.ghostPathRef}
          pointerEvents="none"
        />
      </Fragment>
    );
  }
}
