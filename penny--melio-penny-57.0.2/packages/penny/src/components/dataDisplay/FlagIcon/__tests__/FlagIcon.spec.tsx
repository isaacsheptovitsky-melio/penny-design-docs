import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FlagIcon } from '../FlagIcon';
import type { FlagIconProps } from '../FlagIcon.types';

describe('FlagIcon', () => {
  validateComponent<FlagIconProps>(FlagIcon, 'FlagIcon', {
    props: { size: 'small', countryCode: 'AR' },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.FLAG_ICON,
  });
});
