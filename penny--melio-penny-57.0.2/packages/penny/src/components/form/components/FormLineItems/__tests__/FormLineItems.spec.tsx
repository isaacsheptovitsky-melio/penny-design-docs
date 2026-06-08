import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FormLineItems } from '../index';

describe('FormLineItems', () => {
  validateComponent(FormLineItems, 'FormLineItems', { defaultDataTestId: 'form-line-items' });
});
