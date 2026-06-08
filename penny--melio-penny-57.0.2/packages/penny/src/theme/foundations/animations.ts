import { keyframes } from '@emotion/react';

const gradientMove = keyframes`
  0% { background-position: 100% 0%; }
  25% { background-position: 75% 25%; }
  50% { background-position: 50% 50%; }
  75% { background-position: 25% 75%; }
  100% { background-position: 0% 90%; }
`;

const breathing = keyframes`
  0% { transform: scale(0.9); }
  25% { transform: scale(1.2); }
  60% { transform: scale(1.1); }
  100% { transform: scale(0.9); }
`;

const appear = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const disappear = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(0); }
`;

const shiftRight = keyframes`
  0% { transform: translateX(0px); }
  100% { transform: translateX(16px); }
`;

type CSSAnimation = {
  keyframes: string;
  animation: string;
};

export type CssAnimationsKey = 'breathing' | 'gradientMove' | 'appear' | 'disappear' | 'shiftRight';

export const cssAnimations: Record<CssAnimationsKey, CSSAnimation> = {
  breathing: { keyframes: breathing, animation: '2s linear infinite' },
  gradientMove: { keyframes: gradientMove, animation: '5s linear' },
  appear: { keyframes: appear, animation: '0.6s ease infinite' },
  disappear: { keyframes: disappear, animation: '0.6s ease infinite' },
  shiftRight: { keyframes: shiftRight, animation: '0.6s ease infinite' },
};
