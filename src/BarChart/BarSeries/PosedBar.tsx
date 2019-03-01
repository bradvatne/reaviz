import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedBar = posed.rect({
  enter: {
    delay: ({ animated, index, barCount }) =>
      animated ? (index / barCount) * 500 : 0,
    transition: ({ animated }) => (animated ? transition : { duration: 0 }),
    x: ({ enterProps }) => enterProps.x,
    y: ({ enterProps }) => enterProps.y,
    height: ({ enterProps }) => enterProps.height,
    width: ({ enterProps }) => enterProps.width
  },
  exit: {
    x: ({ exitProps }) => exitProps.x,
    y: ({ exitProps }) => exitProps.y,
    height: ({ exitProps }) => exitProps.height,
    width: ({ exitProps }) => exitProps.width
  }
});
