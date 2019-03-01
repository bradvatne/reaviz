import { ChartInternalDataTypes } from '../data';
import { isNumber, isDate } from 'lodash-es';

/**
 * Format a value based on type.
 */
export function formatValue(value: ChartInternalDataTypes): string {
  if (value !== undefined) {
    if (isDate(value) || isNumber(value)) {
      return value.toLocaleString();
    }

    return value as string;
  }

  return 'No value';
}
