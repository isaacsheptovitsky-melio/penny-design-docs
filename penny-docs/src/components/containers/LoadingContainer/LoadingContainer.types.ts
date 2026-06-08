import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, ReactNode } from 'react';

import type { LoaderProps } from '@/components/foundations/Loader';

export type LoadingContainerProps = {
  /** Determines if the loader is shown or not */
  isLoading?: boolean;
  /** Sets the tab index for accessibility when the container needs to be focusable */
  tabIndex?: number;
  /** Used for aria-labelledby to associate the container with trigger elements */
  id?: string;
  /** The content to display when not loading */
  children?: ReactNode;
  /** For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers. @default 'Loading...' */
  loadingText?: LoaderProps['loadingText'];
  /**
   * To prevent rendering the loading text, set `hideLoadingText` to true, the loading component uses the aria-busy attribute.
   * However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.
   * */
  hideLoadingText?: LoaderProps['hideLoadingText'];
} & AriaAttributes &
  TestIdProp;
