import { createStatusIconSolidTestKit } from '@melio/penny-testkit-rtl';
import { render } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { StatusIconSolid } from '../StatusIconSolid';
import type { StatusIconSolidProps } from '../StatusIconSolid.types';

describe('StatusIconSolid', () => {
  validateComponent<StatusIconSolidProps>(StatusIconSolid, 'StatusIconSolid', {
    props: { variant: 'success', size: 'large', 'data-testid': 'success-status-icon-solid' },
  });
});

describe('StatusIconSolid TestKit', () => {
  let testKit: ReturnType<typeof createStatusIconSolidTestKit>;

  beforeEach(() => {
    testKit = createStatusIconSolidTestKit();
  });

  it('should exist', () => {
    render(<StatusIconSolid variant="success" size="large" />);

    expect(testKit.getElement()).toBeInTheDocument();
  });

  it('should be visible', () => {
    render(<StatusIconSolid variant="success" size="large" />);

    expect(testKit.getVisible()).toBe(true);
  });

  it('should be active', () => {
    render(<StatusIconSolid variant="success" size="large" data-active />);

    expect(testKit.getActive()).toBe(true);
  });

  it('should be disabled', () => {
    const { rerender } = render(<StatusIconSolid variant="success" size="large" isDisabled />);

    expect(testKit.getDisabled()).toBe(true);

    rerender(<StatusIconSolid variant="success" size="large" isDisabled={false} />);

    expect(testKit.getDisabled()).toBe(false);
  });

  it('should be readonly', () => {
    const { rerender } = render(<StatusIconSolid variant="success" size="large" isReadOnly />);

    expect(testKit.getReadOnly()).toBe(true);

    rerender(<StatusIconSolid variant="success" size="large" isReadOnly={false} />);

    expect(testKit.getReadOnly()).toBe(false);
  });

  it('should get brand color', () => {
    const { rerender } = render(<StatusIconSolid variant="success" size="large" data-is-brand-color="true" />);

    expect(testKit.getIsBrandColor()).toBe(true);

    rerender(<StatusIconSolid variant="success" size="large" data-is-brand-color="false" />);

    expect(testKit.getIsBrandColor()).toBe(false);
  });

  it('should get aria attribute', () => {
    const label = 'test-label';

    render(<StatusIconSolid variant="success" size="large" aria-label={label} />);

    expect(testKit.getElement().getAttribute('aria-label')).toBe(label);
  });

  it('should get data attribute', () => {
    render(<StatusIconSolid variant="success" size="large" data-foo="bar" />);

    expect(testKit.getElement().getAttribute('data-foo')).toBe('bar');
  });

  it('should get role', () => {
    render(<StatusIconSolid variant="success" size="large" role="img" />);

    expect(testKit.getRole()).toBe('img');
  });
});
