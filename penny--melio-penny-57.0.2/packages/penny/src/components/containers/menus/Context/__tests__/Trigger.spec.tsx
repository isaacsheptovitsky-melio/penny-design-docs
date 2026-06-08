import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Trigger, type TriggerProps } from '../components';
import { type UseMenuReturn } from '../types';
import * as useMenuContextModule from '../useMenu';

vi.mock('../../useMenuContext', () => ({
  useMenuContext: vi.fn(),
}));

describe('Trigger', () => {
  const mockSetReference = vi.fn();

  beforeEach(() => {
    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getReferenceProps: vi.fn((props) => props as TriggerProps),
      refs: { setReference: mockSetReference },
      triggerProps: { trigger: <Button label="test" data-component="Trigger" />, isDisabled: false, isReadOnly: false },
    } as unknown as UseMenuReturn);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  validateComponent(Trigger, 'Trigger');

  it('renders the trigger element', () => {
    const { getByRole } = renderComponent(<Trigger data-component="Trigger" />);

    const button = getByRole('button', { name: /test/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-component', 'Trigger');
  });

  it('disables the trigger when `isDisabled` is true', () => {
    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getReferenceProps: vi.fn((props) => props as TriggerProps),
      refs: { setReference: mockSetReference },
      triggerProps: { trigger: <Button label="test" data-component="Trigger" />, isDisabled: true, isReadOnly: false },
    } as unknown as UseMenuReturn);

    const { getByRole } = renderComponent(<Trigger />);

    const button = getByRole('button', { name: /test/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  it('marks the trigger as readonly when `isReadOnly` is true', () => {
    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getReferenceProps: vi.fn((props) => props as TriggerProps),
      refs: { setReference: mockSetReference },
      triggerProps: { trigger: <Button label="test" data-component="Trigger" />, isDisabled: false, isReadOnly: true },
    } as unknown as UseMenuReturn);

    const { getByRole } = renderComponent(<Trigger />);

    const button = getByRole('button', { name: /test/i });
    expect(button).toHaveAttribute('data-readonly', 'true');
  });

  it('does not call `onClick` when `isDisabled` is true', () => {
    const onClickMock = vi.fn();

    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getReferenceProps: vi.fn((props) => props as TriggerProps),
      refs: { setReference: mockSetReference },
      triggerProps: {
        trigger: <Button label="test" data-component="Trigger" onClick={onClickMock} />,
        isDisabled: true,
        isReadOnly: false,
      },
    } as unknown as UseMenuReturn);

    const { getByRole } = renderComponent(<Trigger />);

    const button = getByRole('button', { name: /test/i });
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('calls `setReference` on render', () => {
    renderComponent(<Trigger />);

    expect(mockSetReference).toHaveBeenCalled();
  });

  it('propagates custom props to the trigger element', () => {
    const { getByRole } = renderComponent(<Trigger id="custom-id" />);

    const button = getByRole('button', { name: /test/i });
    expect(button).toHaveAttribute('id', 'custom-id');
  });

  it('calls `getReferenceProps` to extend trigger props', () => {
    const getReferencePropsMock = vi.fn((props) => props as TriggerProps);

    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getReferenceProps: getReferencePropsMock,
      refs: { setReference: mockSetReference },
      triggerProps: {
        trigger: <Button label="test" data-component="Trigger" />,
        isDisabled: false,
        isReadOnly: false,
      },
    } as unknown as UseMenuReturn);

    renderComponent(<Trigger data-component="test-trigger" />);

    expect(getReferencePropsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-component': 'Trigger',
        ref: expect.any(Function) as (instance: HTMLElement | null) => void,
        tabIndex: 0,
      })
    );
  });
});
