import React, { Fragment, Component } from 'react';
import { Gridline, GridlineProps } from './Gridline';
import { getTicks } from '../utils/ticks';
import { CloneElement } from '../utils/children';
import { LinearAxisProps } from '../Axis';
import { GridStripeProps } from './GridStripe';

export interface GridlineSeriesProps {
  yScale: any;
  xScale: any;
  yAxis: LinearAxisProps;
  xAxis: LinearAxisProps;
  height: number;
  width: number;
  line: JSX.Element | null;
  stripe: JSX.Element | null;
}

export class GridlineSeries extends Component<GridlineSeriesProps, {}> {
  static defaultProps: Partial<GridlineSeriesProps> = {
    line: <Gridline />,
    stripe: null
  };

  getGridlines() {
    const { yScale, xScale, yAxis, xAxis, height, width } = this.props;

    return {
      yAxisGrid: getTicks(
        yScale,
        yAxis.tickSeries.props.tickSize,
        yAxis.tickSeries.props.tickValues,
        height,
        yAxis.tickSeries.props.interval
      ),
      xAxisGrid: getTicks(
        xScale,
        xAxis.tickSeries.props.tickSize,
        xAxis.tickSeries.props.tickValues,
        width,
        xAxis.tickSeries.props.interval
      )
    };
  }

  renderSeries(
    yAxisGrid,
    xAxisGrid,
    element: JSX.Element,
    type: 'line' | 'stripe'
  ) {
    const { xScale, yScale } = this.props;

    return (
      <Fragment>
        {this.shouldRenderY(element.props.direction) &&
          this.renderGroup(element, yAxisGrid, yScale, 'y', type)}
        {this.shouldRenderX(element.props.direction) &&
          this.renderGroup(element, xAxisGrid, xScale, 'x', type)}
      </Fragment>
    );
  }

  shouldRenderY(direction: 'all' | 'x' | 'y') {
    return direction === 'all' || direction === 'y';
  }

  shouldRenderX(direction: 'all' | 'x' | 'y') {
    return direction === 'all' || direction === 'x';
  }

  renderGroup(
    element: JSX.Element,
    grid,
    scale,
    direction: 'x' | 'y',
    type: 'line' | 'stripe'
  ) {
    const { height, width } = this.props;

    return grid.map((point, index) => (
      <CloneElement<GridlineProps | GridStripeProps>
        element={element}
        index={index}
        key={`${type}-${direction}-${index}`}
        scale={scale}
        data={point}
        height={height}
        width={width}
        direction={direction}
      />
    ));
  }

  render() {
    const { line, stripe } = this.props;
    const { yAxisGrid, xAxisGrid } = this.getGridlines();

    return (
      <g style={{ pointerEvents: 'none' }}>
        {line && this.renderSeries(yAxisGrid, xAxisGrid, line, 'line')}
        {stripe && this.renderSeries(yAxisGrid, xAxisGrid, stripe, 'stripe')}
      </g>
    );
  }
}
