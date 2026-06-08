import { Box } from '@chakra-ui/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { _Description } from '../_Description';

describe('_Description', () => {
  validateComponent(_Description, '_Description', { props: { label: 'yes!' } });

  it('renders the description as a <div> HTML tag element by default.', () => {
    const { getByTestId } = renderComponent(<_Description label="Hello" data-testid="description" />);
    expect(getByTestId('description').tagName).toBe('DIV');
  });

  it("renders the description using the provided 'as' custom HTML tag element.", () => {
    const elementTag = 'legend';
    const { getByTestId } = renderComponent(<_Description label="Hello" as={elementTag} data-testid="description" />);
    expect(getByTestId('description').tagName).toBe(elementTag.toUpperCase());
  });

  it("invokes the action's onClick when clicking it", async () => {
    const handleClick = vi.fn();
    const { getByText, user } = renderComponent(
      <_Description label="Hello" action={{ label: 'Click me', onClick: handleClick }} />
    );

    await user.click(getByText('Click me'));

    expect(handleClick).toHaveBeenCalled();
  });

  it("doesn't propagate the action's onClick event when clicking it", async () => {
    const parentClick = vi.fn();
    const handleClick = vi.fn();
    const { getByText, user } = renderComponent(
      <Box onClick={parentClick}>
        <_Description label="Hello" action={{ label: 'Click me', onClick: handleClick }} />
      </Box>
    );

    await user.click(getByText('Click me'));

    expect(handleClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('render a tag when link attribute is provided with href in action prop', () => {
    const { getByRole } = renderComponent(
      <Box>
        <_Description label="Hello" action={{ label: 'Click me', link: { href: '#' } }} />
      </Box>
    );
    expect(getByRole('link', { name: 'Click me' }).tagName).toBe('A');
  });

  it("doesn't propagate the link's onClick event when clicking it", async () => {
    const parentClick = vi.fn();
    const { getByText, user } = renderComponent(
      <Box onClick={parentClick}>
        <_Description label="Hello" link={{ label: 'Click me', href: '#' }} />
      </Box>
    );

    await user.click(getByText('Click me'));

    expect(parentClick).not.toHaveBeenCalled();
  });
});
