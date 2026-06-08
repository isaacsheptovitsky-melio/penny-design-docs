import { type ComponentPropsWithoutRef } from 'react';

import { FloatingMenuDivider, FloatingMenuSection } from '@/components/containers/menus/FloatingMenu';

export type SectionProps = { shouldRenderDivider: boolean } & ComponentPropsWithoutRef<typeof FloatingMenuSection>;

export const Section = ({ children, shouldRenderDivider, ...otherProps }: SectionProps) => (
  <>
    <FloatingMenuSection data-component="SelectNew.Section" {...otherProps}>
      {children}
    </FloatingMenuSection>
    {shouldRenderDivider && <FloatingMenuDivider data-component="SelectNew.Divider" />}
  </>
);

Section.displayName = 'SelectNew.Section';
