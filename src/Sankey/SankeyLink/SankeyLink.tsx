import React, { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import posed from 'react-pose';
import { CloneElement } from '../../common/utils/children';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from '../../common/TooltipArea';
import { transition } from '../../common/utils/animations';
import { NodeExtra, Node, Link, DEFAULT_COLOR } from '../utils';
import bind from 'memoize-bind';
import { sankeyLinkHorizontal } from 'd3-sankey';
import * as css from './SankeyLink.module.scss';

export const PosedLink = posed.path({
  enter: {
    d: ({ enterProps }) => enterProps.d,
    strokeWidth: ({ enterProps }) => enterProps.strokeWidth,
    transition
  },
  exit: {
    strokeWidth: ({ exitProps }) => exitProps.strokeWidth,
    d: ({ exitProps }) => exitProps.d
  }
});

export interface SankeyLinkProps extends Link {
  active: boolean;
  animated: boolean;
  disabled: boolean;
  className?: string;
  gradient?: boolean;
  style?: object;
  chartId: string;
  tooltip: JSX.Element;
  onClick: (event: React.MouseEvent<SVGPathElement>) => void;
  onMouseEnter: (event: React.MouseEvent<SVGPathElement>) => void;
  onMouseLeave: (event: React.MouseEvent<SVGPathElement>) => void;
}

interface SankeyLinkState {
  hovered?: boolean;
}

// Set padding modifier for the tooltips
const modifiers = {
  offset: {
    offset: '0, 5px'
  }
};

export class SankeyLink extends Component<SankeyLinkProps, SankeyLinkState> {
  static defaultProps: Partial<SankeyLinkProps> = {
    active: false,
    animated: true,
    color: DEFAULT_COLOR,
    gradient: true,
    disabled: false,
    tooltip: <Tooltip followCursor={true} />,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  link = createRef<SVGPathElement>();
  state: SankeyLinkState = {};

  getLink() {
    const { index, value, y0, y1, source, target, width } = this.props;
    return { index, y0, y1, value, width, source, target };
  }

  getStroke() {
    const { color, disabled, index, gradient, chartId } = this.props;

    if (disabled) {
      return DEFAULT_COLOR;
    }

    if (gradient) {
      return `url(#${chartId}-gradient-${index})`;
    }

    return color;
  }

  onMouseEnter(event: React.MouseEvent<SVGPathElement>) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(event);
  }

  onMouseLeave(event: React.MouseEvent<SVGPathElement>) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(event);
  }

  getEnter() {
    const path = sankeyLinkHorizontal();
    const d = path(this.getLink());
    const strokeWidth = Math.max(1, this.props.width || 0);
    return { d, strokeWidth };
  }

  getExit() {
    const path = sankeyLinkHorizontal();
    const d = path({ ...this.getLink(), width: 0 });
    return { d, strokeWidth: 0 };
  }

  renderLink() {
    const {
      active,
      animated,
      className,
      color,
      gradient,
      style,
      index,
      onClick
    } = this.props;
    const useNoGradientNoColorOpacity = !gradient && color === DEFAULT_COLOR;
    const strokeOpacity = active
      ? useNoGradientNoColorOpacity
        ? 1
        : 0.5
      : 0.35;
    const enterProps = this.getEnter();

    return (
      <PosedLink
        pose="enter"
        poseKey={`sankey-link-${enterProps.d}-${index}`}
        animated={animated}
        className={classNames(css.link, className)}
        style={style}
        ref={this.link}
        enterProps={enterProps}
        exitProps={this.getExit()}
        stroke={this.getStroke()}
        strokeOpacity={strokeOpacity}
        onClick={onClick}
        onMouseEnter={bind(this.onMouseEnter, this)}
        onMouseLeave={bind(this.onMouseLeave, this)}
      />
    );
  }

  renderTooltipContent() {
    const { source, target, value } = this.props;

    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>
          {`${(source as NodeExtra).title} → ${(target as NodeExtra).title}`}
        </div>
        <div className={css.tooltipValue}>{formatValue(value)}</div>
      </div>
    );
  }

  render() {
    const { gradient, index, source, target, tooltip, chartId } = this.props;
    const { hovered } = this.state;
    const linkSource = source as Node;
    const linkTarget = target as Node;

    return (
      <Fragment>
        {gradient && (
          <linearGradient
            id={`${chartId}-gradient-${index}`}
            gradientUnits="userSpaceOnUse"
            x1={linkSource.x1}
            x2={linkTarget.x0}
          >
            <stop offset="0%" stopColor={linkSource.color} />
            <stop offset="100%" stopColor={linkTarget.color} />
          </linearGradient>
        )}
        {this.renderLink()}
        {!tooltip.props.disabled && (
          <CloneElement<TooltipProps>
            content={this.renderTooltipContent.bind(this)}
            element={tooltip}
            modifiers={modifiers}
            visible={hovered}
            reference={this.link}
          />
        )}
      </Fragment>
    );
  }
}
