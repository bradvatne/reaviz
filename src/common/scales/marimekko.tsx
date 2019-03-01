import { scaleLinear } from 'd3-scale';
import { getGroupDomain } from '../utils/domains';
import { ChartInternalNestedDataShape } from '../data';

interface MariemkoScaleData {
  data: ChartInternalNestedDataShape[];
  width: number;
  valueScale: any;
  padding: number;
}

/**
 * Get a linear scale for the mariemko chart.
 */
export function getMarimekkoScale(width: number, roundDomains: boolean) {
  const scale = scaleLinear().rangeRound([0, width]);
  return roundDomains ? scale.nice() : scale;
}

/**
 * Builds a fake scale function to get a group scale for a marimekko value scale.
 */
export function getMarimekkoGroupScale({
  data,
  width,
  valueScale,
  padding
}: MariemkoScaleData) {
  const domain = getGroupDomain(data, 'key');
  const barCount = data.length;
  const widthMinusPadding = width - padding * (barCount - 1);
  const xMultiplier = widthMinusPadding / width;

  const scale: any = arg => {
    let result = 0;
    const index = data.findIndex(d => d.key === arg);
    const series = data[index];

    if (series && series.data && series.data.length) {
      const [val] = series.data;
      const x0 = valueScale(val.x0);
      const x1 = valueScale(val.x1);
      result = (x1 - x0) / 2 + x0;

      if (padding) {
        result = result * xMultiplier + index * padding;
      }
    }

    return result;
  };

  scale.range = () => [0, width];
  scale.domain = () => domain;

  return scale;
}
