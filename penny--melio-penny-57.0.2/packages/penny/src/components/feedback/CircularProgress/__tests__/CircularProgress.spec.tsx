import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { CircularProgress, type CircularProgressProps } from '../CircularProgress';

validateComponent<CircularProgressProps>(CircularProgress, 'CircularProgress', {
  props: { percentage: 50, 'data-testid': 'circular-progress' },
});
