import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { IconButton } from '@/components/action/IconButton';
import { Menu, MenuItem } from '@/components/containers/menus';
import { Icon } from '@/components/foundations/Icon';

import { buttonVariants } from '../Button/Button.types';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Action Components/Button Group [new]',
  component: ButtonGroup,
  tags: ['a11y-include'],
  parameters: { docs: { source: { type: 'code' } } },
  args: {
    variant: 'primary',
    size: 'medium',
    isLoading: false,
    isDisabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: buttonVariants.filter((v) => v !== 'success'),
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: (buttonVariants as readonly string[]).join(' | ') },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    isDisabled: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'button-group' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
};
export default meta;

export const Main: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <Storybook.VisualWrapper isInverse={args.variant?.includes('-inverse')}>
      <ButtonGroup {...args}>
        <Button label="Copy" onClick={() => logAction('Copy')} />
        <Button label="Paste" onClick={() => logAction('Paste')} />
        <Button label="Delete" onClick={() => logAction('Delete')} />
      </ButtonGroup>
    </Storybook.VisualWrapper>
  ),
};

export const IconButtons: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <Storybook.VisualWrapper isInverse={args.variant?.includes('-inverse')}>
      <ButtonGroup {...args}>
        <IconButton aria-label="Copy" icon="copy" />
        <IconButton aria-label="Paste" icon="file-move" />
        <IconButton aria-label="Delete" icon="add-bills" />
      </ButtonGroup>
    </Storybook.VisualWrapper>
  ),
};

/**
 * Create a split button group by adding a `Button`, `IconButton` and a `Menu` together
 * under the `ButtonGroup` container.
 */
export const AsSplitButton: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const options = useMemo(
      () => [
        {
          key: 'save-draft',
          label: 'Save draft',
          left: <Icon type="archive-box" size="small" aria-hidden />,
          callback: () => {
            setIsOpen(false);
            logAction('Save draft');
          },
        },
        {
          key: 'save-and-publish',
          label: 'Save and publish',
          left: <Icon type="save" size="small" aria-hidden />,
          callback: () => {
            setIsOpen(false);
            logAction('Save and publish');
          },
        },
        {
          key: 'save-as-template',
          label: 'Save as template',
          left: <Icon type="compose" size="small" aria-hidden />,
          callback: () => {
            setIsOpen(false);
            logAction('Save as template');
          },
        },
      ],
      [setIsOpen]
    );
    return (
      <Storybook.VisualWrapper isInverse={args.variant?.includes('-inverse')}>
        <ButtonGroup {...args}>
          <Button label="Save" onClick={() => logAction('Save')} />
          <Menu
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            trigger={<IconButton aria-label="More actions" icon="caret-down" />}
          >
            {options.map((opt) => (
              <MenuItem
                key={opt.key}
                label={opt.label}
                leftElement={opt.left}
                onClick={opt.callback}
                aria-label={opt.label}
              />
            ))}
          </Menu>
        </ButtonGroup>
      </Storybook.VisualWrapper>
    );
  },
};

// util
function logAction(label: string) {
  // eslint-disable-next-line no-console
  console.log(`[ButtonGroup story] ${label}`);
}
