import { TimeInterval } from 'd3-time';

/**
 * Reduce the ticks to the max number of ticks.
 */
function reduceTicks<T>(ticks: T[], maxTicks: number) {
  if (ticks.length > maxTicks) {
    const reduced: T[] = [];
    const modulus = Math.floor(ticks.length / maxTicks);

    for (let i = 0; i < ticks.length; i++) {
      if (i % modulus === 0) {
        reduced.push(ticks[i]);
      }
    }
    ticks = reduced;
  }

  return ticks;
}

/**
 * Determine the max ticks for the available width.
 */
function getMaxTicks(size: number, dimension: number) {
  const tickWidth = Math.max(size, 0);
  return Math.floor(dimension / tickWidth);
}

/**
 * Get the tick values from the scale.
 */
export function getTicks(
  scale: any,
  tickSize: number,
  tickValues: any[],
  dimension: number,
  interval?: number | TimeInterval
) {
  let result;

  if (tickValues) {
    result = tickValues;
  } else {
    const maxTicks = getMaxTicks(tickSize, dimension);

    if (scale.ticks) {
      if (interval) {
        result = scale.ticks(interval);
      } else {
        result = scale.ticks.apply(scale, [maxTicks]);
      }
    } else {
      tickValues = scale.domain();
      result = reduceTicks(tickValues, maxTicks);
    }
  }

  return result;
}
