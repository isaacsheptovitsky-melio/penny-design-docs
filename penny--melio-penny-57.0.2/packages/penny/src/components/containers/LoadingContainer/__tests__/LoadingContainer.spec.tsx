import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { LoadingContainer } from '../LoadingContainer';

validateComponent(LoadingContainer, 'LoadingContainer', {
  props: { isLoading: true },
  defaultDataTestId: 'loading-container',
  componentParts: ['loader', 'children-container'],
});
