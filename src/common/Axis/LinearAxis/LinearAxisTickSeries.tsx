import React, { Component, Fragment } from 'react';
import {
  LinearAxisTickLabel,
  LinearAxisTickLabelProps
} from './LinearAxisTickLabel';
import {
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';
import { formatValue } from '../../utils/formatting';
import { getTextWidth } from '../../utils/width';
import { getTicks } from '../../utils/ticks';
import { TimeInterval } from 'd3-time';
import { CloneElement } from '../../utils/children';

export interface LinearAxisTickSeriesProps {
  height: number;
  width: number;
  scale: any;
  interval?: number | TimeInterval;
  tickSize: number;
  tickValues: any[];
  orientation: 'horizontal' | 'vertical';
  label: JSX.Element | null;
  line: JSX.Element | null;
}

interface ProcessedTick {
  text: string;
  fullText: string;
  position: [number, number];
  half: 'start' | 'end' | 'center';
}

export class LinearAxisTickSeries extends Component<
  LinearAxisTickSeriesProps,
  {}
> {
  static defaultProps: Partial<LinearAxisTickSeriesProps> = {
    line: <LinearAxisTickLine />,
    label: <LinearAxisTickLabel />,
    tickSize: 30
  };

  /**
   * Gets the adjusted scale given offsets.
   */
  getAdjustedScale() {
    const { scale } = this.props;

    if (scale.bandwidth) {
      let offset = scale.bandwidth() / 2;
      if (scale.round()) {
        offset = Math.round(offset);
      }

      return d => +scale(d) + offset;
    } else {
      return d => +scale(d);
    }
  }

  /**
   * Gets the x/y position for a given tick.
   */
  getPosition(scaledTick: number): [number, number] {
    const { orientation } = this.props;

    if (orientation === 'horizontal') {
      return [scaledTick, 0];
    } else {
      return [0, scaledTick];
    }
  }

  /**
   * Gets the dimension (height/width) this axis is calculating on.
   */
  getDimension() {
    const { height, width, orientation } = this.props;
    return orientation === 'vertical' ? height : width;
  }

  /**
   * Calculates the rotation angle that the ticks need to be shifted to.
   * This equation will measure the length of the text in a external canvas
   * object and determine what the longest label is and rotate until they fit.
   */
  getRotationAngle(
    ticks: any[]
  ): { angle: number; textLengths?: { [key: string]: number } } {
    if (!this.props.label) {
      return { angle: 0 };
    }

    const label = this.props.label.props;
    const dimension = this.getDimension();
    let angle = 0;
    let maxTicksLength = 0;
    const textLengths = {};

    for (const tick of ticks) {
      const textLen = getTextWidth(
        tick.text,
        `${label.fontSize} ${label.fontFamily}`
      );

      // cache the length of the text for overlap
      // detection later when post-processing
      textLengths[tick.text] = textLen;

      // Determine the max length for rotation measuring
      maxTicksLength = textLen > maxTicksLength ? textLen : maxTicksLength;
    }

    if (label.rotation) {
      if (label.rotation === true) {
        const maxAllowedLength = getTextWidth(
          '1234567890123456',
          `${label.fontSize} ${label.fontFamily}`
        );
        const wordWidth = Math.min(maxTicksLength, maxAllowedLength);
        let baseWidth = wordWidth;
        const maxBaseWidth = Math.floor(dimension / ticks.length);

        while (baseWidth > maxBaseWidth && angle > -90) {
          angle -= 30;
          baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
      } else if (label.rotation) {
        angle = label.rotation;
      }
    }

    return { angle, textLengths };
  }

  /**
   * Gets the formatted label of the tick.
   */
  getLabelFormat(): (label: string) => string {
    const { label, scale } = this.props;

    if (label && label.props.format) {
      return label.props.format;
    } else if (scale.tickFormat) {
      return scale.tickFormat.apply(scale, [5]);
    } else {
      return v => formatValue(v);
    }
  }

  /**
   * Gets the ticks given the dimensions and scales and returns
   * the text and position.
   */
  getTicks(): ProcessedTick[] {
    const { scale, tickSize, tickValues, interval } = this.props;
    const dimension = this.getDimension();
    const ticks = getTicks(scale, tickSize, tickValues, dimension, interval);
    const adjustedScale = this.getAdjustedScale();
    const format = this.getLabelFormat();
    const result: ProcessedTick[] = [];
    const midpoint = dimension / 2;

    for (const tick of ticks) {
      const text = format(tick);
      const scaledTick = adjustedScale(tick);

      result.push({
        text,
        fullText: text,
        position: this.getPosition(scaledTick),
        half:
          scaledTick === midpoint
            ? 'center'
            : scaledTick < midpoint
            ? 'start'
            : 'end'
      });
    }

    return result;
  }

  /**
   * Post processes the ticks to:
   *
   * - Ellipsis the labels if they are exceed a given length
   * - Filter out any ticks that might overlap each other.
   *
   */
  postProcessTicks(
    ticks: ProcessedTick[],
    angle: number,
    textLengths?: { [key: string]: number }
  ) {
    const result: ProcessedTick[] = [];

    let i = 0;
    for (const tick of ticks) {
      const prevTick = result[result.length - 1];
      const overlaps = this.getTickOverlap(
        i,
        ticks,
        angle,
        textLengths,
        prevTick
      );

      if (!overlaps) {
        if (angle && tick.text.length > 16) {
          tick.text = tick.text.substring(0, 16) + '...';
        }
        result.push(tick);
      }

      i++;
    }

    return result;
  }

  /**
   * Calculates whether the current tick will overlap with
   * the next tick.
   */
  getTickOverlap(
    index: number,
    ticks: ProcessedTick[],
    angle: number,
    textLengths: { [key: string]: number } | undefined,
    prevTick: ProcessedTick
  ) {
    if (index === 0) {
      return false;
    }

    const { orientation } = this.props;
    const current = ticks[index];
    const [curX, curY] = current.position;
    const [prevX, prevY] = prevTick.position;
    const padding = 10;

    // Determine whether the previous item and the next one will overlap
    let curLength = 10;
    let prevLength = 10;
    if (!angle && textLengths && textLengths[current.text]) {
      curLength = textLengths[current.text];
      prevLength = textLengths[prevTick.text];
    }

    if (orientation === 'vertical') {
      return curY - curLength / 2 - padding > prevY + prevLength / 2;
    } else {
      return curX - curLength / 2 - padding < prevX + prevLength / 2;
    }
  }

  render() {
    const { label, line, height, width, orientation } = this.props;
    const ticks = this.getTicks();
    const { angle, textLengths } = this.getRotationAngle(ticks);
    const formattedTicks = this.postProcessTicks(ticks, angle, textLengths);

    return (
      <Fragment>
        {formattedTicks.map((tick, i) => (
          <g
            key={i}
            transform={`translate(${tick.position[0]}, ${tick.position[1]})`}
          >
            {line && (
              <CloneElement<LinearAxisTickLineProps>
                element={line}
                height={height}
                width={width}
                orientation={orientation}
              />
            )}
            {label && (
              <CloneElement<LinearAxisTickLabelProps>
                element={label}
                text={tick.text}
                fullText={tick.fullText}
                half={tick.half}
                angle={angle}
                orientation={orientation}
                line={line!}
              />
            )}
          </g>
        ))}
      </Fragment>
    );
  }
}
