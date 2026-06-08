import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { StatusIndicator } from '../StatusIndicator';
import type { StatusIndicatorProps } from '../StatusIndicator.types';

validateComponent<StatusIndicatorProps>(StatusIndicator, 'StatusIndicator', {
  props: { status: 'brand' },
  defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.STATUS_INDICATOR,
});
