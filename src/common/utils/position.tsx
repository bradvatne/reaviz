import { bisector } from 'd3-array';

/**
 * Given an event, get the relative X/Y position for a target.
 */
export function getPositionForTarget({ target, clientX, clientY }) {
  const { top, left } = target.getBoundingClientRect();
  return {
    x: clientX - left - target.clientLeft,
    y: clientY - top - target.clientTop
  };
}

/**
 * Get the point from a touch event.
 */
export function getPointFromTouch(touch: Touch, target: SVGElement) {
  const { top, left } = target.getBoundingClientRect();
  return {
    x: touch.clientX - left - target.clientLeft,
    y: touch.clientY - top - target.clientTop
  };
}

/**
 * Given a point position, get the closes data point in the dataset.
 */
export function getClosestPoint(pos: number, scale, data, attr = 'x') {
  const domain = scale.invert(pos);

  // Select the index
  const bisect = bisector((d: any) => d[attr]).right;
  const index = bisect(data, domain);

  // Determine min index
  const minIndex = Math.max(0, index - 1);
  const before = data[minIndex];

  // Determine max index
  const maxIndex = Math.min(data.length - 1, index);
  const after = data[maxIndex];

  // Determine which is closest to the point
  let beforeVal = before[attr];
  let afterVal = after[attr];
  beforeVal = domain - beforeVal;
  afterVal = afterVal - domain;

  return beforeVal < afterVal ? before : after;
}
