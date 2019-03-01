import React, { Fragment, Component, createRef } from 'react';
import chroma from 'chroma-js';
import { ChartTooltip, ChartTooltipProps } from '../../common/TooltipArea';
import { Gradient } from '../../common/Styles';
import classNames from 'classnames';
import { ChartInternalShallowDataShape } from '../../common/data';
import { RangeLinesProps } from './RangeLines';
import bind from 'memoize-bind';
import * as css from './Bar.module.scss';
import { PosedBar } from './PosedBar';
import { CloneElement } from '../../common/utils/children';

export interface BarProps {
  xScale: any;
  xScale1: any;
  data: ChartInternalShallowDataShape;
  id: string;
  gradient?:
    | boolean
    | Array<{
        offset: number | string;
        stopOpacity: number;
      }>;
  yScale: any;
  width: number;
  padding: number;
  barCount: number;
  color: any;
  rounded: boolean;
  cursor: string;
  barIndex: number;
  groupIndex?: number;
  animated: boolean;
  isCategorical: boolean;
  onClick: (event) => void;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
  rangeLines: JSX.Element | null;
  tooltip: JSX.Element;
}

interface BarState {
  active?: boolean;
}

interface BarCoordinates {
  width: number;
  height: number;
  x: number;
  y: number;
}

// Set padding modifier for the tooltips
const modifiers = {
  offset: {
    offset: '0, 5px'
  }
};

export class Bar extends Component<BarProps, BarState> {
  static defaultProps: Partial<BarProps> = {
    rounded: true,
    gradient: true,
    cursor: 'auto',
    tooltip: <ChartTooltip />,
    rangeLines: null,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  rect = createRef<any>();
  state: BarState = {};

  getXAttribute(): 'x' | 'x0' {
    return this.props.isCategorical ? 'x' : 'x0';
  }

  getExit({ x, width }: BarCoordinates) {
    const { yScale } = this.props;

    return {
      x,
      y: Math.max(...yScale.range()),
      height: 0,
      width
    };
  }

  getCoords(): BarCoordinates {
    const { yScale, isCategorical, data, width, padding } = this.props;
    const xScale = this.props.xScale1 || this.props.xScale;

    let x: number;
    let barWidth: number;
    const y0 = yScale(data.y0);
    const y1 = yScale(data.y1);
    const barHeight = y0 - y1;

    if (isCategorical) {
      if (xScale.bandwidth) {
        x = xScale(data.x);
        barWidth = xScale.bandwidth();
        if (width) {
          x = x + barWidth / 2 - width / 2;
          barWidth = width;
        }
      } else {
        if (width) {
          throw new Error('Not a valid option for this scale type');
        }

        x = xScale(data.x0);
        barWidth = xScale((data.x1 as any) - (data.x0 as any));

        if (padding) {
          const calc = this.calculateLinearScalePadding(x, barWidth);
          x = calc.x;
          barWidth = calc.width;
        }
      }
    } else {
      if (width) {
        throw new Error('Not a valid option for this scale type');
      }

      const x0 = xScale(data.x0);
      const x1 = xScale(data.x1);
      const delta = x1 - x0;
      x = x0;
      barWidth = Math.max(delta - 1, 0);
    }

    return {
      height: barHeight,
      width: barWidth,
      x,
      y: y1
    };
  }

  /**
   * This function calculates the padding on a linear scale used by the marimekko chart.
   */
  calculateLinearScalePadding(x: number, width: number) {
    const { xScale, barCount, groupIndex, padding } = this.props;

    const totalWidth = xScale.range()[1];
    const widthMinusPadding = totalWidth - padding * (barCount - 1);
    const xMultiplier = widthMinusPadding / totalWidth;
    x = x * xMultiplier + groupIndex! * padding;
    width = width * xMultiplier;

    return { width, x };
  }

  onMouseEnter(event: MouseEvent) {
    this.setState({ active: true });

    const { onMouseEnter, data } = this.props;
    onMouseEnter({
      value: data,
      nativeEvent: event
    });
  }

  onMouseLeave(event: MouseEvent) {
    this.setState({ active: false });

    const { onMouseLeave, data } = this.props;
    onMouseLeave({
      value: data,
      nativeEvent: event
    });
  }

  onMouseClick(event: MouseEvent) {
    const { onClick, data } = this.props;
    onClick({
      value: data,
      nativeEvent: event
    });
  }

  getFill(color: string) {
    const { id, gradient } = this.props;

    if (!gradient) {
      return color;
    }

    return `url(#${id}-gradient)`;
  }

  getTooltipData() {
    const { data } = this.props;

    const xAttr = this.getXAttribute();
    let x = data[xAttr]!;
    if (data.key && data.key !== x) {
      x = `${data.key} ∙ ${x}`;
    }

    return { y: data.y, x };
  }

  renderBar(currentColorShade: string, coords: BarCoordinates, index: number) {
    const { rounded, cursor, barCount, animated } = this.props;
    const fill = this.getFill(currentColorShade);
    const enterProps = coords;
    const exitProps = this.getExit(coords);

    return (
      <PosedBar
        pose="enter"
        poseKey={`${coords.x}-${coords.y}-${coords.height}-${coords.width}`}
        ref={this.rect}
        style={{ cursor }}
        fill={fill}
        onMouseEnter={bind(this.onMouseEnter, this)}
        onMouseLeave={bind(this.onMouseLeave, this)}
        onClick={bind(this.onMouseClick, this)}
        className={classNames({ [css.rounded]: rounded })}
        enterProps={enterProps}
        exitProps={exitProps}
        index={index}
        barCount={barCount}
        animated={animated}
      />
    );
  }

  render() {
    const {
      id,
      gradient,
      data,
      barIndex,
      color,
      yScale,
      barCount,
      tooltip,
      groupIndex,
      rangeLines,
      animated
    } = this.props;
    const { active } = this.state;
    const stroke = color(data, barIndex);
    const coords = this.getCoords();
    const currentColorShade = active ? chroma(stroke).brighten(0.5) : stroke;
    const gradientOffsets = Array.isArray(gradient) ? gradient : undefined;
    const index = groupIndex !== undefined ? groupIndex : barIndex;

    return (
      <Fragment>
        {this.renderBar(currentColorShade, coords, index)}
        {rangeLines && (
          <CloneElement<RangeLinesProps>
            element={rangeLines}
            {...coords}
            index={index}
            data={data}
            yScale={yScale}
            color={currentColorShade}
            barCount={barCount}
            animated={animated}
          />
        )}
        {!tooltip.props.disabled && (
          <CloneElement<ChartTooltipProps>
            element={tooltip}
            visible={!!active}
            modifiers={modifiers}
            reference={this.rect}
            color={color}
            value={this.getTooltipData()}
            metadata={data}
          />
        )}
        {gradient && (
          <Gradient
            id={`${id}-gradient`}
            color={currentColorShade}
            offsets={gradientOffsets}
          />
        )}
      </Fragment>
    );
  }
}
