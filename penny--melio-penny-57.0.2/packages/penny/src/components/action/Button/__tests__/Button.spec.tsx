import { createButtonTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { ButtonGroupProvider } from '@/components/action/ButtonGroup/ButtonGroupContext';
import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { type ButtonLinkProps } from '../../action.types';
import { Button, type ButtonProps } from '..';
import { DEFAULT_DATA_TEST_ID } from '../button.utils';

describe('Button', () => {
  let buttonTestKit: ReturnType<typeof createButtonTestKit>;

  beforeEach(() => {
    buttonTestKit = createButtonTestKit();
  });

  validateComponent<ButtonProps>(Button, 'Button', {
    props: { label: 'Button label' },
    defaultDataTestId: DEFAULT_DATA_TEST_ID,
  });

  it('invokes the onClick handler when clicking the button', async () => {
    const handleClick = vi.fn();

    renderComponent(<Button onClick={handleClick} label="Button" />);
    await buttonTestKit.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders as a button element tag', () => {
    renderComponent(<Button label="Button" />);

    expect(buttonTestKit.getElement().tagName).toBe('BUTTON');
  });

  it('should render as an anchor tag', async () => {
    const handleClick = vi.fn();

    renderComponent(<Button onClick={handleClick} label="Button" link={{ href: '#' }} />);

    expect(buttonTestKit.getIsLink()).toBeTruthy();

    await buttonTestKit.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('removes aria-label when loading to ensure SR announcemnet of the loading state', () => {
    const { rerender, queryByText } = renderComponent(<Button label="Button" aria-label="Click me" />);

    expect(buttonTestKit.getElement().getAttribute('aria-label')).toBe('Click me');
    expect(queryByText('Loading...')).not.toBeInTheDocument();

    rerender(<Button label="Button" isLoading />);

    expect(buttonTestKit.getElement().getAttribute('aria-label')).toBeNull();
    expect(queryByText('Loading...')).toBeInTheDocument();
  });

  it('returns correct label text', () => {
    renderComponent(<Button label="Test Button Label" />);

    expect(buttonTestKit.getLabelText()).toBe('Test Button Label');
  });

  it('detects disabled state correctly', () => {
    const { rerender } = renderComponent(<Button label="Button" />);

    expect(buttonTestKit.getDisabled()).toBeFalsy();

    rerender(<Button label="Button" isDisabled />);

    expect(buttonTestKit.getDisabled()).toBeTruthy();
  });

  it('detects loading state correctly', () => {
    const { rerender } = renderComponent(<Button label="Button" />);

    expect(buttonTestKit.getIsLoading()).toBeFalsy();

    rerender(<Button label="Button" isLoading />);

    expect(buttonTestKit.getIsLoading()).toBeTruthy();
  });

  describe('ButtonGroupContext precedence', () => {
    it('uses context values when props are undefined', () => {
      const { getByTestId } = renderComponent(
        <ButtonGroupProvider isDisabled isLoading size="large" variant="secondary">
          <Button label="Button" />
        </ButtonGroupProvider>
      );

      expect(buttonTestKit.getDisabled()).toBeTruthy();
      expect(buttonTestKit.getIsLoading()).toBeTruthy();
      expect(getByTestId(DEFAULT_DATA_TEST_ID).getAttribute('data-loading')).toBe('true');
    });

    it('props explicitly override context, including explicit false', () => {
      const { rerender, getByTestId } = renderComponent(
        <ButtonGroupProvider isDisabled isLoading size="large" variant="secondary">
          <Button label="Button" isDisabled={false} isLoading={false} />
        </ButtonGroupProvider>
      );

      expect(buttonTestKit.getDisabled()).toBeFalsy();
      expect(buttonTestKit.getIsLoading()).toBeFalsy();
      expect(getByTestId(DEFAULT_DATA_TEST_ID).getAttribute('data-loading')).toBeNull();

      rerender(
        <ButtonGroupProvider isDisabled={false} isLoading={false} size="large" variant="secondary">
          <Button label="Button" isDisabled isLoading />
        </ButtonGroupProvider>
      );

      expect(buttonTestKit.getDisabled()).toBeTruthy();
      expect(buttonTestKit.getIsLoading()).toBeTruthy();
      expect(getByTestId(DEFAULT_DATA_TEST_ID).getAttribute('data-loading')).toBe('true');
    });
  });

  describe('Button as a link', () => {
    const link: ButtonLinkProps['link'] = { href: '/test-page', target: '_blank' };

    it('should element be `a` tag', () => {
      renderComponent(<Button label="Button" link={link} />);

      expect(buttonTestKit.getIsLink()).toBe(true);
    });

    it('should element have href arrtribute', () => {
      const { getByTestId } = renderComponent(<Button label="Button" link={link} />);

      expect(getByTestId('button').getAttribute('href')).toBe(link.href);
    });
  });
});
