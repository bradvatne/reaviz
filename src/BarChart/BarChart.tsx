import React, { Fragment } from 'react';
import classNames from 'classnames';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxis
} from '../common/Axis';
import { BarSeries, BarSeriesProps } from './BarSeries';
import {
  ChartDataShape,
  ChartNestedDataShape,
  buildChartData,
  isMultiSeries,
  buildBins,
  buildBarStackData,
  buildMarimekkoData
} from '../common/data';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  getXScale,
  getYScale,
  getGroupScale,
  getInnerScale,
  getMarimekkoScale,
  getMarimekkoGroupScale
} from '../common/scales';
import { ChartBrush, ChartBrushProps } from '../common/Brush';
import * as css from './BarChart.module.scss';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers/ChartContainer';
import bind from 'memoize-bind';
import { CloneElement } from '../common/utils/children';

export interface BarChartProps extends ChartProps {
  data: ChartDataShape[];
  series: JSX.Element;
  yAxis: JSX.Element;
  xAxis: JSX.Element;
  gridlines: JSX.Element | null;
  brush: JSX.Element;
  zoomPan: JSX.Element;
}

export class BarChart extends React.Component<BarChartProps, {}> {
  static defaultProps: Partial<BarChartProps> = {
    data: [],
    xAxis: (
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries tickSize={20} />}
      />
    ),
    yAxis: <LinearYAxis type="value" />,
    series: <BarSeries />,
    gridlines: <GridlineSeries />,
    brush: <ChartBrush disabled={true} />
  };

  getScalesAndData(chartHeight: number, chartWidth: number) {
    const { yAxis, xAxis, series } = this.props;
    const seriesType = series.props.type;

    let data;
    if (seriesType === 'stacked' || seriesType === 'stackedNormalized') {
      data = buildBarStackData(
        this.props.data as ChartNestedDataShape[],
        seriesType === 'stackedNormalized'
      );
    } else if (seriesType === 'marimekko') {
      data = buildMarimekkoData(this.props.data as ChartNestedDataShape[]);
    } else {
      data = buildChartData(this.props.data);
    }

    const isMulti = isMultiSeries(data);
    const xAxisType = xAxis.props.type;

    let xScale;
    let xScale1;
    if (seriesType === 'standard' && isMulti) {
      xScale = getGroupScale({
        height: chartHeight,
        width: chartWidth,
        padding: series.props.groupPadding,
        data
      });

      xScale1 = getInnerScale({
        groupScale: xScale,
        padding: series.props.padding,
        data
      });
    } else if (seriesType === 'marimekko') {
      xScale1 = getMarimekkoScale(chartWidth, xAxis.props.roundDomains);

      xScale = getMarimekkoGroupScale({
        width: chartWidth,
        padding: series.props.padding,
        data,
        valueScale: xScale1
      });
    } else {
      xScale = getXScale({
        width: chartWidth,
        type: xAxisType,
        roundDomains: xAxis.props.roundDomains,
        data,
        padding: series.props.padding,
        domain: xAxis.props.domain
      });

      if (xAxisType === 'time' || xAxisType === 'value') {
        data = buildBins(
          xScale,
          series.props.binThreshold || xAxis.props.interval,
          data
        );
      }
    }

    const yScale = getYScale({
      roundDomains: yAxis.props.roundDomains,
      type: yAxis.props.type,
      height: chartHeight,
      data,
      domain: yAxis.props.domain
    });

    return { xScale, xScale1, yScale, data };
  }

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartHeight, chartWidth, id, updateAxes } = containerProps;
    const { series, xAxis, yAxis, brush, gridlines } = this.props;
    const { xScale, xScale1, yScale, data } = this.getScalesAndData(
      chartHeight,
      chartWidth
    );

    return (
      <Fragment>
        {containerProps.chartSized && gridlines && (
          <CloneElement<GridlineSeriesProps>
            element={gridlines}
            height={chartHeight}
            width={chartWidth}
            yScale={yScale}
            xScale={xScale}
            yAxis={yAxis.props}
            xAxis={xAxis.props}
          />
        )}
        <CloneElement<LinearAxisProps>
          element={xAxis}
          height={chartHeight}
          width={chartWidth}
          scale={xScale}
          onDimensionsChange={bind(updateAxes, this, 'horizontal')}
        />
        <CloneElement<LinearAxisProps>
          element={yAxis}
          height={chartHeight}
          width={chartWidth}
          scale={yScale}
          onDimensionsChange={bind(updateAxes, this, 'vertical')}
        />
        {containerProps.chartSized && (
          <CloneElement<ChartBrushProps>
            element={brush}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
          >
            <CloneElement<BarSeriesProps>
              element={series}
              id={`bar-series-${id}`}
              data={data}
              isCategorical={xAxis.props.type === 'category'}
              xScale={xScale}
              xScale1={xScale1}
              yScale={yScale}
            />
          </CloneElement>
        )}
      </Fragment>
    );
  }

  render() {
    const {
      id,
      width,
      height,
      margins,
      className,
      series,
      xAxis,
      yAxis
    } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={isAxisVisible(xAxis.props)}
        yAxisVisible={isAxisVisible(yAxis.props)}
        className={classNames(css.barChart, className, css[series.props.type])}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
