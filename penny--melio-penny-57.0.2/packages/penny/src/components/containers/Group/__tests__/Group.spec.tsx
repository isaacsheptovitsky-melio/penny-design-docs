import { Box } from '@chakra-ui/react';
import { expect } from 'vitest';

import { TextField } from '@/components/selectionAndInputs/TextField';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Group } from '..';

validateComponent(Group, 'Group');

describe('Group', () => {
  it('Does not render null children', () => {
    const { getByTestId } = renderComponent(
      <Group variant="horizontal" data-testid="group-test">
        <Box>Element 1</Box>
        {null}
        <Box>Element 2</Box>
        <Box>Element 3</Box>
      </Group>
    );

    expect(getByTestId('group-test').childNodes).toHaveLength(3);
  });
  it('render divider a11y props as should', () => {
    const { getAllByRole } = renderComponent(
      <Group variant="horizontal" hasDivider as="ul" dividerProps={{ as: 'li', role: 'listitem' }}>
        <Box>Element 1</Box>
        <Box>Element 2</Box>
        <Box>Element 3</Box>
      </Group>
    );

    expect(getAllByRole('listitem')[0]?.tagName).toBe('LI');
    expect(getAllByRole('listitem')).toHaveLength(2);
  });
  it('when group is ul, the divider will rendered as li', () => {
    const { getAllByRole } = renderComponent(
      <Group variant="horizontal" hasDivider as="ul" dividerProps={{ role: 'listitem' }}>
        <Box>Element 1</Box>
        <Box>Element 2</Box>
        <Box>Element 3</Box>
      </Group>
    );

    expect(getAllByRole('listitem')[0]?.tagName).toBe('LI');
  });

  it('preserve first child state when adding new item to group with dividers', async () => {
    const { rerender, getByTestId, user } = renderComponent(
      <Group variant="vertical" alignItems="flex-start" hasDivider>
        <TextField data-testid="field-1" />
      </Group>
    );

    await user.type(getByTestId('field-1'), 'bla');
    expect(getByTestId('field-1')).toHaveValue('bla');

    rerender(
      <Group variant="vertical" alignItems="flex-start" hasDivider>
        <TextField data-testid="field-1" />
        <TextField data-testid="field-2" />
      </Group>
    );
    expect(getByTestId('field-1')).toHaveValue('bla');
  });

  it('preserve first child state when adding new item to group without dividers', async () => {
    const { rerender, getByTestId, user } = renderComponent(
      <Group>
        <TextField data-testid="field-1" />
      </Group>
    );

    await user.type(getByTestId('field-1'), 'bla');
    expect(getByTestId('field-1')).toHaveValue('bla');

    rerender(
      <Group>
        <TextField data-testid="field-1" />
        <TextField data-testid="field-2" />
      </Group>
    );
    expect(getByTestId('field-1')).toHaveValue('bla');
  });

  it('preserve last child state when removing the first item of the group without dividers', async () => {
    const { rerender, getByTestId, user } = renderComponent(
      <Group>
        <Group>
          <TextField data-testid="field-1" key="f1" />
          <TextField data-testid="field-2" key="f2" />
        </Group>
        <TextField data-testid="field-3" key="f3" />
      </Group>
    );

    await user.type(getByTestId('field-1'), 'lala');
    await user.type(getByTestId('field-2'), 'bla');
    expect(getByTestId('field-2')).toHaveValue('bla');

    rerender(
      <Group>
        <Group>
          <TextField data-testid="field-2" key="f2" />
        </Group>
        <TextField data-testid="field-3" key="f3" />
      </Group>
    );
    expect(getByTestId('field-2')).toHaveValue('bla');
  });
  it('preserve last child state when removing the first item of the group with dividers', async () => {
    const { rerender, getByTestId, user } = renderComponent(
      <Group hasDivider>
        <Group hasDivider>
          <TextField data-testid="field-1" key="f1" />
          <TextField data-testid="field-2" key="f2" />
        </Group>
        <TextField data-testid="field-3" key="f3" />
      </Group>
    );

    await user.type(getByTestId('field-1'), 'lala');
    await user.type(getByTestId('field-2'), 'bla');
    expect(getByTestId('field-2')).toHaveValue('bla');

    rerender(
      <Group hasDivider>
        <Group hasDivider>
          <TextField data-testid="field-2" key="f2" />
        </Group>
        <TextField data-testid="field-3" key="f3" />
      </Group>
    );
    expect(getByTestId('field-2')).toHaveValue('bla');
  });
});
