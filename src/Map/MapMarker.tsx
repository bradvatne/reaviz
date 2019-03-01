import React, { Component, createRef, Fragment } from 'react';
import posed from 'react-pose';
import { Tooltip } from '../common/TooltipArea';
import * as bind from 'memoize-bind';
import * as css from './MapMarker.module.scss';

export interface MapMarkerProps {
  coordinates: [number, number];
  cy?: number;
  cx?: number;
  size?: number;
  index?: number;
  tooltip?: any;
  onClick?: () => void;
}

interface MapMarkerState {
  active?: boolean;
}

export const PosedCircle = posed.circle({
  enter: {
    opacity: 1,
    scale: 1,
    delay: ({ index }) => index * 500,
    transition: {
      opacity: {
        type: 'tween',
        ease: 'linear',
        duration: 1000
      }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.2
  }
});

// Set padding modifier for the tooltips
const modifiers = {
  offset: {
    offset: '0, 3px'
  }
};

export class MapMarker extends Component<MapMarkerProps, MapMarkerState> {
  static defaultProps: Partial<MapMarkerProps> = {
    size: 3,
    onClick: () => undefined
  };

  ref = createRef<SVGCircleElement>();
  state: MapMarkerState = {};

  onMouseEnter() {
    this.setState({ active: true });
  }

  onMouseLeave() {
    this.setState({ active: false });
  }

  render() {
    const { cx, cy, index, tooltip, size, onClick } = this.props;
    const { active } = this.state;

    return (
      <Fragment>
        <PosedCircle
          ref={this.ref}
          className={css.marker}
          index={index}
          cx={cx}
          cy={cy}
          r={size}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
          onClick={onClick}
        />
        {tooltip && (
          <Tooltip
            visible={!!active}
            reference={this.ref}
            modifiers={modifiers}
            content={tooltip}
          />
        )}
      </Fragment>
    );
  }
}
