import React, { Component, ReactNode, cloneElement } from 'react';
import { Tooltip, TooltipProps } from '../../common/TooltipArea/Tooltip';
import { TooltipTemplate } from './TooltipTemplate';
import { isFunction } from 'lodash-es';

export interface ChartTooltipProps extends TooltipProps {
  content: any; // ((value, color?) => ReactNode) | JSX.Element;
  value: any;
  color: any;
  metadata: any;
}

export class ChartTooltip extends Component<ChartTooltipProps, {}> {
  static defaultProps: Partial<ChartTooltipProps> = {
    content: <TooltipTemplate />
  };

  renderContent() {
    const { content, value, metadata, color } = this.props;

    if (!value && !metadata) {
      return null;
    }

    return isFunction(content)
      ? content(metadata || value, color)
      : cloneElement(content, {
          ...content.props,
          value,
          color
        });
  }

  render() {
    const { content, value, metadata, color, ...rest } = this.props;
    return <Tooltip {...rest} content={this.renderContent.bind(this)} />;
  }
}
