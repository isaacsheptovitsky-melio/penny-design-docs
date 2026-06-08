import { faker } from '@faker-js/faker';
import { act } from 'react';
import { expect } from 'vitest';

import { Form } from '@/components/form/components/Form';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Collapsible } from '../Collapsible';

validateComponent(Collapsible, 'Collapsible', { props: { label: 'label' } });

describe('Collapsible', () => {
  const label = faker.random.words();
  const secondaryLabel = faker.random.words();
  const children = faker.random.words();

  describe('expanding and closing', () => {
    it('toggles between expanding and hiding when clicking on the label ', async () => {
      const { getByTestId, getByText, queryByText, user } = renderComponent(
        <Collapsible label={label} secondaryLabel={secondaryLabel}>
          {children}
        </Collapsible>
      );

      await act(async () => user.click(getByText(label)));
      expect(getByTestId('collapsible-trigger')).toHaveAttribute('aria-expanded', 'true');
      expect(getByText(label)).toBeInTheDocument();
      expect(getByText(secondaryLabel)).toBeInTheDocument();

      await act(async () => user.click(getByText(label)));
      expect(getByTestId('collapsible-trigger')).toHaveAttribute('aria-expanded', 'false');
      expect(getByText(label)).toBeInTheDocument();
      expect(queryByText(secondaryLabel)).not.toBeInTheDocument();
    });
  });

  describe('defaultIsExpanded', () => {
    it('is expanded if defaultIsExpanded is passed', () => {
      const { getByTestId } = renderComponent(
        <Collapsible label={label} secondaryLabel={secondaryLabel} defaultIsExpanded>
          {children}
        </Collapsible>
      );
      expect(getByTestId('collapsible-trigger')).toHaveAttribute('aria-expanded', 'true');
    });

    it('is not expanded if defaultIsExpanded is not passed', () => {
      const { getByTestId } = renderComponent(
        <Collapsible label={label} secondaryLabel={secondaryLabel}>
          {children}
        </Collapsible>
      );
      expect(getByTestId('collapsible-trigger')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // Regerssion test for ME-57648
  it('does not submit the form when the button is clicked', async () => {
    const handleSubmit = vi.fn();

    const { getByRole, user } = renderComponent(
      <Form onSubmit={handleSubmit}>
        <Collapsible label={label} secondaryLabel={secondaryLabel} defaultIsExpanded>
          {children}
        </Collapsible>
      </Form>
    );

    await act(async () => user.click(getByRole('button')));
    expect(handleSubmit).not.toBeCalled();
  });
});
