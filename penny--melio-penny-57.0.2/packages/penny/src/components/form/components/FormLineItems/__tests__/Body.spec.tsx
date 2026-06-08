import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FormLineItemsBody } from '../FormLineItemsBody';

describe('FormLineItemsBody', () => {
  validateComponent(FormLineItemsBody, 'FormLineItemsBody', { defaultDataTestId: 'form-line-items-body' });
});
