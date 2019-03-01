import React, { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import posed from 'react-pose';
import { ChartInternalDataTypes } from '../../common/data';
import { CloneElement } from '../../common/utils/children';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from '../../common/TooltipArea';
import { SankeyLabel, SankeyLabelProps } from '../SankeyLabel';
import { Node, DEFAULT_COLOR } from '../utils';
import * as bind from 'memoize-bind';
import * as css from './SankeyNode.module.scss';
import { transition } from '../../common/utils/animations';

export const PosedNode = posed.rect({
  enter: {
    x: ({ x0 }) => x0,
    opacity: 1,
    transition: {
      ...transition,
      opacity: {
        type: 'tween',
        ease: 'linear',
        duration: 250
      }
    }
  },
  exit: {
    x: ({ x0 }) => x0,
    opacity: 0
  }
});

export interface SankeyNodeProps extends Node {
  active: boolean;
  animated: boolean;
  disabled: boolean;
  className?: string;
  style?: object;
  chartWidth?: number;
  width?: number;
  label: JSX.Element;
  tooltip: JSX.Element;
  showLabel: boolean;
  onClick: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseEnter: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseLeave: (event: React.MouseEvent<SVGRectElement>) => void;
}

interface SankeyNodeState {
  hovered?: boolean;
}

// Set padding modifier for the tooltips
const modifiers = {
  offset: {
    offset: '0, 5px'
  }
};

export class SankeyNode extends Component<SankeyNodeProps, SankeyNodeState> {
  static defaultProps: Partial<SankeyNodeProps> = {
    active: false,
    animated: true,
    color: DEFAULT_COLOR,
    disabled: false,
    label: <SankeyLabel />,
    tooltip: <Tooltip />,
    showLabel: true,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  state: SankeyNodeState = {};
  rect = createRef<SVGRectElement>();

  getNode() {
    const {
      id,
      title,
      color,
      sourceLinks,
      targetLinks,
      value,
      index,
      x0,
      x1,
      y0,
      y1
    } = this.props;

    return {
      id,
      title,
      color,
      sourceLinks,
      targetLinks,
      value,
      index,
      x0,
      x1,
      y0,
      y1
    };
  }

  onMouseEnter(event: React.MouseEvent<SVGRectElement>) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(event);
  }

  onMouseLeave(event: React.MouseEvent<SVGRectElement>) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(event);
  }

  renderNode() {
    const {
      disabled,
      className,
      style,
      color,
      width,
      index,
      x0,
      x1,
      y0,
      y1,
      onClick
    } = this.props;
    const nodeWidth = width || (x1 && x0 ? x1 - x0 : 0);
    const nodeHeight = y1 && y0 ? y1 - y0 : 0;

    return (
      <PosedNode
        pose="enter"
        poseKey={`sankey-node-${x0}-${x1}-${y0}-${y1}-${index}`}
        className={classNames(css.node, className)}
        style={style}
        ref={this.rect}
        x={x0}
        y={y0}
        width={nodeWidth}
        height={nodeHeight}
        fill={disabled ? DEFAULT_COLOR : color}
        onClick={onClick}
        onMouseEnter={bind(this.onMouseEnter, this)}
        onMouseLeave={bind(this.onMouseLeave, this)}
      />
    );
  }

  renderTooltipContent() {
    const { title, value } = this.props;

    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>{title}</div>
        <div className={css.tooltipValue}>
          {formatValue(value as ChartInternalDataTypes)}
        </div>
      </div>
    );
  }

  render() {
    const { active, chartWidth, label, tooltip, showLabel } = this.props;
    const { hovered } = this.state;

    return (
      <Fragment>
        {this.renderNode()}
        {showLabel && (
          <CloneElement<SankeyLabelProps>
            active={active}
            element={label}
            chartWidth={chartWidth}
            node={this.getNode()}
          />
        )}
        {!tooltip.props.disabled && (
          <CloneElement<TooltipProps>
            content={this.renderTooltipContent.bind(this)}
            element={tooltip}
            modifiers={modifiers}
            visible={hovered}
            reference={this.rect}
          />
        )}
      </Fragment>
    );
  }
}
