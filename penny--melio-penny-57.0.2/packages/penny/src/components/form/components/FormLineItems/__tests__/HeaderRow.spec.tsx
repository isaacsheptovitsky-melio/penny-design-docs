import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FormLineItemsHeaderRow } from '../FormLineItemsHeaderRow';

describe('FormLineItemsHeaderRow', () => {
  validateComponent(FormLineItemsHeaderRow, 'FormLineItemsHeaderRow', {
    defaultDataTestId: 'form-line-items-header-row',
  });
});
