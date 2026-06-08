import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { StatusIndicator } from '../../StatusIndicator';
import { Pill } from '../Pill';
import type { PillProps } from '../Pill.types';

validateComponent<PillProps>(Pill, 'Pill', {
  props: { label: 'Pill', status: 'warning', leftElement: <StatusIndicator status="neutral" /> },
  defaultDataTestId: 'pill',
  componentParts: ['left-element'],
});
