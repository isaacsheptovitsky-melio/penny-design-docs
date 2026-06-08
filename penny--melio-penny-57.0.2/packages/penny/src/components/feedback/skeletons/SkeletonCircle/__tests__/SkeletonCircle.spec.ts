import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { SkeletonCircle } from '../SkeletonCircle';

// Chakra's SkeletonCircle component does not forward the ref to the underlying DOM element.
validateComponent(SkeletonCircle, 'SkeletonCircle', { skipRefCheck: true, defaultDataTestId: 'skeleton-circle' });
