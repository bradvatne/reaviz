import { median } from 'd3-array';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartDataShape,
  ChartShallowDataShape,
  ChartNestedDataShape,
  ChartInternalShallowDataShape
} from './types';
import {
  getMaxBigInteger,
  normalizeValue,
  normalizeValueForFormatting
} from './bigInteger';
import { isMultiSeries } from './multiSeries';

export type Direction = 'vertical' | 'horizontal';

/**
 * Discriminator for ChartInternalDataShape
 */
export const isNested = (
  t: ChartInternalDataShape
): t is ChartInternalNestedDataShape =>
  (t as ChartInternalNestedDataShape).data !== undefined;

/**
 * Transforms the data from a chart shape to internally readable format.
 */
export function buildChartData(
  series: ChartDataShape[],
  sort = false,
  direction = 'horizontal'
): ChartInternalDataShape[] {
  if (isMultiSeries(series)) {
    return buildNestedChartData(
      series as ChartNestedDataShape[],
      sort,
      direction
    );
  } else {
    return buildShallowChartData(series as ChartShallowDataShape[], direction);
  }
}

/**
 * Accepts a `ChartDataShape` and transforms it to a chart readable data shape.
 *
 * Example:
 *
 *   [{
 *    key: 'Threat Intel',
 *    data: [{ key:'2011', data: 25 }]
 *   }]
 *
 * will be transformed to:
 *
 *  [{
 *    key: 'Threat Intel',
 *    data: [
 *      key: 'Threat Intel',
 *      x: '2011',
 *      y: 25
 *    ]
 *  }]
 */
export function buildNestedChartData(
  series: ChartNestedDataShape[],
  sort = false,
  direction = 'horizontal'
): ChartInternalNestedDataShape[] {
  let result: ChartInternalNestedDataShape[] = [];
  const maxBigInteger = getMaxBigInteger(series);

  for (const point of series) {
    for (const nestedPoint of point.data) {
      const key = normalizeValueForFormatting(point.key);
      let idx = result.findIndex(r => {
        const left = r.key;
        if (left instanceof Date && key instanceof Date) {
          return left.getTime() === key.getTime();
        }
        return left === key;
      });

      if (idx === -1) {
        result.push({
          key,
          data: []
        });

        idx = result.length - 1;
      }

      const x = normalizeValue(
        direction === 'horizontal' ? nestedPoint.key : nestedPoint.data,
        maxBigInteger
      );

      const y = normalizeValue(
        direction === 'horizontal' ? nestedPoint.data : nestedPoint.key,
        maxBigInteger
      );

      result[idx].data.push({
        key,
        value: normalizeValueForFormatting(nestedPoint.data),
        meta: point.meta,
        id: point.id,
        x,
        x0: x,
        x1: x,
        y,
        y0: 0,
        y1: y
      });
    }
  }

  // Sort the series data based on the median value
  if (sort) {
    result = result.sort((a, b) => {
      const aMax = median(a.data, (d: any) => d.y)!;
      const bMax = median(b.data, (d: any) => d.y)!;
      return aMax < bMax ? 1 : -1;
    });
  }

  return result;
}

/**
 * Accepts a shallow shape and normalizes it to a chart readable format.
 */
export function buildShallowChartData(
  series: ChartShallowDataShape[],
  direction = 'horizontal'
): ChartInternalShallowDataShape[] {
  const result: ChartInternalShallowDataShape[] = [];
  const maxBigInteger = getMaxBigInteger(series);

  for (const point of series) {
    const x = normalizeValue(
      direction === 'horizontal' ? point.key : point.data,
      maxBigInteger
    );

    const y = normalizeValue(
      direction === 'horizontal' ? point.data : point.key,
      maxBigInteger
    );

    result.push({
      key: normalizeValueForFormatting(point.key),
      value: normalizeValueForFormatting(point.data),
      meta: point.meta,
      id: point.id,
      x,
      x0: x,
      x1: x,
      y,
      y0: 0,
      y1: y
    });
  }

  return result;
}
