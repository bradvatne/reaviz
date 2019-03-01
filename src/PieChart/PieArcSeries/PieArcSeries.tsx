import React, { Component } from 'react';
import { PoseGroup } from 'react-pose';
import { PoseSVGGElement } from '../../common/utils/animations';
import { PieArc, PieArcProps } from './PieArc';
import { arc } from 'd3-shape';
import { PieArcLabel, PieArcLabelProps } from './PieArcLabel';
import { CloneElement } from '../../common/utils/children';
import { sequentialScheme, getColor } from '../../common/utils/color';

export interface PieArcSeriesProps {
  animated: boolean;
  outerRadius: number;
  innerRadius: number;
  data: any;
  arcWidth: number;
  doughnut: boolean;
  height: number;
  width: number;
  label: JSX.Element;
  arc: JSX.Element;
  colorScheme: ((data, index: number) => string) | string[];
}

export class PieArcSeries extends Component<PieArcSeriesProps, {}> {
  static defaultProps: Partial<PieArcSeriesProps> = {
    animated: true,
    colorScheme: sequentialScheme,
    innerRadius: 0,
    arcWidth: 0.25,
    label: <PieArcLabel />,
    arc: <PieArc />
  };

  calculateRadius() {
    const { doughnut, arcWidth, label, width, height } = this.props;

    const outerRadius = Math.min(width, height) / (label.props.show ? 3 : 2);
    const innerRadius = doughnut ? outerRadius * (1 - arcWidth) : 0;

    return {
      outerRadius,
      innerRadius
    };
  }

  getColor(point, index) {
    const { colorScheme, data } = this.props;

    return Array.isArray(colorScheme)
      ? getColor(colorScheme, data)(index)
      : colorScheme(point, index);
  }

  innerArc(innerRadius: number, outerRadius: number) {
    return arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  }

  outerArc(outerRadius: number) {
    const factor = 1.2;

    return arc()
      .innerRadius(outerRadius * factor)
      .outerRadius(outerRadius * factor);
  }

  render() {
    const { animated, data, label, arc } = this.props;

    const { outerRadius, innerRadius } = this.calculateRadius();
    const innerArc = this.innerArc(innerRadius, outerRadius);
    const outerArc = this.outerArc(outerRadius);

    return (
      <PoseGroup animateOnMount={animated}>
        {data.map((arcData: any, index: number) => (
          <PoseSVGGElement key={arcData.data.key.toString()}>
            <CloneElement<PieArcProps>
              element={arc}
              data={arcData}
              animated={animated}
              innerArc={innerArc}
              color={this.getColor(arcData, index)}
            />
            {label.props.show && (
              <CloneElement<PieArcLabelProps>
                element={label}
                data={arcData}
                innerArc={innerArc}
                outerArc={outerArc}
                outerRadius={outerRadius}
              />
            )}
          </PoseSVGGElement>
        ))}
      </PoseGroup>
    );
  }
}
