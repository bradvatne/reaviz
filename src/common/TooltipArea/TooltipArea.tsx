import React, { Fragment } from 'react';
import { TooltipAreaEvent } from './TooltipAreaEvent';
import { Placement } from 'rdk';
import {
  ChartDataTypes,
  ChartInternalDataShape,
  ChartInternalShallowDataShape,
  isNested
} from '../data';
import { getPositionForTarget, getClosestPoint } from '../utils/position';
import * as bind from 'memoize-bind';
import { isEqual } from 'lodash-es';
import { CloneElement } from '../utils/children';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';

export interface TooltipAreaProps {
  placement: Placement;
  formatter?: (value: any, color?: any) => any;
  height: number;
  width: number;
  xScale: any;
  yScale: any;
  disabled: boolean;
  color: any;
  data: ChartInternalDataShape[];
  tooltip: JSX.Element;
  onValueEnter: (event: TooltipAreaEvent) => void;
  onValueLeave: () => void;
  children?: any;
}

interface TooltipAreaState {
  visible?: boolean;
  placement?: Placement;
  value?: any;
  offsetX?: any;
  offsetY?: any;
  data: Array<TooltipDataShape | ChartInternalShallowDataShape>;
}

interface TooltipDataShape {
  x?: ChartDataTypes;
  y?: ChartDataTypes;
  data?: ChartDataTypes | Array<ChartDataTypes | ChartInternalShallowDataShape>;
}

export class TooltipArea extends React.Component<
  TooltipAreaProps,
  TooltipAreaState
> {
  static defaultProps: Partial<TooltipAreaProps> = {
    placement: 'top',
    tooltip: <ChartTooltip />,
    onValueEnter: () => undefined,
    onValueLeave: () => undefined
  };

  prevX: number | undefined;
  prevY: number | undefined;

  constructor(props: TooltipAreaProps) {
    super(props);
    this.state = {
      data: this.transformData(props.data)
    };
  }

  componentDidUpdate(prevProps: TooltipAreaProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.setState({
        data: this.transformData(data)
      });
    }
  }

  onMouseMove(event: React.MouseEvent) {
    const { value, data } = this.state;
    const { xScale, yScale, onValueEnter, height } = this.props;
    let { placement } = this.props;
    const { x } = getPositionForTarget(event);
    const newValue = getClosestPoint(x, xScale, data);

    if (!isEqual(newValue, value)) {
      const pointX = xScale(newValue.x);
      let pointY = yScale(newValue.y);
      let marginX = 0;
      let marginY = 0;

      if (isNaN(pointY)) {
        pointY = height / 2;
        marginX = 10;
        placement = 'right';
      } else {
        marginY = -10;
      }

      // If the points didn't change, don't trigger an update
      if (pointX === this.prevX && pointY === this.prevY) {
        return;
      }

      this.prevY = pointY;
      this.prevX = pointX;

      const target = event.target as SVGRectElement;
      const { top, left } = target.getBoundingClientRect();
      const offsetX = pointX + left + marginX;
      const offsetY = pointY + top + marginY;

      this.setState({
        placement,
        visible: true,
        value: newValue,
        offsetX,
        offsetY
      });

      onValueEnter({
        visible: true,
        value: newValue,
        pointY,
        pointX,
        offsetX,
        offsetY,
        nativeEvent: event
      });
    }
  }

  onMouseLeave() {
    this.prevX = undefined;
    this.prevY = undefined;

    this.setState({
      value: undefined,
      visible: false
    });

    this.props.onValueLeave();
  }

  getTooltipReference() {
    const { offsetX, offsetY } = this.state;

    return {
      width: 4,
      height: 4,
      top: offsetY,
      left: offsetX
    };
  }

  transformData(series: ChartInternalDataShape[]) {
    const result: TooltipDataShape[] = [];

    for (const point of series) {
      if (isNested(point)) {
        for (const nestedPoint of point.data) {
          const right = nestedPoint.x;
          let idx = result.findIndex(r => {
            const left = r.x;
            if (left instanceof Date && right instanceof Date) {
              return left.getTime() === right.getTime();
            }
            return left === right;
          });

          if (idx === -1) {
            result.push({
              x: nestedPoint.x,
              data: []
            });

            idx = result.length - 1;
          }

          const data = result[idx].data;

          if (Array.isArray(data)) {
            data.push(nestedPoint);
          }
        }
      } else {
        result.push(point);
      }
    }

    return result;
  }

  render() {
    const { height, width, children, tooltip, disabled, color } = this.props;
    const { visible, placement, value } = this.state;

    return (
      <Fragment>
        {disabled && children}
        {!disabled && (
          <g onMouseLeave={bind(this.onMouseLeave, this)}>
            <rect
              height={height}
              width={width}
              opacity={0}
              cursor="auto"
              onMouseMove={bind(this.onMouseMove, this)}
            />
            <CloneElement<ChartTooltipProps>
              element={tooltip}
              visible={visible}
              placement={placement}
              reference={this.getTooltipReference()}
              color={color}
              value={value}
            />
            {children}
          </g>
        )}
      </Fragment>
    );
  }
}
