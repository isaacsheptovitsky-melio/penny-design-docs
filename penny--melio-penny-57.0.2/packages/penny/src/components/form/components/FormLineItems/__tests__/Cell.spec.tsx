import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { FormLineItemsCell } from '../FormLineItemsCell';

describe('FormLineItemsCell', () => {
  validateComponent(FormLineItemsCell, 'FormLineItemsCell', { defaultDataTestId: 'form-line-items-cell' });
});
