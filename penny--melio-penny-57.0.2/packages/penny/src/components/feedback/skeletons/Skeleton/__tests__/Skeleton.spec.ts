import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Skeleton } from '../Skeleton';

validateComponent(Skeleton, 'Skeleton', { defaultDataTestId: 'skeleton' });
