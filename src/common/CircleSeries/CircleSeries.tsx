import React, { Fragment } from 'react';
import { Circle, CircleProps } from './Circle';
import { ChartInternalShallowDataShape } from '../data';
import { isEqual } from 'lodash-es';
import { CloneElement } from '../utils/children';

export interface CircleSeriesProps {
  color: any;
  index: number;
  activeValues?: any;
  data: ChartInternalShallowDataShape[];
  yScale: any;
  xScale: any;
  show: boolean | 'hover' | 'first' | 'last';
  animated: boolean;
  circle: JSX.Element;
}

export class CircleSeries extends React.Component<CircleSeriesProps, {}> {
  static defaultProps: Partial<CircleSeriesProps> = {
    circle: <Circle />,
    show: 'hover'
  };

  isVisible(point: ChartInternalShallowDataShape, index: number) {
    const { show, activeValues, data } = this.props;
    const isActive = activeValues && point && isEqual(activeValues.x, point.x);

    if (show === 'hover') {
      return isActive;
    } else if (show === 'first') {
      if (activeValues) {
        return isActive;
      } else {
        return index === 0;
      }
    } else if (show === 'last') {
      if (activeValues) {
        return isActive;
      } else {
        return index === data.length - 1;
      }
    }

    return show;
  }

  renderCircle = (point: ChartInternalShallowDataShape, index: number) => {
    const visible = this.isVisible(point, index);

    if (!visible) {
      return null;
    }

    const { color, yScale, xScale, animated, circle } = this.props;

    const fill = color(point, index);

    return (
      <CloneElement<CircleProps>
        element={circle}
        key={`circle-${index}`}
        fill={fill}
        visible={visible}
        point={point}
        yScale={yScale}
        xScale={xScale}
        animated={animated}
      />
    );
  };

  render() {
    return <Fragment>{this.props.data.map(this.renderCircle)}</Fragment>;
  }
}
