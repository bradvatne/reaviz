import React, { Component } from 'react';
import * as bind from 'memoize-bind';
import classNames from 'classnames';
import { range } from 'd3-array';
import { Pan, PanMoveEvent } from '../Gestures/Pan';
import * as css from './BrushHandle.module.scss';

interface BrushHandleProps {
  height: number;
  onHandleDrag: (deltaX: number) => void;
}

interface BrushHandleState {
  isDragging: boolean;
}

export class BrushHandle extends Component<BrushHandleProps, BrushHandleState> {
  state: BrushHandleState = {
    isDragging: false
  };

  onPanStart() {
    this.setState({
      isDragging: true
    });
  }

  onPanMove(event: PanMoveEvent) {
    this.props.onHandleDrag(event.delta);
  }

  onPanEnd() {
    this.setState({
      isDragging: false
    });
  }

  render() {
    const { height } = this.props;
    const { isDragging } = this.state;

    return (
      <Pan
        onPanStart={bind(this.onPanStart, this)}
        onPanMove={bind(this.onPanMove, this)}
        onPanEnd={bind(this.onPanEnd, this)}
        cursor="ew-resize"
      >
        <g>
          <line className={css.line} y1="0" y2={height} x1="5" x2="5" />
          <rect
            className={classNames(css.handle, { [css.dragging]: isDragging })}
            height={height - 10}
            style={{ cursor: 'ew-resize' }}
            width={8}
            y="5"
            y1={height - 5}
          />
          <g
            transform={`translate(-1, ${height / 2 - 10})`}
            style={{ pointerEvents: 'none' }}
          >
            {range(5).map(i => (
              <circle cy={i * 5} cx="5" r=".5" key={i} className={css.dot} />
            ))}
          </g>
        </g>
      </Pan>
    );
  }
}
