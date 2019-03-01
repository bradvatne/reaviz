import React, { Component } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';
import { ChartTooltip, TooltipTemplate } from '../../common/TooltipArea';
import { formatValue } from '../../common/utils/formatting';

export class MarimekkoBarSeries extends Component<BarSeriesProps, {}> {
  static defaultProps: Partial<BarSeriesProps> = {
    ...BarSeries.defaultProps,
    type: 'marimekko',
    padding: 10,
    bar: (
      <Bar
        rounded={false}
        padding={10}
        gradient={[
          { offset: '5%', stopOpacity: 0.1 },
          { offset: '90%', stopOpacity: 0.7 }
        ]}
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
        rangeLines={<RangeLines type="top" strokeWidth={3} />}
      />
    )
  };

  render() {
    const { type, ...rest } = this.props;
    return <BarSeries type="marimekko" {...rest} />;
  }
}
