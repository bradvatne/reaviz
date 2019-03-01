import React, { Component } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedBarSeries } from './BarSeries';

interface StackedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export class StackedBarChart extends Component<StackedBarChartProps, {}> {
  static defaultProps: Partial<StackedBarChartProps> = {
    series: <StackedBarSeries />
  };

  render() {
    return <BarChart {...this.props} />;
  }
}
