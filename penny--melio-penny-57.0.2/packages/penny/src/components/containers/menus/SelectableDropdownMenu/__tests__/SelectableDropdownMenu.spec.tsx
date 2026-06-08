import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { renderComponent } from '@/test-utils/render.utils';

import { FloatingMenuActionTrigger } from '../../FloatingMenu';
import { SelectableDropdownMenu } from '../SelectableDropdownMenu';
import { type SelectableDropdownMenuProps } from '../SelectableDropdownMenu.types';

const onSelect = vi.fn();
const onOpenChangeMock = vi.fn();

const props: SelectableDropdownMenuProps = {
  isOpen: true,
  onOpenChange: onOpenChangeMock,
  trigger: <FloatingMenuActionTrigger label="click" />,
  items: [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
  ],
  onSelect,
};

describe('Selectable Dropdown Menu', () => {
  validateComponent<SelectableDropdownMenuProps>(SelectableDropdownMenu, 'SelectableDropdownMenu', {
    props,
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.SELECTABLE_DROPDOWN_MENU,
  });

  it('selects an item when the item is clicked', async () => {
    const { getByTestId, user } = renderComponent(<SelectableDropdownMenu {...props} />);

    await user.click(getByTestId('selectable-dropdown-menu-item-1'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('marks selected item as selected', async () => {
    const { getByTestId, user } = renderComponent(<SelectableDropdownMenu {...props} selectedItemValue="1" />);

    await user.click(getByTestId('selectable-dropdown-menu-item-1'));

    expect(getByTestId('selectable-dropdown-menu-item-1')).toHaveAttribute('data-selected', 'true');
  });
});
