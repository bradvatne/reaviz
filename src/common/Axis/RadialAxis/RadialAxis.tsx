import React, { Component, Fragment } from 'react';
import { RadialAxisLineSeries } from './RadialAxisLineSeries';
import { RadialAxisTickSeries } from './RadialAxisTickSeries';
import { RadialAxisArcSeries } from './RadialAxisArcSeries';

interface RadialAxisProps {
  height: number;
  xScale: any;
  arc: {
    show: boolean;
    padding: number;
    minRadius: number;
    count: number;
    stroke: ((index: number) => string) | string;
    strokeDasharray: ((index: number) => string) | string;
  };
  line: {
    show: boolean;
    count: number;
    innerRadius: number;
    stroke: ((index: number) => string) | string;
  };
  ticks: {
    show: boolean;
    count: number;
    line: {
      show: boolean;
      stroke: string;
      size: number;
    };
    label: {
      show: boolean;
      fill: string;
      fontSize: number;
      fontFamily: string;
      format?: (value: any, index: number) => any;
    };
  };
}

export class RadialAxis extends Component<RadialAxisProps, {}> {
  static defaultProps = {
    ticks: {
      show: true,
      count: 12,
      line: {
        show: true,
        stroke: '#054856',
        size: 10
      },
      label: {
        show: true,
        fill: '#3B5F6A',
        fontSize: 11,
        fontFamily: 'sans-serif'
      }
    },
    arc: {
      show: true,
      padding: 50,
      minRadius: 10,
      stroke: '#054856',
      count: 13,
      strokeDasharray: '1,4'
    },
    line: {
      show: true,
      count: 4,
      stroke: '#054856',
      innerRadius: 25
    }
  };

  getArcWidth(chartRadius) {
    const {
      arc: { minRadius, count, padding }
    } = this.props;
    return (chartRadius - minRadius - count * padding) / count;
  }

  render() {
    const { arc, line, ticks, xScale, height } = this.props;
    const chartRadius = height / 2 - 40;
    const arcWidth = this.getArcWidth(chartRadius);
    const outerRadius = chartRadius + arcWidth;

    return (
      <Fragment>
        {line.show && (
          <RadialAxisLineSeries
            {...line}
            height={height}
            arcWidth={arcWidth}
            minRadius={arc.minRadius}
            padding={arc.padding}
          />
        )}
        {ticks.show && (
          <RadialAxisTickSeries
            {...ticks}
            scale={xScale}
            outerRadius={outerRadius}
          />
        )}
        {arc.show && <RadialAxisArcSeries {...arc} arcWidth={arcWidth} />}
      </Fragment>
    );
  }
}
