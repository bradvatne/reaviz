import React, { Fragment, Component } from 'react';
import { formatValue } from '../utils/formatting';
import { ChartInternalDataTypes } from '../data';
import * as css from './TooltipTemplate.module.scss';

interface SingleTooltipValue {
  key?: ChartInternalDataTypes;
  value?: ChartInternalDataTypes;
  x: ChartInternalDataTypes;
  y: ChartInternalDataTypes;
}

interface MultipleTooltipValues {
  x: ChartInternalDataTypes;
  data: SingleTooltipValue[];
}

interface TooltipTemplateProps {
  value?: SingleTooltipValue | MultipleTooltipValues;
  color?: any;
  className?: any;
}

export class TooltipTemplate extends Component<TooltipTemplateProps, {}> {
  renderValues(data: SingleTooltipValue, index: number) {
    const { color } = this.props;
    const fill = color(data, index);

    return (
      <span className={css.subValue}>
        <span className={css.subValueColor} style={{ backgroundColor: fill }} />
        <span className={css.subValueName}>
          {formatValue(data.key || data.x)}:
        </span>
        <span className={css.subValueValue}>
          {formatValue(data.value || data.y)}
        </span>
      </span>
    );
  }

  render() {
    const { value, className } = this.props;

    if (!value) {
      return null;
    }

    const isMultiple = Array.isArray((value as any).data);

    return (
      <div className={className}>
        <div className={css.label}>{formatValue(value!.x)}</div>
        <div className={css.value}>
          {isMultiple &&
            (value as MultipleTooltipValues).data.map((point, i) => (
              <Fragment key={i}>{this.renderValues(point, i)}</Fragment>
            ))}
          {!isMultiple && (
            <Fragment>
              {formatValue(
                (value as SingleTooltipValue).value ||
                  (value as SingleTooltipValue).y
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
