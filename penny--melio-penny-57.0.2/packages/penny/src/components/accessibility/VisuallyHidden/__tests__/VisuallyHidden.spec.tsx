import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { VisuallyHidden, type VisuallyHiddenProps } from '..';

validateComponent<VisuallyHiddenProps>(VisuallyHidden, 'VisuallyHidden', {
  props: { children: 'visually hidden element' },
  defaultDataTestId: 'visually-hidden',
  skipRefCheck: true,
});
