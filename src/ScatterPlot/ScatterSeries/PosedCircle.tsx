import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedCircle = posed.circle({
  enter: {
    opacity: 1,
    cx: ({ enterProps }) => enterProps.cx,
    cy: ({ enterProps }) => enterProps.cy,
    delay: ({ animated, index }) => (animated ? index * 10 : 0),
    transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    opacity: 0,
    cx: ({ exitProps }) => exitProps.cx,
    cy: ({ exitProps }) => exitProps.cy
  }
});
