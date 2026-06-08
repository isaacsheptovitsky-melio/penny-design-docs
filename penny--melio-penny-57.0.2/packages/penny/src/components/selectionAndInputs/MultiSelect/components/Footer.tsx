import { type ReactNode } from 'react';

import { FloatingMenuFooter } from '@/components/containers/menus/FloatingMenu';

export const MultiSelectFooter = (props: { children?: ReactNode }) => (
  <FloatingMenuFooter data-component="MultiSelectFooter" {...props} />
);

MultiSelectFooter.displayName = 'MultiSelectFooter';
