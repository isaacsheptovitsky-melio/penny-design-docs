import { createIconButtonTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { ButtonGroupProvider } from '@/components/action/ButtonGroup/ButtonGroupContext';
import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { IconButton, type IconButtonProps } from '..';
import { DEFAULT_DATA_TEST_ID } from '../IconButton.utils';

describe('IconButton', () => {
  let iconButtonTestKit: ReturnType<typeof createIconButtonTestKit>;

  beforeEach(() => {
    iconButtonTestKit = createIconButtonTestKit();
  });

  validateComponent<IconButtonProps>(IconButton, 'IconButton', {
    props: { 'aria-label': 'icon-button-test', icon: 'add' },
    defaultDataTestId: DEFAULT_DATA_TEST_ID,
  });

  it('invokes the onClick handler when clicking the button', async () => {
    const handleClick = vi.fn();

    renderComponent(<IconButton icon="add" aria-label="icon-button-test" onClick={handleClick} />);
    await iconButtonTestKit.click();

    expect(handleClick).toHaveBeenCalled();
  });

  it("doesn't invoke the onClick handler when clicking on a disabled button", async () => {
    const handleClick = vi.fn();

    renderComponent(<IconButton icon="add" aria-label="icon-button-test" isDisabled onClick={handleClick} />);

    await iconButtonTestKit.click();

    expect(handleClick).not.toHaveBeenCalled();
    expect(iconButtonTestKit.getDisabled()).toBeTruthy();
  });

  it('renders as a button element tag', () => {
    renderComponent(<IconButton icon="add" aria-label="icon-button-test" />);

    expect(iconButtonTestKit.getElement().tagName).toBe('BUTTON');
  });

  it('should render as an anchor tag', async () => {
    const handleClick = vi.fn();

    renderComponent(<IconButton onClick={handleClick} icon="add" aria-label="icon-button-test" link={{ href: '#' }} />);

    expect(iconButtonTestKit.getIsLink()).toBeTruthy();
    await iconButtonTestKit.click();
    expect(handleClick).toHaveBeenCalled();
  });

  describe('ButtonGroupContext precedence', () => {
    it('uses context values when props are undefined', () => {
      renderComponent(
        <ButtonGroupProvider isDisabled isLoading size="large" variant="secondary">
          <IconButton icon="add" aria-label="icon-button-test" />
        </ButtonGroupProvider>
      );

      expect(iconButtonTestKit.getDisabled()).toBeTruthy();
    });

    it('props explicitly override context, including explicit false', () => {
      renderComponent(
        <ButtonGroupProvider isDisabled isLoading size="large" variant="secondary">
          <IconButton icon="add" aria-label="icon-button-test" isDisabled={false} isLoading={false} />
        </ButtonGroupProvider>
      );

      expect(iconButtonTestKit.getDisabled()).toBeFalsy();
    });
  });
});
