import React, { Component } from 'react';
import {
  AreaChart,
  AreaChartProps,
  AreaSeries,
  Line,
  AreaSeriesProps
} from '../AreaChart';
import { ChartDataShape } from '../common/data';

export interface LineChartProps extends AreaChartProps {
  data: ChartDataShape[];
}

export class LineSeries extends Component<AreaSeriesProps, {}> {
  static defaultProps: Partial<AreaSeriesProps> = {
    ...AreaSeries.defaultProps,
    area: null,
    line: <Line strokeWidth={3} />
  };

  render() {
    return <AreaSeries {...this.props} />;
  }
}

export class LineChart extends Component<LineChartProps, {}> {
  static defaultProps: Partial<LineChartProps> = {
    ...AreaChart.defaultProps,
    series: <LineSeries />
  };

  render() {
    return <AreaChart {...this.props} />;
  }
}
