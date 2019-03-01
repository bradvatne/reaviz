import {
  transition,
  VELOCITY,
  DAMPING
} from '../../../common/utils/animations';
import posed from 'react-pose';
import { spring } from 'popmotion';
import { interpolate } from 'd3-interpolate';

const pathTransition = props => {
  const from = props.previousEnter || props.from;
  const interpolater = interpolate(from, props.to);

  return spring({
    from: 0,
    to: 1,
    velocity: VELOCITY,
    damping: DAMPING
  }).pipe(t => props.arc(interpolater(t)));
};

export const PosedArc = posed.path({
  enter: {
    d: ({ enterProps }) => enterProps,
    transition: {
      ...transition,
      d: pathTransition
    }
  },
  exit: {
    d: ({ exitProps }) => exitProps
  }
});
