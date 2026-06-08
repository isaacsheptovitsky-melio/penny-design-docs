import { type BoxProps } from '@chakra-ui/react';
import { type AnchorHTMLAttributes, type AriaAttributes } from 'react';

type DisabledLinkProps = Pick<BoxProps, 'as' | 'onClick'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'role'> &
  AriaAttributes;

/**
 * The `disabledLinkAttributes` object is used to disable a link while maintaining its accessibility.
 * From an accessibility standpoint, using an anchor <a> element without an href attribute is generally not recommended. Therefore, the disabledLinkAttributes object removes the href and target attributes and adds the role="link" attribute to ensure accessibility. The as="div" attribute is utilized to preserve semantic clarity.
 */
export const disabledLinkAttributes: DisabledLinkProps = {
  'aria-disabled': true,
  href: undefined,
  target: undefined,
  onClick: undefined,
  // For non-navigational links use <div> or <button> with role="link" to maintain semantic clarity and ensure accessibility.
  as: 'div',
  role: 'link',
};
