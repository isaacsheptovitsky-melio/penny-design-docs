import type { AriaAttributes } from 'react';

import type { ThemeColorKey } from '@/theme/foundations/colors/types';

export type LoaderProps = {
  color?: ThemeColorKey;
  // used for aria-labelledby.
  id?: string;
  /**
   * For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.
   * @default 'Loading...'
   */
  loadingText?: string;
  /**
   * To prevent rendering the loading text, set `hideLoadingText` to true. The loading component uses the aria-busy attribute. However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.
   */
  hideLoadingText?: boolean;
} & AriaAttributes;
