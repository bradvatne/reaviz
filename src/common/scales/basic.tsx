import {
  scaleLinear,
  scaleTime,
  scaleBand,
  ScaleBand,
  ScalePoint,
  ScaleTime,
  ScaleLinear
} from 'd3-scale';
import { getXDomain, getYDomain, getGroupDomain } from '../utils/domains';
import {
  ChartInternalShallowDataShape,
  isMultiSeries,
  ChartInternalNestedDataShape
} from '../data';

interface ScaleConfig {
  type: 'category' | 'value' | 'time';
  roundDomains: boolean;
  data: any[];
  domain?: any[];
  padding?: number;
  scaled?: boolean;
  width?: number;
  height?: number;
}

/**
 * Gets the X Scale function.
 */
export function getXScale({
  type,
  roundDomains,
  data,
  width,
  domain,
  padding
}: ScaleConfig): ScalePoint<any> | ScaleBand<any> | ScaleTime<any, any> {
  let scale;

  if (type === 'time' || type === 'value') {
    if (type === 'time') {
      scale = scaleTime().rangeRound([0, width!]);
    } else {
      scale = scaleLinear().rangeRound([0, width!]);
    }

    domain = domain || getXDomain({ data });
    scale = scale.domain(domain);
  } else if (type === 'category') {
    scale = scaleBand()
      .rangeRound([0, width!])
      .padding(padding || 0);

    if (!domain) {
      const isMulti = isMultiSeries(data);
      if (isMulti) {
        domain = getGroupDomain(data as ChartInternalNestedDataShape[], 'key');
      } else {
        domain = getGroupDomain(data as ChartInternalShallowDataShape[], 'x');
      }
    }

    scale = scale.domain(domain);
  }

  return roundDomains ? scale.nice() : scale;
}

/**
 * Gets the Y Scale function.
 */
export function getYScale({
  type,
  roundDomains,
  height,
  data,
  domain,
  scaled
}: ScaleConfig): ScaleLinear<any, any> {
  let scale;
  if (type === 'time' || type === 'value') {
    scale = scaleLinear()
      .range([height!, 0])
      .domain(domain || getYDomain({ scaled, data }));
  } else {
    domain =
      domain || getGroupDomain(data as ChartInternalShallowDataShape[], 'y');
    scale = scaleBand()
      .rangeRound([height!, 0])
      .domain(domain);
  }

  return roundDomains ? scale.nice() : scale;
}
