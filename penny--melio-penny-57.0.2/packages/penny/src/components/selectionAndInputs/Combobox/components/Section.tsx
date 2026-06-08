import { type ComponentPropsWithoutRef } from 'react';

import { FloatingMenuDivider, FloatingMenuSection } from '@/components/containers/menus/FloatingMenu';

type SectionProps = { shouldRenderDivider: boolean } & ComponentPropsWithoutRef<typeof FloatingMenuSection>;

export const Section = ({ children, shouldRenderDivider, ...otherProps }: SectionProps) => (
  <>
    <FloatingMenuSection data-component="Combobox.Section" {...otherProps}>
      {children}
    </FloatingMenuSection>
    {shouldRenderDivider && <FloatingMenuDivider data-component="Combobox.Divider" />}
  </>
);

Section.displayName = 'Combobox.Section';
