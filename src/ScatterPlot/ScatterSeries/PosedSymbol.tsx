import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedSymbol = posed.g({
  enter: {
    opacity: 1,
    transform: ({ enterProps }) => enterProps.transform,
    delay: ({ animated, index }) => (animated ? index * 10 : 0),
    transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    opacity: 0,
    transform: ({ exitProps }) => exitProps.transform
  }
});
