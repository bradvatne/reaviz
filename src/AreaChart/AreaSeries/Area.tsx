import React, { Fragment, Component } from 'react';
import { area } from 'd3-shape';
import { Gradient, Stripes, Mask } from '../../common/Styles';
import {
  interpolate,
  InterpolationTypes
} from '../../common/utils/interpolation';
import {
  ChartInternalDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { PosedArea } from './PosedArea';

export interface AreaProps {
  id: string;
  data: ChartInternalDataShape[];
  width: number;
  interpolation: InterpolationTypes;
  color: any;
  yScale: any;
  xScale: any;
  index: number;
  pattern?: boolean;
  animated: boolean;
  gradient?:
    | boolean
    | Array<{
        offset: number | string;
        stopOpacity: number;
      }>;
}

export class Area extends Component<AreaProps, {}> {
  static defaultProps: Partial<AreaProps> = {
    gradient: true,
    pattern: false,
    interpolation: 'linear'
  };

  getAreaPath(data: ChartInternalShallowDataShape[]) {
    const { interpolation } = this.props;

    const fn = area()
      .x((d: any) => d.x)
      .y0((d: any) => d.y0)
      .y1((d: any) => d.y1)
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

  getAreaEnter(coords: ChartInternalShallowDataShape[]) {
    const areaPath = this.getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }

  getAreaExit() {
    const { yScale, data, xScale } = this.props;
    const maxY = Math.max(...yScale.range());
    const coords = data.map((item: any) => ({
      x: xScale(item.x),
      x1: 0,
      y: 0,
      y1: maxY,
      y0: maxY
    })) as ChartInternalShallowDataShape[];

    const areaPath = this.getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }

  getGradientOffsets() {
    const { gradient } = this.props;

    return Array.isArray(gradient) ? gradient : undefined;
  }

  getFill() {
    const { pattern, id, gradient } = this.props;

    if (pattern) {
      return `url(#stripes-${id})`;
    } else {
      if (gradient) {
        return `url(#gradient-${id})`;
      }

      return '';
    }
  }

  renderArea(coords: ChartInternalShallowDataShape[]) {
    const { pattern, index, id, animated } = this.props;
    const fill = this.getFill();
    const mask = pattern ? `url(#mask-${id})` : '';
    const enterProps = this.getAreaEnter(coords);
    const exitProps = this.getAreaExit();

    return (
      <PosedArea
        pose="enter"
        poseKey={enterProps.d}
        animated={animated}
        pointerEvents="none"
        mask={mask}
        index={index}
        fill={fill}
        enterProps={enterProps}
        exitProps={exitProps}
      />
    );
  }

  render() {
    const { id, gradient, pattern, data, color, index } = this.props;
    const gradientOffsets = this.getGradientOffsets();
    const coords = this.getCoords();
    const stroke = color(data, index);

    return (
      <Fragment>
        {this.renderArea(coords)}
        {gradient && !pattern && (
          <Gradient
            id={`gradient-${id}`}
            color={stroke}
            offsets={gradientOffsets}
          />
        )}
        {pattern && (
          <Fragment>
            <Mask id={`mask-${id}`} fill={`url(#gradient-${id})`} />
            <Gradient
              id={`gradient-${id}`}
              color={stroke}
              offsets={gradientOffsets}
            />
            <Stripes id={`stripes-${id}`} fill={stroke} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
