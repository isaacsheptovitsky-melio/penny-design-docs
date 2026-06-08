import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Brand } from '../Brand';
import type { BrandProps } from '../Brand.types';

describe('Brand', () => {
  validateComponent<BrandProps>(Brand, 'Brand', {
    props: { type: 'intuit' },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.BRAND,
  });
});
