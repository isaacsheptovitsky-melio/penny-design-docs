import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FormLineItemsRow } from '../FormLineItemsRow';

describe('FormLineItemsRow', () => {
  validateComponent(FormLineItemsRow, 'FormLineItemsRow', { defaultDataTestId: 'form-line-items-row' });
});
