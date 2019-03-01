import { histogram, extent } from 'd3-array';
import { ChartShallowDataShape } from './types';
import moment from 'moment';
import { timeDay, timeMonth, timeHour, timeMinute, timeWeek } from 'd3-time';
import { scaleTime } from 'd3-scale';

export function calculateTimeThreshold(domain: [Date, Date]) {
  // Determine delta to determine the threshold to scale
  const startDate = moment(domain[0]);
  const endDate = moment(domain[1]);
  const dayDistance = endDate.diff(startDate, 'days');

  let thresholdFn;
  let thresholdName;

  if (dayDistance >= 90) {
    thresholdFn = timeMonth;
    thresholdName = 'month';
  } else if (dayDistance >= 25) {
    thresholdFn = timeWeek;
    thresholdName = 'week';
  } else if (dayDistance >= 3) {
    thresholdFn = timeDay;
    thresholdName = 'day';
  } else {
    const hourDistance = startDate.diff(endDate, 'hours');
    if (hourDistance >= 2) {
      thresholdFn = timeHour;
      thresholdName = 'hour';
    } else {
      thresholdFn = timeMinute;
      thresholdName = 'minute';
    }
  }

  return {
    thresholdFn,
    thresholdName
  };
}

export function scaleTimeSeries(
  data: ChartShallowDataShape[],
  domain?: [Date, Date]
) {
  // If we have a small dataset no need to scale
  if (data.length < 15) {
    return { data };
  }

  // If no domain passed, determine the extent of the data
  if (!domain) {
    domain = extent(data, d => d.key as Date) as [Date, Date];
  }

  // Determine the approriate threshold given the extents
  let { thresholdFn, thresholdName } = calculateTimeThreshold(domain);

  // Calculate the bins
  const scale = scaleTime().domain(domain);
  const layout = histogram()
    .value((d: any) => d.key)
    .domain(domain as any)
    .thresholds(scale.ticks(thresholdFn) as any);
  const bins: any[] = layout(data as any);

  // Mash the bins into chart readable data
  const result: ChartShallowDataShape[] = [];
  for (const bin of bins) {
    // Map the bins to dedupe balues
    const mappedBins = {};
    for (const binVal of bin) {
      const val = binVal.data;

      if (!mappedBins[val]) {
        mappedBins[val] = [];
      }

      mappedBins[val].push({ meta: binVal.meta, id: binVal.id });
    }

    // Project mappings to normalized data format
    for (const key in mappedBins) {
      result.push({
        key: moment(bin.x0)
          .startOf(thresholdName)
          .toDate(),
        data: key,
        meta: mappedBins[key].meta,
        id: mappedBins[key].id
      });
    }
  }

  if (bins.length > 15) {
    thresholdFn = thresholdFn.every(bins.length / 10);
  }

  return {
    threshold: thresholdFn,
    thresholdName,
    data: result
  };
}
