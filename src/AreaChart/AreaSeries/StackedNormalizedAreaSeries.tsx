import React, { Component } from 'react';
import { AreaSeriesProps, AreaSeries } from './AreaSeries';
import { formatValue } from '../../common/utils/formatting';
import {
  TooltipTemplate,
  TooltipArea,
  ChartTooltip
} from '../../common/TooltipArea';

export class StackedNormalizedAreaSeries extends Component<
  AreaSeriesProps,
  {}
> {
  static defaultProps: Partial<AreaSeriesProps> = {
    type: 'stackedNormalized',
    tooltip: (
      <TooltipArea
        tooltip={
          <ChartTooltip
            content={(series, color) => {
              if (!series) {
                return null;
              }

              const value = {
                ...series,
                data: series.data.map(d => ({
                  ...d,
                  value: `${formatValue(d.value)} ∙ ${formatValue(
                    Math.floor((d.y1 - d.y0) * 100)
                  )}%`
                }))
              };

              return <TooltipTemplate color={color} value={value} />;
            }}
          />
        }
      />
    )
  };

  render() {
    const { type, ...rest } = this.props;
    return <AreaSeries type="stackedNormalized" {...rest} />;
  }
}
