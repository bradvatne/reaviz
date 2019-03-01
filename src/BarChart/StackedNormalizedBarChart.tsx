import React, { Component } from 'react';
import { ChartNestedDataShape } from '../common/data';
import { BarChartProps, BarChart } from './BarChart';
import { StackedNormalizedBarSeries } from './BarSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';

interface StackedNormalizedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export class StackedNormalizedBarChart extends Component<
  StackedNormalizedBarChartProps,
  {}
> {
  static defaultProps: Partial<StackedNormalizedBarChartProps> = {
    series: <StackedNormalizedBarSeries />,
    yAxis: (
      <LinearYAxis
        type="value"
        tickSeries={
          <LinearYAxisTickSeries
            label={
              <LinearYAxisTickLabel
                rotation={false}
                format={data => `${data * 100}%`}
              />
            }
          />
        }
      />
    )
  };

  render() {
    return <BarChart {...this.props} />;
  }
}
