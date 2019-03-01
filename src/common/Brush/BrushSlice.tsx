import React, { Component, Fragment } from 'react';
import * as bind from 'memoize-bind';
import { BrushHandle } from './BrushHandle';
import * as css from './BrushSlice.module.scss';
import { Pan, PanMoveEvent } from '../Gestures/Pan';

export interface BrushChangeEvent {
  start?: number;
  end?: number;
}

interface BrushSliceProps {
  height: number;
  width: number;
  start: number;
  end: number;
  onBrushChange: (event: BrushChangeEvent) => void;
}

interface BrushSliceState {
  isDragging: boolean;
}

export class BrushSlice extends Component<BrushSliceProps, BrushSliceState> {
  state: BrushSliceState = {
    isDragging: false
  };

  onPanStart() {
    this.setState({
      isDragging: true
    });
  }

  onPanMove(event: PanMoveEvent) {
    const start = this.props.start + event.delta;
    const end = this.props.end + event.delta;

    if (start >= 0 && end <= this.props.width) {
      this.props.onBrushChange({
        start,
        end
      });
    }
  }

  onPanEnd() {
    this.setState({
      isDragging: false
    });
  }

  onHandleDrag(direction: 'start' | 'end', deltaX: number) {
    const start =
      direction === 'start' ? this.props.start + deltaX : this.props.start;
    const end =
      direction !== 'start' ? this.props.end + deltaX : this.props.end;

    this.props.onBrushChange({
      start,
      end
    });
  }

  render() {
    const { height, start, end, width } = this.props;
    const { isDragging } = this.state;
    const sliceWidth = Math.max(end - start, 0);
    const endSliceWidth = Math.max(width - end, 0);
    const hasNoSlice = start === 0 && end === width;

    return (
      <Fragment>
        <rect className={css.unsliced} height={height} width={start} />
        <rect
          transform={`translate(${end}, 0)`}
          className={css.unsliced}
          height={height}
          width={endSliceWidth}
        />
        <g transform={`translate(${start}, 0)`}>
          <Pan
            disabled={hasNoSlice}
            onPanStart={bind(this.onPanStart, this)}
            onPanMove={bind(this.onPanMove, this)}
            onPanEnd={bind(this.onPanEnd, this)}
            cursor="grabbing"
          >
            <rect
              className={css.slice}
              height={height}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                opacity: hasNoSlice ? 0 : 0.1,
                pointerEvents: !hasNoSlice ? 'initial' : 'none'
              }}
              width={sliceWidth}
            />
          </Pan>
          <g transform={`translate(-4, 0)`}>
            <BrushHandle
              height={height}
              onHandleDrag={bind(this.onHandleDrag, this, 'start')}
            />
          </g>
          <g transform={`translate(${sliceWidth - 5}, 0)`}>
            <BrushHandle
              height={height}
              onHandleDrag={bind(this.onHandleDrag, this, 'end')}
            />
          </g>
        </g>
      </Fragment>
    );
  }
}
