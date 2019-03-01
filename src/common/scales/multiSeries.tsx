import { scaleBand } from 'd3-scale';
import { getGroupDomain, getDeepGroupDomain } from '../utils/domains';

/**
 * Get the group scale aka x0.
 */
export function getGroupScale({ height, width, padding, data }) {
  const domain = getGroupDomain(data, 'key');
  const spacing = domain.length / (height / padding + 1);

  return scaleBand()
    .rangeRound([0, width])
    .paddingInner(spacing)
    .paddingOuter(spacing / 2)
    .domain(domain as string[]);
}

/**
 * Get the inner scale aka x1.
 */
export function getInnerScale({ groupScale, padding, data }) {
  const width = groupScale.bandwidth();
  const domain = getDeepGroupDomain(data, 'x');
  const spacing = domain.length / (width / padding + 1);

  return scaleBand()
    .rangeRound([0, width])
    .paddingInner(spacing)
    .domain(domain as string[]);
}
