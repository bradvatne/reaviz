import posed from 'react-pose';

export const PosedArcLabelGroup = posed.g({
  enter: {
    opacity: 1,
    transition: {
      opacity: {
        type: 'tween',
        ease: 'linear',
        duration: 500
      }
    }
  },
  exit: {
    opacity: 0
  }
});
