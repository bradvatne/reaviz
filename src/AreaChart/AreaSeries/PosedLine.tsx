import posed from 'react-pose';
import { transition } from '../../common/utils/animations';

export const PosedLine = posed.path({
  enter: {
    strokeDashoffset: 0,
    strokeDasharray: ({ ghostPathRef, areaShown }) => {
      if (!areaShown) {
        const len = ghostPathRef.current!.getTotalLength();
        return `${len} ${len}`;
      }
      return '';
    },
    d: ({ enterProps }) => enterProps.d,
    delay: ({ animated, index }) => (animated ? index * 10 : 0),
    transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    d: ({ exitProps }) => exitProps.d,
    strokeDasharray: ({ ghostPathRef, areaShown }) => {
      if (!areaShown) {
        const len = ghostPathRef.current!.getTotalLength();
        return `${len} ${len}`;
      }
      return '';
    },
    strokeDashoffset: ({ ghostPathRef, areaShown }) => {
      if (!areaShown) {
        return ghostPathRef.current!.getTotalLength();
      }
      return '';
    }
  }
});
