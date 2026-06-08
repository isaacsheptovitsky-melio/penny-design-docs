import { forwardRef, type HTMLAttributes } from 'react';

import { Footer as _Footer } from '../Context/components/Footer/Footer';

export const BottomSheetMenuFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <_Footer data-component="BottomSheetMenuFooter" {...props} ref={ref} />
));

BottomSheetMenuFooter.displayName = 'BottomSheetMenuFooter';
