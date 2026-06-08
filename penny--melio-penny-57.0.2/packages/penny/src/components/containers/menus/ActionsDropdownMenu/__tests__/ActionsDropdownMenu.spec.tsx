import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { renderComponent } from '@/test-utils/render.utils';
import * as useBreakpointObject from '@/theme/providers/BreakpointProvider';

import { ActionsDropdownMenu } from '../ActionsDropdownMenu';
import { type ActionsDropdownMenuProps } from '../ActionsDropdownMenu.types';

const onOpenChangeMock = vi.fn();

const props: ActionsDropdownMenuProps = {
  isOpen: true,
  onOpenChange: onOpenChangeMock,
  label: 'Actions',
  items: [
    { label: 'Action 1', onClick: () => null },
    { label: 'Action 2', variant: 'critical', onClick: () => null },
  ],
};

validateComponent<ActionsDropdownMenuProps>(ActionsDropdownMenu, 'ActionsDropdownMenu', {
  props,
  defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.ACTIONS_DROPDOWN_MENU,
});

describe('ActionsDropdownMenu', () => {
  it('calls onOpenChange when button is clicked', async () => {
    const { user } = renderComponent(<ActionsDropdownMenu {...props} />);

    await user.click(screen.getByTestId('actions-dropdown-menu-trigger'));
    await waitFor(() => expect(onOpenChangeMock).toBeCalledTimes(1));
  });

  it('calls onOpenChange when clicking outside of the actions-dropdown-menu', async () => {
    const { user } = renderComponent(<ActionsDropdownMenu {...props} />);

    await act(async () => user.click(document.body));
    await waitFor(() => expect(onOpenChangeMock).toBeCalledTimes(1));
  });

  it('invokes the onClick handler when clicking each of the actions-dropdown-menu items', async () => {
    const handleClick1 = vi.fn();
    const handleClick2 = vi.fn();
    const handleClick3 = vi.fn();

    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action 1',
        onClick: handleClick1,
        dataTestId: 'custom-data-testid-1',
      },
      {
        label: 'Action 2',
        onClick: handleClick2,
      },
      {
        label: 'Action 3',
        onClick: handleClick3,
      },
    ];
    const { user } = renderComponent(<ActionsDropdownMenu {...props} items={items} />);

    await user.click(screen.getByTestId('custom-data-testid-1'));
    await waitFor(() => expect(handleClick1).toHaveBeenCalledTimes(1));

    await user.click(screen.getByTestId('actions-dropdown-menu-item-1'));
    await waitFor(() => expect(handleClick2).toHaveBeenCalledTimes(1));

    await user.click(screen.getByTestId('actions-dropdown-menu-item-2'));
    await waitFor(() => expect(handleClick3).toHaveBeenCalledTimes(1));
  });

  it('does not open the menu when disabled', async () => {
    const { user } = renderComponent(<ActionsDropdownMenu {...props} isOpen={false} isDisabled />);

    await act(async () => user.click(screen.getByTestId('actions-dropdown-menu-trigger')));

    expect(onOpenChangeMock).not.toBeCalled();
  });

  it("disabled item triggers tooltip when hovering the item and doesn't invoke the onClick handler when clicking the item", async () => {
    const handleClick = vi.fn();
    const disabledMessage = 'Disabled for testing purposes';
    const itemLabel = 'Action 1';
    const { user } = renderComponent(
      <ActionsDropdownMenu
        {...props}
        items={[
          {
            label: itemLabel,
            onClick: handleClick,
            disabled: true,
            tooltipProps: { content: disabledMessage },
          },
        ]}
      />
    );

    expect(screen.queryByText(disabledMessage)).not.toBeInTheDocument();
    await act(async () => user.hover(screen.getByTestId('actions-dropdown-menu-item-0')));
    expect(screen.getByText(disabledMessage)).toBeInTheDocument();

    await user.click(screen.getByTestId('actions-dropdown-menu-item-0'));
    expect(handleClick).not.toBeCalled();
  });

  it('passes the aria label to the trigger', () => {
    const { getByRole } = renderComponent(<ActionsDropdownMenu {...props} isOpen={false} triggerAriaLabel="test" />);

    expect(getByRole('button')).toHaveAttribute('aria-label', 'test');
  });

  describe('Mobile', () => {
    beforeAll(() => {
      vi.spyOn(useBreakpointObject, 'useBreakpoint').mockImplementation(() => ({
        isExtraSmallScreen: true,
        isExtraLargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: false,
        breakpoint: 'xs',
      }));
    });
    afterAll(() => {
      vi.clearAllMocks();
    });

    it("sets the title to be the trigger's label if no title is passed", () => {
      const { getAllByText } = renderComponent(<ActionsDropdownMenu {...props} isOpen label="label" />);
      const title = getAllByText('label');
      expect(title[1]?.tagName).toBe('H2');
    });

    it('sets the title to be to title prop', () => {
      const { getByText } = renderComponent(<ActionsDropdownMenu {...props} isOpen label="label" title="title prop" />);
      const title = getByText('title prop');
      expect(title.tagName).toBe('H2');
    });
  });
});
