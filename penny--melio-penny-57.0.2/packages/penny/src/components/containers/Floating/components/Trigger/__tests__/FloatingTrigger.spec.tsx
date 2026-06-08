import { expect } from 'vitest';

import { Button } from '@/components/action/Button/Button';
import { TableCell } from '@/components/table/Table/TableCell/TableCell';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Trigger } from '../Trigger';
import { type TriggerProps } from '../Trigger.types';

describe('Trigger', () => {
  const getReferencePropsMock = vi.fn((props) => props as TriggerProps);
  const defaultProps: TriggerProps = {
    children: <Button data-testid="inside-button" label="button trigger" />,
    getReferenceProps: getReferencePropsMock,
    setTriggerRef: vi.fn(),
  };

  validateComponent(Trigger, 'Trigger', {
    props: defaultProps,
    customDataComponentValidation: (getByTestId, testId) => {
      // The Trigger component sets data-component="FloatingTrigger" on the cloned child element
      const element = getByTestId(testId);
      expect(element).toHaveAttribute('data-component', 'FloatingTrigger');
    },
  });

  it('renders the trigger element', () => {
    const { getByRole } = renderComponent(<Trigger {...defaultProps} />);

    const button = getByRole('button', { name: /button trigger/i });
    expect(button).toBeInTheDocument();
  });

  it('disables the trigger when `isDisabled` is true', () => {
    const { getByRole } = renderComponent(<Trigger {...defaultProps} isDisabled />);

    const button = getByRole('button', { name: /button trigger/i });
    expect(button).toBeDisabled();
  });

  it('does not call `onClick` when `isDisabled` is true', async () => {
    const onClickMock = vi.fn();

    const { getByRole, user } = renderComponent(<Trigger {...defaultProps} isDisabled />);

    const button = getByRole('button', { name: /button trigger/i });
    await user.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('renders with data component of its child', () => {
    const { getByTestId } = renderComponent(
      <Trigger {...defaultProps}>
        <TableCell data-component="TableDateCell" data-testid="table-date-cell" />
      </Trigger>
    );

    const button = getByTestId('table-date-cell');
    expect(button).toHaveAttribute('data-component', 'TableDateCell');
  });

  it('propagates custom props to the trigger element', () => {
    const { getByTestId } = renderComponent(<Trigger {...defaultProps} data-testid="custom-id" />);

    const button = getByTestId('custom-id');
    expect(button).toBeInTheDocument();
  });

  it('calls `getReferenceProps` to extend trigger props', () => {
    renderComponent(<Trigger {...defaultProps} />);

    expect(getReferencePropsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-component': 'FloatingTrigger',
        ref: expect.any(Function) as (instance: HTMLElement | null) => void,
      })
    );
  });
});
