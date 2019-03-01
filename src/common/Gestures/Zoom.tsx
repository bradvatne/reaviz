import React, { Component, createRef } from 'react';
import { toggleTextSelection } from '../utils/selection';
import { getPointFromTouch, getPositionForTarget } from '../utils/position';
import { getDistanceBetweenPoints, between, getMidpoint } from './pinchUtils';

interface ZoomGestureProps {
  disabled?: boolean;
  maxZoom: number;
  zoomStep: number;
  scale: number;
  offset: number;
  disableMouseWheel?: boolean;
  onZoom: (event: ZoomEvent) => void;
  onZoomEnd: () => void;
}

export interface ZoomEvent {
  scale: number;
  offset: number;
}

export class Zoom extends Component<ZoomGestureProps, {}> {
  lastDistance: any;
  firstMidpoint: any;
  timeout: any;
  childRef = createRef<SVGGElement>();

  componentDidMount() {
    if (!this.props.disabled) {
      // Manually bind due to pinch issues not being prevented
      // https://github.com/facebook/react/issues/9809
      if (this.childRef.current) {
        this.childRef.current.addEventListener('touchstart', this.onTouchStart);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    toggleTextSelection(true);
  }

  onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2 && this.childRef.current) {
      event.preventDefault();
      event.stopPropagation();
      toggleTextSelection(false);

      const pointA = getPointFromTouch(event.touches[0], this.childRef.current);
      const pointB = getPointFromTouch(event.touches[1], this.childRef.current);
      this.lastDistance = getDistanceBetweenPoints(pointA, pointB);
      this.firstMidpoint = getMidpoint(pointA, pointB);

      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onTouchEnd);
    }
  };

  onTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 2 && this.childRef.current) {
      event.preventDefault();
      event.stopPropagation();

      const pointA = getPointFromTouch(event.touches[0], this.childRef.current);
      const pointB = getPointFromTouch(event.touches[1], this.childRef.current);
      const distance = getDistanceBetweenPoints(pointA, pointB);

      const { maxZoom, zoomStep, offset, scale } = this.props;
      const delta = distance - this.lastDistance;
      const ratio = Math.exp((delta / 30) * zoomStep);
      const newScale = between(1, maxZoom, scale * ratio);
      const newOffset = Math.min(
        (offset - this.firstMidpoint.x) * ratio + this.firstMidpoint.x,
        0
      );

      if (scale < this.props.maxZoom) {
        this.props.onZoom({
          scale: newScale,
          offset: newOffset
        });
      }

      this.lastDistance = distance;
    }
  };

  onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    toggleTextSelection(true);
    this.props.onZoomEnd();
  };

  onWheel(event: React.MouseEvent) {
    const {
      disabled,
      maxZoom,
      zoomStep,
      scale,
      offset,
      onZoomEnd,
      disableMouseWheel
    } = this.props;

    if (!disabled && !disableMouseWheel) {
      const nativeEvent = event.nativeEvent as WheelEvent;
      const positions = getPositionForTarget(nativeEvent);
      const wheel = (nativeEvent.deltaY / 120) * -1;
      const ratio = Math.exp(wheel * zoomStep);
      const roundedScale = Math.ceil(scale * ratio);
      const inBounds = roundedScale <= maxZoom && roundedScale >= 1;

      if (inBounds && roundedScale !== scale) {
        event.preventDefault();

        const newScale = between(1, maxZoom, scale * ratio);
        const newOffset = Math.min(
          (offset - positions.x) * ratio + positions.x,
          0
        );

        this.props.onZoom({
          scale: newScale,
          offset: newOffset
        });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          onZoomEnd();
        }, 500);
      }
    }
  }

  render() {
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        ...child.props,
        ref: this.childRef,
        onWheel: e => {
          this.onWheel(e);
          if (child.props.onWheel) {
            child.props.onWheel(e);
          }
        }
      })
    );
  }
}
