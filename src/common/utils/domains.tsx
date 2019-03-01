import { min, max } from 'd3-array';

/**
 * Gets the min/max values handling nested arrays.
 */
export function extent(data: any[], attr: string): number[] {
  const accessor = (val, fn) => {
    if (Array.isArray(val.data)) {
      return fn(val.data, vv => vv[attr]);
    }
    return val[attr];
  };

  const minVal = min(data, d => accessor(d, min));
  const maxVal = max(data, d => accessor(d, max));

  return [minVal, maxVal];
}

/**
 * Get the domain for the Y Axis.
 */
export function getYDomain({ scaled, data }): number[] {
  const minMax = extent(data, 'y1');
  return scaled ? minMax : [0, minMax[1]];
}

/**
 * Get the domain for the X Axis.
 */
export function getXDomain({ data }): number[] {
  return extent(data, 'x');
}

/**
 * Returns a unique group domain.
 */
export function getGroupDomain(data: any[], attr: string): string[] {
  return data.reduce((acc, cur) => {
    const val = cur[attr];

    if (acc.indexOf(val) === -1) {
      acc.push(val);
    }

    return acc;
  }, []);
}

/**
 * Get a deeply nested group domain.
 */
export function getDeepGroupDomain(data: any[], attr: string): string[] {
  return data.reduce((acc, cur) => {
    const filtered = getGroupDomain(cur.data, attr).filter(
      d => acc.indexOf(d) === -1
    );
    acc.push(...filtered);
    return acc;
  }, []);
}
