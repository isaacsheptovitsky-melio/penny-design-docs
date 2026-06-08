import { createNakedButtonTestKit } from '@melio/penny-testkit-rtl';
import type { ReactNode } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { renderComponent } from '@/test-utils/render.utils';

import type { NakedButtonProps } from '..';
import { NakedButton } from '..';

describe('NakedButton', () => {
  let testKit: ReturnType<typeof createNakedButtonTestKit>;

  beforeEach(() => {
    testKit = createNakedButtonTestKit();
  });

  validateComponent<
    NakedButtonProps & {
      children?: ReactNode;
    }
  >(NakedButton, 'NakedButton', {
    props: { label: 'Naked Button label' },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.NAKED_BUTTON,
  });

  it('should show label', () => {
    const label = 'Submit';
    renderComponent(<NakedButton label={label} />);

    expect(testKit.getLabelText()).toBe(label);
  });

  it('should call `onClick` when is enabled', async () => {
    const onClick = vi.fn();
    renderComponent(<NakedButton onClick={onClick} label="Button" />);

    await testKit.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call `onClick` when is disabled', async () => {
    const onClick = vi.fn();
    renderComponent(<NakedButton isDisabled onClick={onClick} label="Button" />);

    await testKit.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as a button element tag', () => {
    renderComponent(<NakedButton isDisabled label="Button" />);

    expect(testKit.getElement().tagName).toBe('BUTTON');
  });

  it('should render as an anchor tag', async () => {
    const handleClick = vi.fn();
    renderComponent(<NakedButton onClick={handleClick} label="Button" link={{ href: '/test-page' }} />);

    await testKit.click();

    expect(testKit.getIsLink()).toBe(true);
    expect(testKit.getHref()).toBe('/test-page');
    expect(handleClick).toHaveBeenCalled();
  });
});
