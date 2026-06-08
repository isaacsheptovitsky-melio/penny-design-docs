import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';

import { buttonVariants } from '../Button/Button.types';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Chromatic/Button Group',
  component: ButtonGroup,
  parameters: { docs: { source: { type: 'code' } } },
};
export default meta;

export const Variants: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const variants = buttonVariants.filter((v) => v !== 'success');
    return (
      <Storybook.Container>
        <Storybook.Row
          alignCompLabel="vertical"
          items={variants.map((variant) => ({
            label: variant,
            component: (
              <Storybook.VisualWrapper isInverse={variant.includes('-inverse')}>
                <ButtonGroup variant={variant}>
                  <Button label="Copy" onClick={() => {}} />
                  <Button label="Paste" onClick={() => {}} />
                  <Button label="Delete" onClick={() => {}} />
                </ButtonGroup>
              </Storybook.VisualWrapper>
            ),
          }))}
        />
      </Storybook.Container>
    );
  },
};

export const Disabled: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const variants = buttonVariants.filter((v) => v !== 'success');
    return (
      <Storybook.Container>
        <Storybook.Row
          alignCompLabel="vertical"
          items={variants.map((variant) => ({
            label: variant,
            component: (
              <Storybook.VisualWrapper isInverse={variant.includes('-inverse')}>
                <ButtonGroup variant={variant} isDisabled>
                  <Button label="Copy" onClick={() => {}} />
                  <Button label="Paste" onClick={() => {}} />
                  <Button label="Delete" onClick={() => {}} />
                </ButtonGroup>
              </Storybook.VisualWrapper>
            ),
          }))}
        />
      </Storybook.Container>
    );
  },
};

export const Loading: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const variants = buttonVariants.filter((v) => v !== 'success');
    return (
      <Storybook.Container>
        <Storybook.Row
          alignCompLabel="vertical"
          items={variants.map((variant) => ({
            label: variant,
            component: (
              <Storybook.VisualWrapper isInverse={variant.includes('-inverse')}>
                <ButtonGroup variant={variant} isLoading>
                  <Button label="Copy" onClick={() => {}} />
                  <Button label="Paste" onClick={() => {}} />
                  <Button label="Delete" onClick={() => {}} />
                </ButtonGroup>
              </Storybook.VisualWrapper>
            ),
          }))}
        />
      </Storybook.Container>
    );
  },
};
