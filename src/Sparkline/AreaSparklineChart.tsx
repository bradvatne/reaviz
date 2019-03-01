import React, { Component } from 'react';
import {
  AreaChart,
  AreaChartProps,
  AreaSeries,
  Area,
  Line
} from '../AreaChart';
import { ChartShallowDataShape } from '../common/data';
import { CircleSeries } from '../common/CircleSeries';
import {
  LinearYAxisTickSeries,
  LinearYAxis,
  LinearXAxis,
  LinearXAxisTickSeries
} from '../common/Axis/LinearAxis';

export interface AreaSparklineChartProps extends AreaChartProps {
  data: ChartShallowDataShape[];
}

export class AreaSparklineChart extends Component<AreaSparklineChartProps, {}> {
  static defaultProps: Partial<AreaSparklineChartProps> = {
    gridlines: null,
    series: (
      <AreaSeries
        symbols={<CircleSeries show="hover" />}
        interpolation="smooth"
        markLine={null}
        area={
          <Area
            pattern={true}
            gradient={[
              { offset: '10%', stopOpacity: 0 },
              { offset: '80%', stopOpacity: 1 }
            ]}
          />
        }
        line={<Line strokeWidth={3} />}
      />
    ),
    yAxis: (
      <LinearYAxis
        type="value"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    ),
    xAxis: (
      <LinearXAxis
        type="time"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    )
  };

  render() {
    return <AreaChart {...this.props} />;
  }
}
