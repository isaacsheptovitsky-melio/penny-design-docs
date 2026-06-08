import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';

/**
 * Props for rendering a button as a link (anchor tag).
 */
export type ButtonLinkProps = {
  /**
   * If provided, the button will be rendered as an anchor (`<a>`) tag with these props.
   */
  link?: {
    /**
     * The href attribute for the anchor tag.
     */
    href: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
    /**
     * The target attribute for the anchor tag (e.g., '_blank', '_self').
     */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  };
};

export type CommonActionProps = HTMLAttributes<HTMLButtonElement> & ButtonLinkProps;
