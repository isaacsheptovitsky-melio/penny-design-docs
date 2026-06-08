import { Box } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import { act, fireEvent } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { renderComponent } from '@/test-utils/render.utils';

import { ActionArea } from '../ActionArea';
import { useActionArea, type UseActionAreaProps } from '../useActionArea';

const DEFAULT_TEST_CONTENT = 'Test action area';
const DEFAULT_CONTAINER_TEST_ID = 'test-container';

const TestBackgroundActionArea = (
  props?: { useActionAreaProps?: UseActionAreaProps } & PropsWithChildren<HTMLAttributes<HTMLDivElement> & TestIdProp>
) => {
  const { useActionAreaProps, children, ...rest } = props || {};
  const { containerProps, actionAreaProps } = useActionArea({ ...useActionAreaProps });

  return (
    <Box data-testid={DEFAULT_CONTAINER_TEST_ID} {...rest} {...containerProps}>
      <ActionArea {...actionAreaProps} />
      {children ?? DEFAULT_TEST_CONTENT}
    </Box>
  );
};

describe('ActionArea', () => {
  it('ActionArea has descriptive name', () => {
    const { getByLabelText, getByTestId } = renderComponent(<TestBackgroundActionArea />);

    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).toHaveAttribute('id', 'action-area-1');
    expect(getByLabelText(DEFAULT_TEST_CONTENT)).toHaveAttribute('aria-labelledby', 'action-area-1');
    expect(getByLabelText(DEFAULT_TEST_CONTENT)).toHaveAccessibleName('Test action area');
  });

  it('sets data-hover to the container on hover over the ActionArea', async () => {
    const { getByTestId, getByLabelText, user } = renderComponent(<TestBackgroundActionArea />);

    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).not.toHaveAttribute('data-hover');
    await user.hover(getByLabelText(DEFAULT_TEST_CONTENT));
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).toHaveAttribute('data-hover', 'true');
  });

  it('removes data-hover on mouse leave', async () => {
    const { getByTestId, getByLabelText, user } = renderComponent(<TestBackgroundActionArea />);

    await user.hover(getByLabelText(DEFAULT_TEST_CONTENT));
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).toHaveAttribute('data-hover', 'true');
    // Simulate mouseLeave with coordinates explicitly outside the container
    act(() => {
      fireEvent.mouseLeave(getByLabelText(DEFAULT_TEST_CONTENT), { clientX: 101, clientY: 101 });
    });
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).not.toHaveAttribute('data-hover');
  });

  it('does not set data-focus-visible on click', async () => {
    const { getByTestId, getByLabelText, user } = renderComponent(<TestBackgroundActionArea />);

    await user.click(getByLabelText(DEFAULT_TEST_CONTENT));
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).not.toHaveAttribute('data-focus-visible');
  });

  it('sets data-focus-visible to the container on focusing the action area', async () => {
    const { getByTestId, user } = renderComponent(<TestBackgroundActionArea />);

    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).not.toHaveAttribute('data-focus-visible');
    await user.tab();
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).toHaveAttribute('data-focus-visible', 'true');
    await user.tab();
    expect(getByTestId(DEFAULT_CONTAINER_TEST_ID)).not.toHaveAttribute('data-focus-visible');
  });

  it('triggers onClick event', async () => {
    const onClick = vi.fn();
    const { getByLabelText, user } = renderComponent(
      <TestBackgroundActionArea
        useActionAreaProps={{
          onClick,
        }}
      />
    );

    await user.click(getByLabelText(DEFAULT_TEST_CONTENT));
    expect(onClick).toBeCalled();
  });

  it('triggers onFocus event', async () => {
    const onFocus = vi.fn();
    const { getByLabelText, user } = renderComponent(
      <TestBackgroundActionArea
        useActionAreaProps={{
          onFocus,
        }}
      />
    );

    await user.tab();
    expect(getByLabelText(DEFAULT_TEST_CONTENT)).toHaveFocus();
    expect(onFocus).toBeCalled();
  });

  it('triggers the correct onClick event', async () => {
    const onClick = vi.fn();
    const buttonOnClick = vi.fn();
    const { getByText, getByTestId, user } = renderComponent(
      <TestBackgroundActionArea
        useActionAreaProps={{
          onClick,
        }}
      >
        {DEFAULT_TEST_CONTENT}
        <Box position="relative">
          <Button label="Button Label" onClick={buttonOnClick} />
        </Box>
      </TestBackgroundActionArea>
    );

    await user.click(getByTestId('action-area'));
    await user.click(getByText('Button Label'));
    expect(buttonOnClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
  });
});
