import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { StackedContainer } from '../StackedContainer';
import { type StackedContainerProps } from '../StackedContainer.types';

validateComponent<StackedContainerProps>(StackedContainer, 'StackedContainer', {
  props: {
    stacksToDisplay: 2,
  },
});
