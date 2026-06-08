/* eslint-disable max-lines */
import { screen, waitFor, within } from '@testing-library/react';
import { expect } from 'vitest';

import { Icon } from '@/components/foundations/Icon';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { SelectionCard, type SelectionCardProps } from '..';

describe('SelectionCard', () => {
  validateComponent<SelectionCardProps>(SelectionCard, 'SelectionCard', {
    props: { mainLabelProps: { label: 'Main Label' } },
  });

  it('invokes the `onClick` handler when clicking the card', async () => {
    const handleClick = vi.fn();

    const { user } = renderComponent(
      <SelectionCard data-testid="selection-card" mainLabelProps={{ label: 'Main Label' }} onClick={handleClick} />
    );

    await user.click(screen.getByTestId('selection-card'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke the `onClick` handler when the card is disabled', async () => {
    const handleClick = vi.fn();

    const { user } = renderComponent(
      <SelectionCard
        data-testid="selection-card"
        mainLabelProps={{ label: 'Main Label' }}
        onClick={handleClick}
        disabled
      />
    );

    await user.click(screen.getByTestId('selection-card'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders the left element with the correct element', () => {
    const { getByTestId } = renderComponent(
      <SelectionCard mainLabelProps={{ label: 'Main Label' }} leftElement={<Icon type="bank" />} />
    );
    const card = getByTestId('selection-card');

    expect(within(card).getByTestId('icon')).toBeInTheDocument();
  });

  it('invokes the CTA `onClick` handler when clicking the CTA', async () => {
    const handleCardClick = vi.fn();
    const handleActionClick = vi.fn();
    const label = 'CTA';

    const { user } = renderComponent(
      <SelectionCard
        onClick={handleCardClick}
        mainLabelProps={{ label: 'Main Label' }}
        action={{ label, onClick: handleActionClick }}
      />
    );

    await user.click(screen.getByText(label));

    expect(handleActionClick).toHaveBeenCalledTimes(1);
    // Making sure that the CTA click doesn't propagate to the card
    expect(handleCardClick).not.toHaveBeenCalled();
  });

  it('does not render the CTA when the card is disabled', () => {
    const label = 'CTA';

    renderComponent(
      <SelectionCard
        data-testid="selection-card"
        mainLabelProps={{ label: 'Main Label' }}
        action={{ label, onClick: () => {} }}
        onClick={() => {}}
        disabled
      />
    );

    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });

  it('does not render the CTA when the card is readonly', () => {
    const label = 'CTA';

    renderComponent(
      <SelectionCard
        data-testid="selection-card"
        mainLabelProps={{ label: 'Main Label' }}
        action={{ label, onClick: () => {} }}
        onClick={() => {}}
        readOnly
      />
    );

    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });

  it("invokes an `onClick` handler when clicking on one of the menu's actions", async () => {
    const handleCardClick = vi.fn();
    const handleActionClick = vi.fn();
    const menuActions = [
      {
        label: 'Action 1',
        onClick: handleActionClick,
        dataTestId: 'card-selection-menu-action',
      },
      {
        label: 'Action 2',
        onClick: () => {},
      },
      {
        label: 'Action 3',
        onClick: () => {},
      },
    ];

    const { user } = renderComponent(
      <SelectionCard
        onClick={handleCardClick}
        mainLabelProps={{ label: 'Main Label' }}
        menuActions={{ items: menuActions }}
      />
    );

    await user.click(screen.getByTestId('selection-card-menu-actions-trigger'));

    await screen.findByTestId('selection-card-menu-actions');

    // Making sure that the menu click doesn't propagate to the card
    expect(handleCardClick).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('card-selection-menu-action'));

    await waitFor(() => expect(handleActionClick).toHaveBeenCalledTimes(1));
  });

  it('does not render the menu when the card is disabled', () => {
    const menuActions = [
      {
        label: 'Action 1',
        onClick: () => {},
      },
      {
        label: 'Action 2',
        onClick: () => {},
      },
      {
        label: 'Action 3',
        onClick: () => {},
      },
    ];

    renderComponent(
      <SelectionCard
        data-testid="selection-card"
        mainLabelProps={{ label: 'Main Label' }}
        menuActions={{ items: menuActions }}
        onClick={() => {}}
        disabled
      />
    );

    expect(screen.queryByTestId('actions-dropdown-menu')).not.toBeInTheDocument();
  });

  it('does not render the menu when the card is readonly', () => {
    const menuActions = [
      {
        label: 'Action 1',
        onClick: () => {},
      },
      {
        label: 'Action 2',
        onClick: () => {},
      },
      {
        label: 'Action 3',
        onClick: () => {},
      },
    ];

    renderComponent(
      <SelectionCard
        data-testid="selection-card"
        mainLabelProps={{ label: 'Main Label' }}
        menuActions={{ items: menuActions }}
        onClick={() => {}}
        readOnly
      />
    );

    expect(screen.queryByTestId('actions-dropdown-menu')).not.toBeInTheDocument();
  });

  it('overrides the default trigger aria-label', () => {
    const menuActions = [
      {
        label: 'Action 1',
        onClick: () => {},
      },
      {
        label: 'Action 2',
        onClick: () => {},
      },
      {
        label: 'Action 3',
        onClick: () => {},
      },
    ];

    const { getByLabelText, queryByLabelText, rerender } = renderComponent(
      <SelectionCard mainLabelProps={{ label: 'Main Label' }} menuActions={{ items: menuActions }} />
    );

    expect(getByLabelText('Selection Card Actions')).toBeInTheDocument();

    rerender(
      <SelectionCard
        mainLabelProps={{ label: 'Main Label' }}
        menuActions={{ items: menuActions, triggerAriaLabel: 'override label' }}
      />
    );

    expect(queryByLabelText('Selection Card Actions')).not.toBeInTheDocument();
    expect(getByLabelText('override label')).toBeInTheDocument();
  });

  describe('a11y', () => {
    it('does not render the action area when `action` / `menuActions` / `mainLabelProps.tooltipProps` is unset', () => {
      const { queryByTestId } = renderComponent(
        <SelectionCard mainLabelProps={{ label: 'Main Label' }} onClick={() => {}} />
      );
      expect(queryByTestId('selection-card-action-area-element')).not.toBeInTheDocument();
    });
    it('does not render the action area when `onClick` is unset but `action` / `menuActions` / `mainLabelProps.tooltipProps` are set ', () => {
      const { queryByTestId, getByTestId, rerender } = renderComponent(
        <SelectionCard mainLabelProps={{ label: 'Main Label' }} action={{ label: 'CTA', onClick: () => {} }} />
      );

      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(queryByTestId('selection-card-action-area-element')).not.toBeInTheDocument();
      rerender(
        <SelectionCard
          mainLabelProps={{ label: 'Main Label' }}
          menuActions={{
            items: [
              {
                label: 'Action 1',
                onClick: () => {},
              },
              {
                label: 'Action 2',
                onClick: () => {},
              },
              {
                label: 'Action 3',
                onClick: () => {},
              },
            ],
          }}
        />
      );
      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(queryByTestId('selection-card-action-area-element')).not.toBeInTheDocument();
      rerender(<SelectionCard mainLabelProps={{ label: 'Main Label', tooltipProps: { content: 'Hi' } }} />);
      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(queryByTestId('selection-card-action-area-element')).not.toBeInTheDocument();
    });
    it('renders the action area when `onClick` is set and `action` / `menuActions` / `mainLabelProps.tooltipProps` are set ', () => {
      const { getByTestId, rerender } = renderComponent(
        <SelectionCard
          onClick={() => {}}
          mainLabelProps={{ label: 'Main Label' }}
          action={{ label: 'CTA', onClick: () => {} }}
        />
      );

      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(getByTestId('selection-card-action-area-element')).toBeInTheDocument();
      expect(getByTestId('selection-card-action-area-element')?.tagName).toBe('BUTTON');
      rerender(
        <SelectionCard
          onClick={() => {}}
          mainLabelProps={{ label: 'Main Label' }}
          menuActions={{
            items: [
              {
                label: 'Action 1',
                onClick: () => {},
              },
              {
                label: 'Action 2',
                onClick: () => {},
              },
              {
                label: 'Action 3',
                onClick: () => {},
              },
            ],
          }}
        />
      );
      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(getByTestId('selection-card-action-area-element')).toBeInTheDocument();
      expect(getByTestId('selection-card-action-area-element')?.tagName).toBe('BUTTON');
      rerender(
        <SelectionCard onClick={() => {}} mainLabelProps={{ label: 'Main Label', tooltipProps: { content: 'Hi' } }} />
      );
      expect(getByTestId('selection-card')?.tagName).toBe('DIV');
      expect(getByTestId('selection-card-action-area-element')).toBeInTheDocument();
      expect(getByTestId('selection-card-action-area-element')?.tagName).toBe('BUTTON');
    });
    it('navigates between rendered selectable cards using keyboard', async () => {
      const { getByTestId, user } = renderComponent(
        <>
          <SelectionCard
            mainLabelProps={{ label: 'Main Label' }}
            onClick={() => {}}
            data-testid="first-card"
            action={{ label: 'CTA', onClick: () => {} }}
          />
          <SelectionCard
            mainLabelProps={{ label: 'Main Label' }}
            onClick={() => {}}
            data-testid="second-card"
            action={{ label: 'CTA', onClick: () => {} }}
          />
        </>
      );

      await user.tab();

      expect(getByTestId('first-card-action-area')).toHaveAttribute('data-focus-visible', 'true');
      expect(getByTestId('first-card-action-area-element')).toHaveFocus();
      await user.tab();
      expect(getByTestId('first-card-action')).toHaveFocus();

      await user.tab();
      expect(getByTestId('second-card-action-area')).toHaveAttribute('data-focus-visible', 'true');
      expect(getByTestId('second-card-action-area-element')).toHaveFocus();
      await user.tab();
      expect(getByTestId('second-card-action')).toHaveFocus();
    });
  });
});
