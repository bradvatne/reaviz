import React, { Component } from 'react';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import { ChartDataShape } from '../common/data';
import classNames from 'classnames';
import { pie } from 'd3-shape';
import { memoize } from 'lodash-es';
import { PieArcSeries, PieArcSeriesProps } from './PieArcSeries';
import { CloneElement } from '../common/utils/children';

interface PieChartProps extends ChartProps {
  data: ChartDataShape[];
  disabled?: boolean;
  series: JSX.Element;
}

export class PieChart extends Component<PieChartProps, {}> {
  static defaultProps: PieChartProps = {
    disabled: false,
    data: [],
    margins: 10,
    series: (
      <PieArcSeries
        animated={true}
        doughnut={false}
        innerRadius={0}
        arcWidth={0.25}
      />
    )
  };

  getData = memoize((data: ChartDataShape[]) => {
    const pieLayout = pie()
      .value((d: any) => d.data)
      .sort(null);

    return pieLayout(data as any);
  });

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartWidth, chartHeight } = containerProps;
    const { series } = this.props;
    const data = this.getData(this.props.data);

    return (
      <CloneElement<PieArcSeriesProps>
        element={series}
        data={data}
        height={chartHeight}
        width={chartWidth}
      />
    );
  }

  render() {
    const { id, width, height, margins, className } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={false}
        yAxisVisible={false}
        center={true}
        className={classNames(className)}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
