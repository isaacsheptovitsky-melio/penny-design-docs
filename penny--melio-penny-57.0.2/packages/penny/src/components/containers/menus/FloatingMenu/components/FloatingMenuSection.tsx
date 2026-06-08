import { forwardRef } from 'react';

import { Section as _Section, type SectionProps } from '../../Context/components';

export const FloatingMenuSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ 'data-testid': dataTestId = 'floating-menu-section', ...props }, ref) => (
    <_Section {...props} ref={ref} data-testid={dataTestId} />
  )
);

FloatingMenuSection.displayName = 'FloatingMenuSection';
