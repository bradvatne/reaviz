/**
 * Gets the position between a given set of points.
 */
export const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2
});

/**
 * Gets the distance between a given set of points.
 */
export const getDistanceBetweenPoints = (pointA, pointB) =>
  Math.sqrt(
    Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2)
  );

/**
 * Gets the value between a set of numeric values.
 */
export const between = (min, max, value) => Math.min(max, Math.max(min, value));
