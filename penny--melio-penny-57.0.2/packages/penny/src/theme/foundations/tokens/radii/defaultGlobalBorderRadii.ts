import { type GlobalBorderRadiusTokens } from './defaultGlobalBorderRadii.types';

export const defaultGlobalBorderRadii: GlobalBorderRadiusTokens = {
  none: '0',
  50: '2px',
  75: '3px',
  100: '4px',
  200: '8px',
  300: '12px',
  400: '16px',
  600: '24px',
  // We use 9999px for the border-radius because using 100% creates elliptical corners, which is not the desired outcome.
  full: '9999px',
};
