import { scaleOrdinal } from 'd3-scale';
import { range } from 'd3-array';

export const sequentialScheme = ['#3ec4e8'];

/**
 * Get a color given a range.
 */
export function getColor(colorScheme: string[], data: any[]) {
  const dataRange = range(data.length).map(r => r.toString());
  return scaleOrdinal(colorScheme).domain(dataRange);
}
