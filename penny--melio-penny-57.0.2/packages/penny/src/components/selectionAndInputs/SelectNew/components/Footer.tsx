import { type ReactNode } from 'react';

import { FloatingMenuFooter } from '@/components/containers/menus/FloatingMenu';

export const SelectNewFooter = (props: { children?: ReactNode }) => (
  <FloatingMenuFooter data-component="SelectNewFooter" {...props} />
);

SelectNewFooter.displayName = 'SelectNewFooter';
