import React, { Component } from 'react';
import { AreaSeriesProps, AreaSeries } from './AreaSeries';

export class StackedAreaSeries extends Component<AreaSeriesProps, {}> {
  static defaultProps: Partial<AreaSeriesProps> = {
    ...AreaSeries.defaultProps,
    type: 'stacked'
  };

  render() {
    const { type, ...rest } = this.props;
    return <AreaSeries type="stacked" {...rest} />;
  }
}
