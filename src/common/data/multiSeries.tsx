import { ChartInternalNestedDataShape } from './types';

/**
 * Returns if the data shape is a multi-series format.
 */
export function isMultiSeries(data) {
  const series = data as ChartInternalNestedDataShape[];
  return series && series.length && Array.isArray(series[0].data);
}
