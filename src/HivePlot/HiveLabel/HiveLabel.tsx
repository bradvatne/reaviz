import React from 'react';
import * as css from './HiveLabel.module.scss';

const degrees = radians => {
  const res = (radians / Math.PI) * 180;
  return res > 90 ? res + 180 : res;
};

const translate = (d, outerRadius, padding) =>
  d > 90 ? outerRadius + 8 + padding : -(outerRadius + padding);

interface HiveLabelProps {
  index: number;
  text: string;
  label: any;
  outerRadius: number;
  angle: (...args: any[]) => any;
}

export class HiveLabel extends React.Component<HiveLabelProps, {}> {
  render() {
    const { index, text, angle, outerRadius, label } = this.props;
    const transform = degrees(angle(index));

    return (
      <text
        dy={translate(transform, outerRadius, label.padding)}
        className={css.label}
        strokeWidth="0.01"
        textAnchor="middle"
        transform={`rotate(${transform})`}
      >
        {text}
      </text>
    );
  }
}
