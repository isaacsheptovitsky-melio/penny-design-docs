import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { SkeletonText } from '../SkeletonText';

// Chakra's SkeletonText component does not forward the ref to the underlying DOM element.
validateComponent(SkeletonText, 'SkeletonText', { skipRefCheck: true, defaultDataTestId: 'skeleton-text' });
