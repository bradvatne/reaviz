import React, { Component } from 'react';
import * as bind from 'memoize-bind';
import { ZoomPan, ZoomPanEvent, ZoomPanProps } from './ZoomPan';
import { ChartInternalDataShape, ChartDataTypes } from '../data';
import { getXScale } from '../scales';

export interface ZoomPanChangeEvent {
  domain: [ChartDataTypes, ChartDataTypes];
  isZoomed: boolean;
}

export interface ChartZoomPanProps {
  data: ChartInternalDataShape[];
  domain?: [ChartDataTypes, ChartDataTypes];
  axisType: 'value' | 'time' | 'category';
  roundDomains: boolean;
  onZoomPan?: (event: ZoomPanChangeEvent) => void;
  height: number;
  width: number;
  scale: number;
  offset: number;
  pannable: boolean;
  zoomable: boolean;
  disabled?: boolean;
  maxZoom: number;
  zoomStep: number;
  decay: boolean;
  disableMouseWheel?: boolean;
}

export class ChartZoomPan extends Component<ChartZoomPanProps, {}> {
  static defaultProps: Partial<ChartZoomPanProps> = {
    onZoomPan: () => undefined
  };

  onZoomPan(event: ZoomPanEvent) {
    const { width, data, axisType, roundDomains, onZoomPan } = this.props;

    const scale: any = getXScale({
      width: width,
      type: axisType,
      roundDomains,
      data
    });

    const newScale = scale.copy().domain(
      scale
        .range()
        .map(x => (x - event.offset) / event.scale)
        .map(scale.invert, event.offset)
    );

    onZoomPan!({
      domain: newScale.domain(),
      isZoomed: event.scale !== 1
    });
  }

  getOffset() {
    let zoomOffset = {};
    const {
      disabled,
      domain,
      width,
      data,
      axisType,
      roundDomains
    } = this.props;

    if (!disabled && domain) {
      const xScale: any = getXScale({
        width,
        type: axisType,
        roundDomains,
        data
      });

      let offset = xScale(domain[0]);
      const endOffset = xScale(domain[1]);
      const scale = width / (endOffset - offset);

      // Apply the new scale to the offset so its scaled correctly
      offset = offset * scale;

      zoomOffset = {
        scale: scale,
        offset: -offset
      };
    }

    return zoomOffset;
  }

  render() {
    const { data, height, children, width, onZoomPan, ...rest } = this.props;

    return (
      <ZoomPan
        {...rest}
        {...this.getOffset()}
        onZoomPan={bind(this.onZoomPan, this)}
        height={height}
        width={width}
      >
        {children}
      </ZoomPan>
    );
  }
}
