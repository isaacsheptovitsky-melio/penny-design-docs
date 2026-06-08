import { screen, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { renderComponent } from '@/test-utils';

import {
  ControlledAccordionHarness,
  ExplicitValueUncontrolledAccordion,
  ImplicitValueUncontrolledAccordion,
} from './Accordion.spec.utils';

describe('<Accordion />', () => {
  describe('uncontrolled (implicit item value)', () => {
    it('toggles a section closed and open when the trigger is clicked (custom indicator test ids)', async () => {
      const { user } = renderComponent(<ImplicitValueUncontrolledAccordion />);

      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Section content 1')).not.toBeInTheDocument();
      expect(screen.getByTestId('item-1-trigger-indicator-collapsed')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByTestId('item-1-trigger-indicator-expanded')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('item-1-trigger-indicator-collapsed')).toBeInTheDocument();
    });
  });

  describe('uncontrolled (explicit item value)', () => {
    it('toggles a section closed and open when the trigger is clicked', async () => {
      const { user } = renderComponent(<ExplicitValueUncontrolledAccordion />);

      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Section content 1')).not.toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();
    });

    it('expands one section and collapses the previously expanded section (single selection)', async () => {
      const { user } = renderComponent(<ExplicitValueUncontrolledAccordion />);

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 2' }));
      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();
    });

    it('allows multiple expanded sections when isMultiple is set', async () => {
      const { user } = renderComponent(<ExplicitValueUncontrolledAccordion isMultiple />);

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      await user.click(screen.getByRole('button', { name: 'Section title 2' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.queryByText('Section content 1')).toBeInTheDocument();
      expect(screen.queryByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.queryByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();
    });
  });

  describe('controlled', () => {
    const onValueChange = vi.fn();

    beforeEach(() => {
      onValueChange.mockReset();
    });

    it('expands a section when the trigger is clicked and reports value via onValueChange', async () => {
      const { user } = renderComponent(<ControlledAccordionHarness onValueChange={onValueChange} />);

      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Section content 1')).not.toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();
      expect(onValueChange).toHaveBeenNthCalledWith(1, ['1']);
    });

    it('expands one section and collapses the previously expanded section (single selection) and reports value via onValueChange', async () => {
      const { user } = renderComponent(<ControlledAccordionHarness onValueChange={onValueChange} />);

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();
      expect(onValueChange).toHaveBeenNthCalledWith(1, ['1']);

      await user.click(screen.getByRole('button', { name: 'Section title 2' }));
      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      expect(onValueChange).toHaveBeenNthCalledWith(2, ['2']);
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();
    });

    it('allows multiple expanded sections when isMultiple is set and reports value via onValueChange', async () => {
      const { user } = renderComponent(<ControlledAccordionHarness onValueChange={onValueChange} isMultiple />);

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(onValueChange).toHaveBeenNthCalledWith(1, ['1']);
      await user.click(screen.getByRole('button', { name: 'Section title 2' }));
      expect(onValueChange).toHaveBeenNthCalledWith(2, ['1', '2']);
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'true')
      );
      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.queryByText('Section content 1')).toBeInTheDocument();
      expect(screen.queryByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-expanded')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Section title 1' }));
      expect(screen.getByRole('button', { name: 'Section title 1' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Section content 1')).not.toBeInTheDocument());
      expect(screen.getByTestId('accordion-item-1-trigger-indicator-collapsed')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Section title 2' })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.queryByText('Section content 2')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-item-2-trigger-indicator-expanded')).toBeInTheDocument();
    });
  });

  describe('keepMounted', () => {
    it('keeps panel content in the DOM but not visible when the section is collapsed', () => {
      renderComponent(<ExplicitValueUncontrolledAccordion keepMounted />);

      expect(screen.getByText('Section content 1')).toBeInTheDocument();
      expect(screen.getByText('Section content 1')).not.toBeVisible();
    });
  });
});
