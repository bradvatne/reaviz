import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedArea = posed.path({
  enter: {
    d: ({ enterProps }) => enterProps.d,
    delay: ({ animated, index }) => (animated ? index * 10 : 0),
    transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    d: ({ exitProps }) => exitProps.d
  }
});
