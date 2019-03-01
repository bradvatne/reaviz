import React, { Component, Fragment, ReactNode } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import bind from 'memoize-bind';
import { ChartTooltip, ChartTooltipProps } from '../../common/TooltipArea';
import { PosedCircle } from './PosedCircle';
import { PosedSymbol } from './PosedSymbol';
import classNames from 'classnames';
import * as css from './ScatterPoint.module.scss';
import { CloneElement } from '../../common/utils/children';

export interface ScatterPointProps {
  symbol: ((value) => ReactNode);
  active?: boolean;
  size?: ((d) => number) | number;
  fill?: string;
  cursor?: string;
  xScale: any;
  yScale: any;
  height: number;
  animated: boolean;
  index: number;
  tooltip: JSX.Element;
  data: ChartInternalShallowDataShape;
  onClick: (e: ChartInternalShallowDataShape) => void;
  onMouseEnter: (e: ChartInternalShallowDataShape) => void;
  onMouseLeave: (e: ChartInternalShallowDataShape) => void;
}

interface ScatterPointState {
  active: boolean;
}

export class ScatterPoint extends Component<
  ScatterPointProps,
  ScatterPointState
> {
  static defaultProps: Partial<ScatterPointProps> = {
    active: true,
    tooltip: <ChartTooltip />,
    cursor: 'pointer',
    size: 4,
    fill: '#AE34FF',
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  rect = React.createRef<SVGGElement>();

  state: ScatterPointState = {
    active: false
  };

  onMouseEnter() {
    this.setState({ active: true });
    this.props.onMouseEnter(this.props.data);
  }

  onMouseLeave() {
    this.setState({ active: false });
    this.props.onMouseLeave(this.props.data);
  }

  onClick() {
    this.props.onClick(this.props.data);
  }

  getYPosition() {
    const { yScale, data } = this.props;

    let cy = yScale(data.y);
    if (yScale.bandwidth) {
      const width = yScale.bandwidth();
      cy = cy + width / 2;
    }

    return cy;
  }

  getCircleEnter() {
    const { xScale, data } = this.props;

    return {
      cy: this.getYPosition(),
      cx: xScale(data.x)
    };
  }

  getCircleExit() {
    const { xScale, data, height } = this.props;
    return {
      cy: height,
      cx: xScale(data.x)
    };
  }

  getSymbolEnter() {
    const { data, xScale } = this.props;

    const y = this.getYPosition();
    const x = xScale(data.x);
    const transform = `translate(${x}, ${y})`;

    return {
      transform,
      x,
      y
    };
  }

  getSymbolExit() {
    const { data, height, xScale } = this.props;
    const x = xScale(data.x);
    const transform = `translate(${x}, ${height})`;

    return {
      transform
    };
  }

  renderCircle() {
    const { data, animated, index, size, fill, cursor } = this.props;
    const sizeVal = typeof size === 'function' ? size(data) : size;
    const enterProps = this.getCircleEnter();
    const exitProps = this.getCircleExit();

    return (
      <PosedCircle
        pose="enter"
        poseKey={`${enterProps.cy}-${enterProps.cx}`}
        enterProps={enterProps}
        exitProps={exitProps}
        r={sizeVal}
        index={index}
        animated={animated}
        cursor={cursor}
        fill={fill}
      />
    );
  }

  renderSymbol() {
    const { data, animated, index, symbol } = this.props;
    const enterProps = this.getSymbolEnter();
    const exitProps = this.getSymbolExit();
    const renderedSymbol = symbol(data);

    return (
      <PosedSymbol
        pose="enter"
        poseKey={`${enterProps.y}-${enterProps.x}`}
        enterProps={enterProps}
        exitProps={exitProps}
        animated={animated}
        index={index}
      >
        {renderedSymbol}
      </PosedSymbol>
    );
  }

  render() {
    const { symbol, tooltip, data } = this.props;
    const { active } = this.state;

    return (
      <Fragment>
        <g
          ref={this.rect}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
          onClick={bind(this.onClick, this)}
          className={classNames({
            [css.inactive]: !this.props.active
          })}
        >
          {symbol && this.renderSymbol()}
          {!symbol && this.renderCircle()}
        </g>
        {!tooltip.props.disabled && (
          <CloneElement<ChartTooltipProps>
            element={tooltip}
            visible={active}
            reference={this.rect}
            value={data}
          />
        )}
      </Fragment>
    );
  }
}
