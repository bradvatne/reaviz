import React, { Component } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '../common/data';
import { MarimekkoBarSeries } from './BarSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';

interface MarimekkoChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export class MarimekkoChart extends Component<MarimekkoChartProps, {}> {
  static defaultProps: Partial<MarimekkoChartProps> = {
    series: <MarimekkoBarSeries />,
    xAxis: (
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries tickSize={15} />}
      />
    ),
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
