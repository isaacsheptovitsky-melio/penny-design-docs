import { forwardRef, type HTMLAttributes } from 'react';

import { Footer as _Footer } from '../../Context/components';

export const FlatMenuFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <_Footer data-component="FlatMenuFooter" {...props} ref={ref} />
));

FlatMenuFooter.displayName = 'FlatMenuFooter';
