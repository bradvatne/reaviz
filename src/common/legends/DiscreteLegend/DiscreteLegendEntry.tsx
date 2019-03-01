import React, { Component, ReactNode } from 'react';
import * as css from './DiscreteLegendEntry.module.scss';
import classNames from 'classnames';
import {
  DiscreteLegendSymbol,
  DiscreteLegendSymbolProps
} from './DiscreteLegendSymbol';
import { CloneElement } from '../../utils/children';

export interface DiscreteLegendEntryProps {
  label: string;
  color: string;
  symbol: JSX.Element | ReactNode;
  active?: boolean;
  style?: any;
  className?: any;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class DiscreteLegendEntry extends Component<
  DiscreteLegendEntryProps,
  {}
> {
  static defaultProps: Partial<DiscreteLegendEntryProps> = {
    symbol: <DiscreteLegendSymbol />,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined,
    onClick: () => undefined
  };

  render() {
    const {
      label,
      symbol,
      onMouseEnter,
      onMouseLeave,
      color,
      style,
      onClick,
      active
    } = this.props;
    const className = classNames(css.entry, this.props.className, {
      [css.inactive]: active === false
    });

    return (
      <div
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
      >
        <CloneElement<DiscreteLegendSymbolProps>
          element={symbol}
          className={css.symbol}
          color={color}
        />
        <span className={css.label}>{label}</span>
      </div>
    );
  }
}
