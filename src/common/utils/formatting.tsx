import { ChartInternalDataTypes } from '../data';
import { isNumber, isDate } from 'lodash-es';
import moment from 'moment';

/**
 * Format a value based on type.
 */
export function formatValue(value: ChartInternalDataTypes): string {
  if (value !== undefined) {
    if (isDate(value)) {
      return moment(value).format('MM/DD/YY');
    } else if (isNumber(value)) {
      return value.toLocaleString();
    }

    return value;
  }

  return 'No value';
}
