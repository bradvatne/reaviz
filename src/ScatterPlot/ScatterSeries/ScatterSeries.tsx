import React, { Component, Fragment } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { PoseGroup } from 'react-pose';
import { PoseSVGGElement } from '../../common/utils/animations';
import { CloneElement } from '../../common/utils/children';
import { ScatterPoint, ScatterPointProps } from './ScatterPoint';

export interface ScatterSeriesProps {
  point: JSX.Element;
  yScale: any;
  xScale: any;
  data: ChartInternalShallowDataShape[];
  id: string;
  height: number;
  width: number;
  isZoomed: boolean;
  animated: boolean;
  activeIds?: string[];
}

// For bubble charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export class ScatterSeries extends Component<ScatterSeriesProps, {}> {
  static defaultProps: Partial<ScatterSeriesProps> = {
    animated: true,
    point: <ScatterPoint />
  };

  renderPoint(pointData: ChartInternalShallowDataShape, index: number) {
    const { data, width, id, isZoomed, point, activeIds, ...rest } = this.props;

    let pointId;
    if (pointData.id) {
      pointId = pointData.id;
    } else {
      console.warn(
        `No 'id' property provided for scatter point; provide one via 'id'.`
      );
    }

    const key = pointId || index;
    const active =
      !(activeIds && activeIds.length) || activeIds.includes(pointId);

    return (
      <PoseSVGGElement key={key}>
        <CloneElement<ScatterPointProps>
          element={point}
          {...rest}
          data={pointData}
          index={index}
          active={active}
        />
      </PoseSVGGElement>
    );
  }

  render() {
    const { data, height, width, id, isZoomed } = this.props;

    return (
      <Fragment>
        <defs>
          <clipPath id={`${id}-path`}>
            <rect
              width={isZoomed ? width : width + PADDING}
              height={height + PADDING}
              x={isZoomed ? 0 : -HALF_PADDING}
              y={-HALF_PADDING}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id}-path)`}>
          <PoseGroup animateOnMount={this.props.animated}>
            {data.map((data, index) => this.renderPoint(data, index))}
          </PoseGroup>
        </g>
      </Fragment>
    );
  }
}
