import React from 'react';
import { degrees } from '../utils';
import * as css from './HiveAxis.module.scss';

interface HiveAxisProps {
  angle: (...args: any[]) => any;
  color: (...args: any[]) => any;
  radius: any;
  index: number;
}

export class HiveAxis extends React.Component<HiveAxisProps, {}> {
  render() {
    const { radius, index, angle, color } = this.props;
    const [axisStart, axisEnd] = radius.range();
    const axisLength = axisEnd - axisStart;
    return (
      <React.Fragment>
        <line
          className={css.axis}
          style={{ stroke: color(index) }}
          transform={`rotate(${degrees(angle(index))})`}
          x1={axisStart}
          x2={axisEnd}
        />
        <line
          className={css.axis}
          style={{ stroke: color(index) }}
          transform={`rotate(${degrees(angle(index)) + 90})`}
          x1={-axisLength / 20}
          x2={axisLength / 20}
          y1={-axisEnd}
          y2={-axisEnd}
        />
        <line
          className={css.axis}
          style={{ stroke: color(index) }}
          transform={`rotate(${degrees(angle(index)) + 90})`}
          x1={-axisStart / 3}
          x2={0}
          y1={axisStart * -0.8}
          y2={axisStart * -1}
        />
        <line
          className={css.axis}
          style={{ stroke: color(index) }}
          transform={`rotate(${degrees(angle(index)) + 90})`}
          x1={0}
          x2={axisStart / 3}
          y1={-axisStart}
          y2={axisStart * -0.8}
        />
      </React.Fragment>
    );
  }
}
