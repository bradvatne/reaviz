import { curveLinear, curveMonotoneX, curveStep } from 'd3-shape';

export type InterpolationTypes = 'linear' | 'smooth' | 'step';

/**
 * Helper function for interpolation.
 */
export function interpolate(type: InterpolationTypes) {
  if (type === 'smooth') {
    return curveMonotoneX;
  } else if (type === 'step') {
    return curveStep;
  } else {
    return curveLinear;
  }
}
