import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedRangeLine = posed.rect({
  enter: {
    opacity: 1,
    x: ({ enterProps }) => enterProps.x,
    y: ({ enterProps }) => enterProps.y,
    delay: ({ animated, index, barCount }) =>
      animated ? (index / barCount) * 500 : 0,
    transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    opacity: 0,
    x: ({ exitProps }) => exitProps.x,
    y: ({ exitProps }) => exitProps.y
  }
});
