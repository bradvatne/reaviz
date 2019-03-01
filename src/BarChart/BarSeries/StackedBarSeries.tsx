import React, { Component } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';

export class StackedBarSeries extends Component<BarSeriesProps, {}> {
  static defaultProps: Partial<BarSeriesProps> = {
    ...BarSeries.defaultProps,
    type: 'stacked',
    bar: (
      <Bar
        rounded={false}
        gradient={[
          { offset: '5%', stopOpacity: 0.1 },
          { offset: '90%', stopOpacity: 0.7 }
        ]}
        rangeLines={<RangeLines type="top" strokeWidth={3} />}
      />
    )
  };

  render() {
    const { type, ...rest } = this.props;
    return <BarSeries type="stacked" {...rest} />;
  }
}
