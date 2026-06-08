import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { Text } from '../Text';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Chromatic/Avatar',
  component: Avatar,
};
export default meta;

export const WithBadge: StoryObj<typeof Avatar> = {
  render: () => (
    <Group variant="vertical">
      <SimpleGrid columns={6} justifyItems="center" alignItems="center">
        <Text textStyle="body2Semi">Disabled</Text>
        <Text textStyle="body2Semi">Disabled With Image</Text>
        <Text textStyle="body2Semi">Selected</Text>
        <Text textStyle="body2Semi">With Image</Text>
        {['small', 'medium'].map((size) => (
          <Text key={`title-${size}`} textStyle="body2Semi">
            {size}
          </Text>
        ))}
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" isDisabled />}
          isDisabled
        />
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" isDisabled />}
          src="/assets/Robin.jpeg"
          isDisabled
        />
        <Avatar name="Gustav the Dog" badge={<Icon type="verified" size="small" color="brand" />} isSelected />
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" />}
          src="/assets/Robin.jpeg"
        />
        <Avatar name="Gustav the Dog" size="small" badge={<Icon type="verified" size="extra-small" color="brand" />} />
        <Avatar name="Gustav the Dog" size="medium" badge={<Icon type="verified" size="small" color="brand" />} />
      </SimpleGrid>

      <SimpleGrid columns={6} justifyItems="center" alignItems="center">
        <Text textStyle="body2Semi">Disabled</Text>
        <Text textStyle="body2Semi">Disabled With Image</Text>
        <Text textStyle="body2Semi">Selected</Text>
        <Text textStyle="body2Semi">With Image</Text>
        {['small', 'medium'].map((size) => (
          <Text key={`title-${size}`} textStyle="body2Semi">
            {size}
          </Text>
        ))}
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" isDisabled />}
          variant="square"
          isDisabled
        />
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" isDisabled />}
          variant="square"
          src="/assets/Robin.jpeg"
          isDisabled
        />
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" />}
          variant="square"
          isSelected
        />
        <Avatar
          name="Gustav the Dog"
          badge={<Icon type="verified" size="small" color="brand" />}
          variant="square"
          src="/assets/Robin.jpeg"
        />
        <Avatar
          name="Gustav the Dog"
          size="small"
          badge={<Icon type="verified" size="extra-small" color="brand" />}
          variant="square"
        />
        <Avatar
          name="Gustav the Dog"
          size="medium"
          badge={<Icon type="verified" size="small" color="brand" />}
          variant="square"
        />
      </SimpleGrid>
    </Group>
  ),
};

/* A regression visual test for ME-49426
 */
export const WithTallImage: StoryObj<typeof Avatar> = {
  render: ({ src, ...args }) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <Group>
        <Avatar {...args} src="/assets/invoice.jpeg" name="invoice" />
        <Avatar {...args} src="/assets/invoice.jpeg" isSelected name="invoice" />
      </Group>
      <Text textStyle="body2Semi">square</Text>
      <Group>
        <Avatar {...args} src="/assets/invoice.jpeg" variant="square" name="invoice" />
        <Avatar {...args} src="/assets/invoice.jpeg" isSelected variant="square" name="invoice" />
      </Group>
    </SimpleGrid>
  ),
};
