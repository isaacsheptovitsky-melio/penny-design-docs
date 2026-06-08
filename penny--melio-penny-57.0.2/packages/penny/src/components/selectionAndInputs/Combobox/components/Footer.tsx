import { type ReactNode } from 'react';

import { FloatingMenuFooter } from '@/components/containers/menus/FloatingMenu';

export const ComboboxFooter = (props: { children: ReactNode }) => (
  <FloatingMenuFooter data-component="ComboboxFooter" {...props} />
);

ComboboxFooter.displayName = 'ComboboxFooter';
