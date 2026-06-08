import { forwardRef, type HTMLAttributes } from 'react';

import { Footer as _Footer } from '../../Context/components';

export const FloatingMenuFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <_Footer data-component="FloatingMenuFooter" {...props} ref={ref} />
));

FloatingMenuFooter.displayName = 'FloatingMenuFooter';
