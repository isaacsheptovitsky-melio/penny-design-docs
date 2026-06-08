import { SkipNavLink as ChakraSkipNavLink } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { type SkipNavLinkProps } from './SkipNavLink.types';

/**
 * The `SkipNavLink` component enables users to bypass repetitive content and navigate directly to the main content of a page.
 * This is particularly useful for accessibility, allowing users to skip over elements like navigation menus when they aren't the first interactive section.
 */
export const SkipNavLink = forwardRef<HTMLAnchorElement, SkipNavLinkProps>((props, ref) => (
  <ChakraSkipNavLink ref={ref} data-component="SkipNavLink" {...props} />
));

SkipNavLink.displayName = 'SkipNavLink';
