import React from 'react';
import classNames from 'classnames';
import { hiveLayout } from './hiveLayout';
import { Link } from '../utils';
import { isString } from 'lodash-es';
import * as css from './HiveLink.module.scss';

interface HiveLinkProps {
  angle: (...args: any[]) => any;
  radius: (...args: any[]) => any;
  color: (...args: any[]) => any | string;
  link: Link;
  active?: boolean;
  onMouseOver: (...args: any[]) => any;
  onMouseOut: (...args: any[]) => any;
}

export class HiveLink extends React.Component<HiveLinkProps, {}> {
  prepareData() {
    const { angle, radius } = this.props;
    const hive = hiveLayout();

    return {
      angle: hive.angle(d => angle(d.x)),
      radius: hive.radius(d => radius(d.y))
    };
  }

  render() {
    const { link, color, active, onMouseOver, onMouseOut } = this.props;
    const { angle, radius } = this.prepareData();

    return (
      <path
        className={classNames(css.link, {
          [css.inactive]: !active
        })}
        d={`${angle(link)} ${radius(link)}`}
        stroke={isString(color) ? color : color(link.source.x)}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
    );
  }
}
