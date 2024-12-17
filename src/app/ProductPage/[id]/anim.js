export const scaleVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [1, 0.29, 0, 0.02],
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [.72, .34, 0, 1.58],
    },
  },
};

export const heartAnimVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 0,
  },
  enter: {
    opacity: 1,
    scale: 1.5,
    y: -100,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: -200,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};
