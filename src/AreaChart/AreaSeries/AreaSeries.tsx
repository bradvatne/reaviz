import React, { Fragment, Component } from 'react';
import { CircleSeries, CircleSeriesProps } from '../../common/CircleSeries';
import { Area, AreaProps } from './Area';
import { MarkLine, MarkLineProps } from '../../common/MarkLine';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape,
  isMultiSeries
} from '../../common/data';
import { PoseGroup } from 'react-pose';
import { PoseSVGGElement } from '../../common/utils/animations';
import { CloneElement } from '../../common/utils/children';
import {
  TooltipArea,
  TooltipAreaProps,
  TooltipAreaEvent
} from '../../common/TooltipArea';
import { Line, LineProps } from './Line';
import { InterpolationTypes } from '../../common/utils/interpolation';
import { getColor, sequentialScheme } from '../../common/utils/color';
import * as bind from 'memoize-bind';

export type AreaChartTypes = 'standard' | 'stacked' | 'stackedNormalized';

export interface AreaSeriesProps {
  id: string;
  xScale: any;
  yScale: any;
  data: ChartInternalDataShape[];
  height: number;
  width: number;
  animated: boolean;
  type: AreaChartTypes;
  interpolation: InterpolationTypes;
  tooltip: JSX.Element;
  markLine: JSX.Element | null;
  symbols: JSX.Element | null;
  line: JSX.Element | null;
  area: JSX.Element | null;
  colorScheme: ((data, index: number, activeValues?) => string) | string[];
  isZoomed: boolean;
}

interface AreaSeriesState {
  activeValues?: any;
  activePoint?: number;
}

// For area charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export class AreaSeries extends Component<AreaSeriesProps, AreaSeriesState> {
  static defaultProps: Partial<AreaSeriesProps> = {
    colorScheme: [...sequentialScheme],
    animated: true,
    interpolation: 'linear',
    type: 'standard',
    line: <Line />,
    area: <Area />,
    markLine: <MarkLine />,
    tooltip: <TooltipArea />,
    symbols: <CircleSeries />
  };

  state: AreaSeriesState = {};

  getColor(point, index) {
    const { colorScheme, data } = this.props;
    const { activeValues } = this.state;

    return Array.isArray(colorScheme)
      ? getColor(colorScheme, data)(index)
      : colorScheme(point, index, activeValues);
  }

  onValueEnter(event: TooltipAreaEvent) {
    this.setState({
      activePoint: event.pointX,
      activeValues: event.value
    });
  }

  onValueLeave() {
    this.setState({
      activePoint: undefined,
      activeValues: undefined
    });
  }

  renderArea(data: ChartInternalShallowDataShape[], index = 0) {
    const {
      id,
      width,
      xScale,
      yScale,
      area,
      line,
      interpolation,
      animated
    } = this.props;

    return (
      <Fragment>
        {line && (
          <CloneElement<LineProps>
            element={line}
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            index={index}
            hasArea={area !== null}
            animated={animated}
            interpolation={interpolation}
            color={this.getColor.bind(this)}
          />
        )}
        {area && (
          <CloneElement<AreaProps>
            element={area}
            id={`${id}-area-${index}`}
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            index={index}
            animated={animated}
            interpolation={interpolation}
            color={this.getColor.bind(this)}
          />
        )}
      </Fragment>
    );
  }

  renderSymbols(data: ChartInternalShallowDataShape[], index = 0) {
    const { xScale, yScale, animated, area, symbols } = this.props;
    const { activeValues } = this.state;

    // Animations are only valid for Area
    const isAnimated = area !== undefined && animated;
    const visible = symbols !== null;
    const activeSymbols =
      (symbols && symbols.props.activeValues) || activeValues;

    return (
      <Fragment>
        {visible && (
          <CloneElement<CircleSeriesProps>
            element={symbols}
            activeValues={activeSymbols}
            xScale={xScale}
            yScale={yScale}
            index={index}
            data={data}
            animated={isAnimated}
            color={this.getColor.bind(this)}
          />
        )}
      </Fragment>
    );
  }

  renderMarkLine() {
    const { height, markLine } = this.props;
    const { activePoint, activeValues } = this.state;

    return (
      <Fragment>
        {activeValues && markLine && (
          <CloneElement<MarkLineProps>
            element={markLine}
            height={height}
            pointX={activePoint}
          />
        )}
      </Fragment>
    );
  }

  renderSingleSeries(data: ChartInternalShallowDataShape[]) {
    const { animated } = this.props;

    return (
      <PoseGroup animateOnMount={animated}>
        <PoseSVGGElement key="group">
          {this.renderArea(data)}
          {this.renderMarkLine()}
          {this.renderSymbols(data)}
        </PoseSVGGElement>
      </PoseGroup>
    );
  }

  renderMultiSeries(data: ChartInternalNestedDataShape[]) {
    const { animated } = this.props;

    return (
      <Fragment>
        <PoseGroup animateOnMount={animated}>
          {data
            .map((point, index) => (
              <PoseSVGGElement key={`${point.key!.toString()}`}>
                {this.renderArea(point.data, index)}
              </PoseSVGGElement>
            ))
            .reverse()}
        </PoseGroup>
        {this.renderMarkLine()}
        <PoseGroup animateOnMount={animated}>
          {data
            .map((point, index) => (
              <PoseSVGGElement key={`${point.key!.toString()}`}>
                {this.renderSymbols(point.data, index)}
              </PoseSVGGElement>
            ))
            .reverse()}
        </PoseGroup>
      </Fragment>
    );
  }

  render() {
    const {
      data,
      height,
      id,
      width,
      isZoomed,
      tooltip,
      xScale,
      yScale
    } = this.props;
    const isMulti = isMultiSeries(data);

    return (
      <Fragment>
        <defs>
          <clipPath id={`${id}-path`}>
            <rect
              width={isZoomed ? width : width + PADDING}
              height={height + PADDING}
              x={isZoomed ? 0 : -HALF_PADDING}
              y={-HALF_PADDING}
            />
          </clipPath>
        </defs>
        <CloneElement<TooltipAreaProps>
          element={tooltip}
          xScale={xScale}
          yScale={yScale}
          data={data}
          height={height}
          width={width}
          color={this.getColor.bind(this)}
          onValueEnter={bind(this.onValueEnter, this)}
          onValueLeave={bind(this.onValueLeave, this)}
        >
          <g clipPath={`url(#${id}-path)`}>
            {isMulti &&
              this.renderMultiSeries(data as ChartInternalNestedDataShape[])}
            {!isMulti &&
              this.renderSingleSeries(data as ChartInternalShallowDataShape[])}
          </g>
        </CloneElement>
      </Fragment>
    );
  }
}
