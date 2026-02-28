import type { Variants } from 'framer-motion';

/* ─── existing variants ─── */

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* ─── new variants ─── */

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const clipRevealVariants: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ─── Highlights premium variants ─── */

/** Shared luxury easing — fast start, smooth deceleration */
export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** ClipPath reveal — left to right (normal layout photo) */
export const clipRevealLeftVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: luxuryEase },
  },
};

/** ClipPath reveal — right to left (reversed layout photo) */
export const clipRevealRightVariants: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: luxuryEase },
  },
};

/** Letter-spacing expansion for English subtitles */
export const trackingExpandVariants: Variants = {
  hidden: { opacity: 0, letterSpacing: '0.1em', x: -20 },
  visible: {
    opacity: 1,
    letterSpacing: '0.3em',
    x: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

/** Large semi-transparent number fade-up (appears after photo reveal) */
export const numberRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 0.1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.6 },
  },
};

/** Section header character stagger container */
export const charStaggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

/** Individual character variant for stagger reveal */
export const charStaggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: luxuryEase },
  },
};
