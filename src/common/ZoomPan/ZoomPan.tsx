import React, { Component } from 'react';
import bind from 'memoize-bind';
import { Pan, PanMoveEvent } from '../Gestures/Pan';
import { Zoom, ZoomEvent } from '../Gestures/Zoom';
import { value, decay, ValueReaction, ColdSubscription } from 'popmotion';
import { clamp } from '@popmotion/popcorn';

export interface ZoomPanEvent {
  scale: number;
  offset: number;
}

export interface ZoomPanProps {
  height: number;
  width: number;
  scale: number;
  offset: number;
  pannable: boolean;
  zoomable: boolean;
  disabled?: boolean;
  maxZoom: number;
  zoomStep: number;
  decay: boolean;
  disableMouseWheel?: boolean;
  onZoomPan: (event: ZoomPanEvent) => void;
}

interface ZoomPanState {
  isZooming: boolean;
  isPanning: boolean;
}

export class ZoomPan extends Component<ZoomPanProps, ZoomPanState> {
  static defaultProps: ZoomPanProps = {
    maxZoom: 10,
    zoomStep: 0.1,
    pannable: true,
    zoomable: true,
    decay: true,
    height: 0,
    width: 0,
    offset: 0,
    scale: 1,
    onZoomPan: () => undefined
  };

  observer?: ValueReaction;
  decay?: ColdSubscription;
  rqf?: any;

  constructor(props: ZoomPanProps) {
    super(props);

    this.state = {
      isZooming: false,
      isPanning: false
    };
  }

  componentWillUnmount() {
    this.stopDecay();
  }

  stopDecay() {
    if (this.decay && this.decay.stop) {
      this.decay.stop();
    }

    if (this.observer) {
      this.observer.complete();
    }
  }

  getEndOffset() {
    const { width, scale } = this.props;
    return width * scale! - width;
  }

  ensureRange(delta: number) {
    const prevOffset = this.props.offset;
    let newOffset = delta + prevOffset;

    if (-newOffset <= 0) {
      newOffset = 0;
    } else if (-newOffset > this.getEndOffset()) {
      newOffset = prevOffset;
    }

    return newOffset;
  }

  onPanStart() {
    this.setState({
      isPanning: true
    });

    this.stopDecay();
    this.observer = value(this.props.offset);
  }

  onPanMove(event: PanMoveEvent) {
    if (this.props.scale > 1) {
      const offset = this.ensureRange(event.delta);
      this.observer && this.observer.update(offset);
      this.props.onZoomPan({
        scale: this.props.scale,
        offset
      });
    }
  }

  onPanEnd() {
    if (this.observer && this.props.decay) {
      const end = this.getEndOffset();
      this.decay = decay({
        from: this.observer.get(),
        velocity: this.observer.getVelocity()
      })
        .pipe(clamp(-end, 0))
        .start({
          update: offset => {
            cancelAnimationFrame(this.rqf);
            this.rqf = requestAnimationFrame(() => {
              this.props.onZoomPan({
                scale: this.props.scale,
                offset
              });
            });
          },
          complete: () => this.setState({ isPanning: false })
        });
    } else {
      this.setState({ isPanning: false });
    }
  }

  onZoom(event: ZoomEvent) {
    this.stopDecay();
    this.props.onZoomPan(event);
  }

  onZoomEnd() {
    this.setState({
      isZooming: false
    });
  }

  render() {
    const {
      height,
      width,
      children,
      disabled,
      pannable,
      maxZoom,
      zoomStep,
      zoomable,
      scale,
      offset,
      disableMouseWheel
    } = this.props;
    const { isZooming, isPanning } = this.state;
    const canPan = pannable && scale > 1;
    const cursor = canPan ? 'move' : 'auto';
    const selection = isZooming || isPanning ? 'none' : 'auto';

    return (
      <Pan
        disabled={!canPan || disabled}
        onPanStart={bind(this.onPanStart, this)}
        onPanMove={bind(this.onPanMove, this)}
        onPanEnd={bind(this.onPanEnd, this)}
      >
        <g>
          <Zoom
            disabled={!zoomable || disabled}
            disableMouseWheel={disableMouseWheel}
            maxZoom={maxZoom}
            zoomStep={zoomStep}
            scale={scale}
            offset={offset}
            onZoom={bind(this.onZoom, this)}
            onZoomEnd={bind(this.onZoomEnd, this)}
          >
            <g style={{ cursor }}>
              {!disabled && <rect height={height} width={width} opacity={0} />}
              <g
                style={{
                  pointerEvents: selection,
                  userSelect: selection
                }}
              >
                {children}
              </g>
            </g>
          </Zoom>
        </g>
      </Pan>
    );
  }
}
