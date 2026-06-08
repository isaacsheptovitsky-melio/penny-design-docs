import { within } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { renderComponent } from '@/test-utils/render.utils';

import { SortDropdownMenu } from '../SortDropdownMenu';
import type { SortDropdownMenuProps } from '../SortDropdownMenu.types';

const handleClick1 = vi.fn();
const handleClick2 = vi.fn();
const handleClick3 = vi.fn();

const onOpenChangeMock = vi.fn();

const props: SortDropdownMenuProps = {
  isOpen: true,
  onOpenChange: onOpenChangeMock,
  trigger: <Button />,
  items: [
    { label: 'Sort Item 1', onClick: handleClick1, dataTestId: 'item-0' },
    { label: 'Sort Item 2', onClick: handleClick2, dataTestId: 'item-1' },
    { label: 'Sort Item 3', onClick: handleClick3, dataTestId: 'item-2' },
  ],
  sortDirection: 'asc',
  selectedItemIndex: 0,
};

describe('SortDropdownMenu', () => {
  validateComponent<SortDropdownMenuProps>(SortDropdownMenu, 'SortDropdownMenu', {
    props,
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.SORT_DROPDOWN_MENU,
  });

  it('shows an arrow-down icon when sort direction is descending', () => {
    const selectedItemIndex = 0;
    const { getByTestId } = renderComponent(<SortDropdownMenu {...props} sortDirection="desc" selectedItemIndex={0} />);

    const item = getByTestId(`item-${selectedItemIndex}`);

    expect(within(item).getByTestId('icon')).toBeInTheDocument();
  });

  it('shows an arrow-up icon when sort direction is ascending', () => {
    const selectedItemIndex = 0;
    const { getByTestId } = renderComponent(<SortDropdownMenu {...props} sortDirection="asc" selectedItemIndex={0} />);

    const item = getByTestId(`item-${selectedItemIndex}`);

    expect(within(item).getByTestId('icon')).toBeInTheDocument();
  });

  it("doesn't show an icon when sort direction is none", () => {
    const selectedItemIndex = 0;
    const { getByTestId } = renderComponent(<SortDropdownMenu {...props} sortDirection="none" selectedItemIndex={0} />);

    const item = getByTestId(`item-${selectedItemIndex}`);

    expect(within(item).queryByTestId('icon')).not.toBeInTheDocument();
  });

  it("doesn't show an icon when sort direction is undefined", () => {
    const selectedItemIndex = 0;
    const { getByTestId } = renderComponent(
      <SortDropdownMenu {...props} sortDirection={undefined} selectedItemIndex={0} />
    );

    const item = getByTestId(`item-${selectedItemIndex}`);

    expect(within(item).queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('fires the onClick when the item is clicked', async () => {
    const { getByTestId, user } = renderComponent(
      <SortDropdownMenu {...props} sortDirection="asc" selectedItemIndex={0} />
    );

    await user.click(getByTestId('item-0'));
    expect(handleClick1).toBeCalledTimes(1);
    await user.click(getByTestId('item-1'));
    expect(handleClick2).toBeCalledTimes(1);
  });
});
