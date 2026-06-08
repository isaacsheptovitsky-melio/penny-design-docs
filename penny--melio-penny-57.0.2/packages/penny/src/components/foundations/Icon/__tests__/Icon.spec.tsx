import { createIconTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';
import { ICON_DEFAULT_DATA_TEST_ID } from '../Icon.utils';

describe('Icon', () => {
  let testKit: ReturnType<typeof createIconTestKit>;

  beforeEach(() => {
    testKit = createIconTestKit();
  });

  validateComponent<IconProps>(Icon, 'Icon', {
    props: { size: 'small', type: 'calculator' },
  });

  it('should handle dataTestId', () => {
    renderComponent(<Icon type="calculator" />);

    expect(testKit.dataTestId).toBe(ICON_DEFAULT_DATA_TEST_ID);
  });

  it('should handle visible', () => {
    renderComponent(<Icon type="calculator" />);

    expect(testKit.getElement()).toBeInTheDocument();
    expect(testKit.getVisible()).toBe(true);
  });

  it('should handle disabled', () => {
    renderComponent(<Icon type="calculator" isDisabled />);

    expect(testKit.getDisabled()).toBe(true);
    expect(testKit.getReadOnly()).toBe(false);
  });

  it('should handle read-only', () => {
    renderComponent(<Icon type="calculator" isReadOnly />);

    expect(testKit.getReadOnly()).toBe(true);
    expect(testKit.getDisabled()).toBe(false);
  });

  it('should detect brand color', () => {
    renderComponent(<Icon type="calculator" color="brand" />);

    expect(testKit.getIsBrandColor()).toBe(true);
  });

  it('should handle ARIA attributes', () => {
    const ariaLabel = 'Calculator icon';
    renderComponent(<Icon type="calculator" aria-label={ariaLabel} />);

    expect(testKit.getElement().getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('should handle role attribute', () => {
    const role = 'img';
    renderComponent(<Icon type="calculator" role={role} />);

    expect(testKit.getRole()).toBe(role);
  });

  it('should handle click when disabled', () => {
    renderComponent(<Icon type="calculator" isDisabled />);

    expect(testKit.getDisabled()).toBe(true);
  });

  it('should handle active state', () => {
    renderComponent(<Icon type="calculator" data-active />);

    expect(testKit.getActive()).toBe(true);
  });

  it('should handle inactive state', () => {
    renderComponent(<Icon type="calculator" />);

    expect(testKit.getActive()).toBe(false);
  });
});
