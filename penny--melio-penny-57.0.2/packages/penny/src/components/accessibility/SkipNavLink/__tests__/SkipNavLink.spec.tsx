import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { SkipNavLink, type SkipNavLinkProps } from '..';

validateComponent<SkipNavLinkProps>(SkipNavLink, 'SkipNavLink', {
  props: { children: 'click me!', id: 'skip-here' },
});
