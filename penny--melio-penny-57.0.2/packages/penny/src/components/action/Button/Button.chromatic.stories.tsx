import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Chromatic/Button',
  component: Button,
};
export default meta;

export const VariantsFocused: StoryObj<typeof Button> = {
  render: (args) => (
    <Group alignItems="center">
      <Button {...args} label="Primary" id="primary" />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="primary-inverse" label="Primary Inverse" id="primary-inverse" />
      </Storybook.Container>
      <Button {...args} variant="secondary" label="Secondary" id="secondary" />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="secondary-inverse" label="Secondary Inverse" id="secondary-inverse" />
      </Storybook.Container>
      <Button {...args} variant="tertiary" label="Tertiary" id="tertiary" />
      <Button {...args} variant="success" label="Success" id="success" />
      <Button {...args} variant="critical" label="Critical" id="critical" />
    </Group>
  ),
  parameters: {
    pseudo: {
      focusVisible: [
        '#primary',
        '#primary-inverse',
        '#secondary',
        '#secondary-inverse',
        '#tertiary',
        '#success',
        '#critical',
      ],
    },
  },
};

export const LeftAndRightElements: StoryObj<typeof Button> = {
  render: () => {
    const leftElementItems = [
      {
        label: 'Small',
        component: (
          <Button
            size="small"
            label="Small with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        label: 'Medium',
        component: (
          <Button
            size="medium"
            label="Medium with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        label: 'Large',
        component: (
          <Button
            size="large"
            label="Large with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
          />
        ),
      },
    ];
    const rightElementItems = [
      {
        component: (
          <Button
            size="small"
            label="Small with icon"
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        component: (
          <Button
            size="medium"
            label="Medium with icon"
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        component: (
          <Button
            size="large"
            label="Large with icon"
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
    ];
    const leftAndRightElementsItems = [
      {
        component: (
          <Button
            size="small"
            label="Small with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        component: (
          <Button
            size="medium"
            label="Medium with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
      {
        component: (
          <Button
            size="large"
            label="Large with icon"
            leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
            rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
          />
        ),
      },
    ];

    return (
      <Storybook.Container display="flex" flexDirection="column" gap="m">
        <Storybook.Row alignCompLabel="vertical" items={leftElementItems} alignItems="center" />
        <Storybook.Row items={rightElementItems} alignItems="center" />
        <Storybook.Row items={leftAndRightElementsItems} alignItems="center" />
      </Storybook.Container>
    );
  },
};
