import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type SkipNavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * The content of the link.
   */
  children: ReactNode;
  /**
   * The id of the main content element.
   */
  id: string;
};
