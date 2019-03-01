import React, { Component } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';
import { ChartTooltip, TooltipTemplate } from '../../common/TooltipArea';
import { formatValue } from '../../common/utils/formatting';

export class StackedNormalizedBarSeries extends Component<BarSeriesProps, {}> {
  static defaultProps: Partial<BarSeriesProps> = {
    ...BarSeries.defaultProps,
    type: 'stackedNormalized',
    bar: (
      <Bar
        rounded={false}
        gradient={[
          { offset: '5%', stopOpacity: 0.1 },
          { offset: '90%', stopOpacity: 0.7 }
        ]}
        rangeLines={<RangeLines type="top" strokeWidth={3} />}
        tooltip={
          <ChartTooltip
            content={data => {
              const x = `${data.key} ∙ ${formatValue(data.x)}`;
              const y = `${formatValue(data.value)} ∙ ${formatValue(
                Math.floor((data.y1 - data.y0) * 100)
              )}%`;
              return <TooltipTemplate value={{ y, x }} />;
            }}
          />
        }
      />
    )
  };

  render() {
    const { type, ...rest } = this.props;
    return <BarSeries type="stackedNormalized" {...rest} />;
  }
}
