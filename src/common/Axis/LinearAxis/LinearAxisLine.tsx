import React, { Fragment, Component } from 'react';
import { Gradient } from '../../Styles';

export interface LinearAxisLineProps {
  height: number;
  width: number;
  strokeColor?: string;
  strokeWidth: number;
  strokeGradient?: Array<{
    offset: number | string;
    stopOpacity: number;
    color?: string;
  }>;
  scale: any;
  orientation: 'horizontal' | 'vertical';
}

interface LinearAxisLineState {
  id: string;
}

let axisLineId = 0;

export class LinearAxisLine extends Component<
  LinearAxisLineProps,
  LinearAxisLineState
> {
  static defaultProps: Partial<LinearAxisLineProps> = {
    strokeColor: '#8F979F',
    strokeWidth: 1
  };

  state: LinearAxisLineState = {
    id: (axisLineId++).toString()
  };

  render() {
    const { strokeColor, strokeGradient, scale, orientation } = this.props;
    const { id } = this.state;
    const [range0, range1] = scale.range();

    return (
      <Fragment>
        <line
          x1={orientation === 'vertical' ? 0 : range0}
          // Workaround for a Chrome bug where it won't render gradients for straight lines
          x2={orientation === 'vertical' ? 0.000001 : range1}
          y1={orientation === 'vertical' ? range0 : 0}
          y2={orientation === 'vertical' ? range1 : 0.000001}
          strokeWidth={1}
          stroke={strokeGradient ? `url(#axis-gradient-${id})` : strokeColor}
        />
        {strokeGradient && (
          <Gradient id={`axis-gradient-${id}`} offsets={strokeGradient} />
        )}
      </Fragment>
    );
  }
}
