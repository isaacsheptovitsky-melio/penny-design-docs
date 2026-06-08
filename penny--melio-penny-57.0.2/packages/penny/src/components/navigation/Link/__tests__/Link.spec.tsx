import { expect } from 'vitest';

import { COMPONENTS_DEFAULT_TEST_IDS, renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Link } from '../Link';
import { type LinkProps } from '../Link.types';

const href = 'https://www.youtube.com/watch?v=ZkNMZlkrzaU';

describe('Link', () => {
  validateComponent<LinkProps>(Link, 'Link', {
    props: { href, label: 'Click me' },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.LINK,
  });

  it('invokes the href handler when clicking the link', () => {
    const { getByTestId } = renderComponent(<Link label="test" href={href} data-testid="link-test" />);

    expect(getByTestId('link-test')).toHaveAttribute('href', href);
    expect(getByTestId('link-test')).toHaveAttribute('target', '_self');
  });

  it("doesn't invoke the href handler when disabled", () => {
    const { getByTestId } = renderComponent(<Link label="test" href={href} data-testid="link-test" isDisabled />);

    expect(getByTestId('link-test')).not.toHaveAttribute('href', href);
    expect(getByTestId('link-test')).not.toHaveAttribute('target', '_self');
  });

  it('marks the link to open in a new tab', () => {
    const { getByTestId } = renderComponent(<Link label="test" href={href} data-testid="link-test" newTab />);

    expect(getByTestId('link-test')).toHaveAttribute('target', '_blank');
  });

  it('marks the link to open in the same tab', () => {
    const { getByTestId } = renderComponent(<Link label="test" href={href} data-testid="link-test" newTab={false} />);

    expect(getByTestId('link-test')).toHaveAttribute('target', '_self');
  });

  it('invokes the click handler when clicking the link', async () => {
    const handleClick = vi.fn();

    const { getByTestId, user } = renderComponent(
      <Link
        label="test"
        href="https://www.youtube.com/watch?v=ZkNMZlkrzaU"
        onClick={handleClick}
        data-testid="link-test"
      />
    );

    await user.click(getByTestId('link-test'));

    expect(handleClick).toHaveBeenCalled();
  });

  it("doesn't invoke the click handler when disabled", async () => {
    const handleClick = vi.fn();

    const { getByTestId, user } = renderComponent(
      <Link
        label="test"
        href="https://www.youtube.com/watch?v=ZkNMZlkrzaU"
        onClick={handleClick}
        data-testid="link-test"
        isDisabled
      />
    );

    await user.click(getByTestId('link-test'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
