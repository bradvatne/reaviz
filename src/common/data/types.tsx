export type ChartDataTypes = ChartInternalDataTypes | bigInt.BigInteger;

export type ChartInternalDataTypes = number | string | Date;

export interface ChartNestedDataShape {
  key: ChartDataTypes;
  data: ChartShallowDataShape[];
  meta?: any;
  id?: string;
}

export interface ChartShallowDataShape {
  key: ChartDataTypes;
  data: ChartDataTypes;
  meta?: any;
  id?: string;
}

export type ChartDataShape = ChartNestedDataShape | ChartShallowDataShape;

export interface ChartInternalNestedDataShape {
  key: ChartInternalDataTypes;
  data: ChartInternalShallowDataShape[];
  meta?: any;
  id?: string;
}

export interface ChartInternalShallowDataShape {
  key?: ChartInternalDataTypes;
  x?: ChartInternalDataTypes;
  x0: ChartInternalDataTypes;
  x1?: ChartInternalDataTypes;
  y: ChartInternalDataTypes;
  y0?: ChartInternalDataTypes;
  y1: ChartInternalDataTypes;
  value?: ChartInternalDataTypes;
  meta?: any;
  id?: string;
}

export type ChartInternalDataShape =
  | ChartInternalShallowDataShape
  | ChartInternalNestedDataShape;
