import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { TableHeaderCellDescription, type TableHeaderCellDescriptionProps } from '../TableHeaderCellDescription';

validateComponent<TableHeaderCellDescriptionProps>(TableHeaderCellDescription, 'TableHeaderCellDescription', {
  props: { text: 'Description Text' },
});
