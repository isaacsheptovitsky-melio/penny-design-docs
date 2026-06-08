import { faker } from '@faker-js/faker';
import { act, screen, waitFor, within } from '@testing-library/react';
import { type FocusEvent } from 'react';
import { expect } from 'vitest';

import { TextField } from '@/components/selectionAndInputs/TextField';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { CollapsibleCard } from '../CollapsibleCard';
import { type CollapsibleCardProps } from '../CollapsibleCard.types';

const defaultProps = {
  title: faker.random.words(),
  description: faker.random.words(),
  children: faker.random.words(),
} as CollapsibleCardProps;

const setup = (props: Omit<CollapsibleCardProps, 'title' | 'description' | 'children' | 'header'> = {}) => {
  const { user, ...rest } = renderComponent(<CollapsibleCard {...props} {...defaultProps} />);
  const clickOnHeader = async () =>
    act(async () => user.click(screen.getByTestId('collapsible-card-header-action-area')));
  const toggleCardByEnter = async () => user.keyboard('[Enter]');
  const toggleCardBySpace = async () => user.keyboard('[Space]');

  const waitForCollapse = async ({ expanded }: { expanded: boolean }) =>
    waitFor(() => {
      expect(screen.getByTestId('collapsible-card-header')).toHaveAttribute(
        'data-state',
        expanded ? 'expanded' : 'collapsed'
      );
    });

  return { user, clickOnHeader, toggleCardByEnter, toggleCardBySpace, waitForCollapse, ...rest };
};

describe('CollapsibleCard', () => {
  validateComponent(CollapsibleCard, 'CollapsibleCard', {
    props: defaultProps,
    defaultDataTestId: 'collapsible-card',
    componentParts: ['header', 'collapse'],
  });

  describe('expand and collapse', () => {
    it('toggles between expanding and collapsed when clicking on the header ', async () => {
      const { clickOnHeader, waitForCollapse } = setup();
      expect(screen.getByTestId('collapsible-card-collapse')).not.toBeVisible();

      await clickOnHeader();
      await waitForCollapse({ expanded: true });

      await clickOnHeader();
      await waitForCollapse({ expanded: false });
    });
  });

  describe('defaultIsExpanded', () => {
    it('is expanded if defaultIsExpanded is passed', () => {
      setup({ defaultIsExpanded: true });
      expect(screen.getByTestId('collapsible-card-collapse')).toHaveStyle({ display: 'block' });
    });

    it('is not expanded if defaultIsExpanded is not passed', () => {
      setup();
      expect(screen.getByTestId('collapsible-card-collapse')).toHaveStyle({ display: 'none' });
    });

    it('toggles the collapsible card by pressing enter', async () => {
      const onExpandChange = vi.fn();
      const { toggleCardByEnter, waitForCollapse, user } = setup({ onExpandChange });
      await act(async () => user.tab());
      await toggleCardByEnter();
      await waitForCollapse({ expanded: true });
      expect(onExpandChange).toHaveBeenCalledTimes(1);
      await toggleCardByEnter();
      await waitForCollapse({ expanded: false });
      expect(onExpandChange).toHaveBeenCalledTimes(2);
    });

    it('toggles the collapsible card by pressing space', async () => {
      const onExpandChange = vi.fn();
      const { toggleCardBySpace, waitForCollapse, user } = setup({ onExpandChange });
      await act(async () => user.tab());
      await toggleCardBySpace();
      await waitForCollapse({ expanded: true });
      expect(onExpandChange).toHaveBeenCalledTimes(1);
      await toggleCardBySpace();
      await waitForCollapse({ expanded: false });
      expect(onExpandChange).toHaveBeenCalledTimes(2);
    });
    it('collapsible card should not affected when typing in input inside the card', async () => {
      const onExpandChange = vi.fn();
      let value = '';
      const onChange = (e: FocusEvent<HTMLInputElement>) => {
        value = e.target.value;
      };
      const { user } = renderComponent(
        <CollapsibleCard {...defaultProps}>
          <TextField onChange={onChange} value={value} data-testid="input-text-in-collapsible-card" />
        </CollapsibleCard>
      );
      await act(async () => user.type(screen.getByTestId('collapsible-card'), '{enter}'));
      await user.type(screen.getByTestId('input-text-in-collapsible-card'), '{space}');
      expect(onExpandChange).not.toBeCalled();
    });
  });

  describe('disabled and inactive', () => {
    it("clicking on the header doesn't expand or collapse when disabled", async () => {
      const { clickOnHeader } = setup({ disabled: true });
      await clickOnHeader();
      await waitFor(() => {
        expect(screen.getByTestId('collapsible-card-header')).toHaveAttribute('data-state', 'collapsed');
      });
    });
    it("clicking on the header doesn't expand or collapse when readOnly", async () => {
      const { clickOnHeader } = setup({ readOnly: true });
      expect(screen.getByTestId('collapsible-card-header')).toHaveAttribute('data-readonly', 'true');
      await clickOnHeader();
      await waitFor(() => {
        expect(screen.getByTestId('collapsible-card-header')).toHaveAttribute('data-state', 'collapsed');
      });
    });
    it("clicking on the custom header doesn't expand or collapse when readOnly", async () => {
      const { user, getByTestId } = renderComponent(
        <CollapsibleCard readOnly header="Custom Header">
          <>{faker.random.words()}</>
        </CollapsibleCard>
      );
      const header = screen.getByTestId('collapsible-card-header');
      expect(within(header).getByText('Custom Header')).toHaveAttribute('data-readonly', 'true');
      await act(async () => user.click(getByTestId('collapsible-card-header-action-area')));
      await waitFor(() => {
        expect(screen.getByTestId('collapsible-card-header')).toHaveAttribute('data-state', 'collapsed');
      });
    });
    it("`onExpandChange` shouldn't triggers when disabled", async () => {
      const onExpandChange = vi.fn();
      const { clickOnHeader } = setup({ isExpanded: false, onExpandChange, disabled: true });
      await clickOnHeader();
      expect(onExpandChange).not.toBeCalled();
    });
    it("`onExpandChange` shouldn't triggers when readOnly", async () => {
      const onExpandChange = vi.fn();
      const { clickOnHeader } = setup({ isExpanded: false, onExpandChange, readOnly: true });
      await clickOnHeader();
      expect(onExpandChange).not.toBeCalled();
    });
  });

  describe('controlled mode', () => {
    it('`onExpandChange` triggers with the correct triggerEvent', async () => {
      let isExpanded = true;
      const handleExpandChange = (expand: boolean) => {
        isExpanded = expand;
      };

      const onExpandChange = vi.fn((expand: boolean) => handleExpandChange(expand));
      const { rerender, user } = renderComponent(
        <CollapsibleCard {...defaultProps} isExpanded={isExpanded} onExpandChange={onExpandChange} />
      );
      await act(async () => user.click(screen.getByTestId('collapsible-card-header-action-area')));
      expect(onExpandChange).toBeCalledWith(false);
      rerender(<CollapsibleCard {...defaultProps} isExpanded={isExpanded} onExpandChange={onExpandChange} />);
      await act(async () => user.click(screen.getByTestId('collapsible-card-header-action-area')));
      expect(onExpandChange).toBeCalledWith(true);
    });
  });
});
