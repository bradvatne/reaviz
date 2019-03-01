import React, { Component, Fragment } from 'react';
import { PoseGroup } from 'react-pose';
import {
  sankey,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
} from 'd3-sankey';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import { CloneElement } from '../common/utils/children';

import { getColor } from '../common/utils/color';
import { SankeyNodeProps } from './SankeyNode';
import { SankeyLinkProps } from './SankeyLink';
import { Node, Link } from './utils';
import { PoseSVGGElement } from '../common/utils/animations';
import bind from 'memoize-bind';

const JUSTIFICATION = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

type Justification = 'justify' | 'center' | 'left' | 'right';

interface SankeyProps extends ChartProps {
  animated: boolean;
  colorScheme?: ((data, index: number) => string) | string[];
  justification: Justification;
  nodeWidth: number;
  nodePadding: number;
  nodes: JSX.Element[];
  links: JSX.Element[];
}

interface SankeyState {
  activeNodes: Node[];
  activeLinks: Link[];
}

export class Sankey extends Component<SankeyProps, SankeyState> {
  static defaultProps: Partial<SankeyProps> = {
    animated: true,
    justification: 'justify',
    nodeWidth: 15,
    nodePadding: 10
  };

  state: SankeyState = { activeNodes: [], activeLinks: [] };

  getColor(node: JSX.Element, index: any) {
    const { colorScheme, nodes } = this.props;

    if (colorScheme) {
      return Array.isArray(colorScheme)
        ? getColor(colorScheme, nodes)(index)
        : colorScheme(node, index);
    } else {
      return node.props.color;
    }
  }

  onNodeActive(node: Node) {
    const activeNodes: Node[] = [node];
    const activeLinks: Link[] = [];

    if (node.sourceLinks) {
      activeLinks.push(...node.sourceLinks);
      node.sourceLinks.forEach(sourceLink => {
        const sourceLinkTarget = sourceLink.target as Node;
        if (sourceLinkTarget.index !== node.index) {
          activeNodes.push(sourceLinkTarget);
        }
      });
    }

    if (node.targetLinks) {
      activeLinks.push(...node.targetLinks);
      node.targetLinks.forEach(targetLink => {
        const targetLinkSource = targetLink.source as Node;
        if (targetLinkSource.index !== node.index) {
          activeNodes.push(targetLinkSource);
        }
      });
    }

    this.setState({ activeNodes, activeLinks });
  }

  onLinkActive(link: Link) {
    const activeNodes: Node[] = [link.source as Node, link.target as Node];
    const activeLinks: Link[] = [link];

    this.setState({ activeNodes, activeLinks });
  }

  onInactive() {
    this.setState({ activeNodes: [], activeLinks: [] });
  }

  renderNode(computedNode: Node, index: number, chartWidth: number) {
    const { animated, nodes } = this.props;
    const { activeNodes } = this.state;
    const active = activeNodes.some(node => node.index === computedNode.index);
    const disabled = activeNodes.length > 0 && !active;

    return (
      <CloneElement<SankeyNodeProps>
        element={nodes[index]}
        key={`node-${index}`}
        active={active}
        animated={animated}
        disabled={disabled}
        chartWidth={chartWidth}
        onMouseEnter={bind(this.onNodeActive, this, computedNode)}
        onMouseLeave={bind(this.onInactive, this, computedNode)}
        {...computedNode}
      />
    );
  }

  renderNodes(nodes: Node[], chartWidth: number) {
    nodes.sort((a, b) => {
      const aX0 = a && a.x0 ? a.x0 : 0;
      const aY0 = a && a.y0 ? a.y0 : 0;
      const bX0 = b && b.x0 ? b.x0 : 0;
      const bY0 = b && b.y0 ? b.y0 : 0;

      return aX0 - bX0 || aY0 - bY0;
    });

    return (
      <Fragment>
        {nodes.map((node, index) => this.renderNode(node, index, chartWidth))}
      </Fragment>
    );
  }

  renderLink(computedLink: Link, index: number) {
    const { animated, links, id } = this.props;
    const { activeLinks } = this.state;
    const active = activeLinks.some(link => link.index === computedLink.index);
    const disabled = activeLinks.length > 0 && !active;

    return (
      <CloneElement<SankeyLinkProps>
        element={links[index]}
        active={active}
        animated={animated}
        key={`link-${index}`}
        chartId={id}
        disabled={disabled}
        {...computedLink}
        onMouseEnter={bind(this.onLinkActive, this, computedLink)}
        onMouseLeave={bind(this.onInactive, this, computedLink)}
      />
    );
  }

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartWidth, chartHeight } = containerProps;
    const { justification, nodeWidth, nodePadding } = this.props;

    const nodesCopy: Node[] = this.props.nodes.map((node, index) => ({
      id: node.props.id,
      title: node.props.title,
      color: this.getColor(node, index)
    }));

    const linksCopy: Link[] = this.props.links.map(link => ({
      source: link.props.source,
      target: link.props.target,
      value: link.props.value
    }));

    const sankeyChart = sankey()
      .extent([[1, 1], [chartWidth, chartHeight]])
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeAlign(JUSTIFICATION[justification])
      .nodeId((node: any) => node.id || node.index);

    const { nodes, links } = sankeyChart({
      nodes: nodesCopy,
      links: linksCopy
    });

    return (
      containerProps.chartSized && (
        <PoseGroup animateOnMount={this.props.animated}>
          <PoseSVGGElement key="group">
            {links.map((link, index) => this.renderLink(link as Link, index))}
            {this.renderNodes(nodes as Node[], chartWidth)}
          </PoseSVGGElement>
        </PoseGroup>
      )
    );
  }

  render() {
    const { id, width, height, margins, className } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        className={className}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
