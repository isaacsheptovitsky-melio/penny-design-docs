import { noop } from '@melio/penny-utils';

import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { TableHeaderMenuTriggerCell, type TableHeaderMenuTriggerCellProps } from '../TableHeaderMenuTriggerCell';

validateComponent<TableHeaderMenuTriggerCellProps>(TableHeaderMenuTriggerCell, 'TableHeaderMenuTriggerCell', {
  props: { label: 'Selectable', onClick: noop },
});
