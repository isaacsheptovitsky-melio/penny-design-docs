import { SimpleGrid } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '@/components/dataDisplay';
import { COMPONENTS_DEFAULT_TEST_IDS, getUnionTypeSummary } from '@/test-utils';

import { AvatarImageControl } from './AvatarImageControl';

const variantOptions = ['square', 'circle'];
const meta: Meta<typeof AvatarImageControl> = {
  title: 'Selection & Inputs Components/Avatar Image Control',
  component: AvatarImageControl,
  argTypes: {
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field in view mode.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    deleteButtonText: {
      control: 'text',
      description: 'The text for the button to delete the image',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description:
        'The placeholder text for when there is no value and the field is in read-only mode. Used for initials.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Is the component in loading mode',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    value: {
      control: 'text',
      description: 'The src of the image file. To reset the image, set the value to `undefined`.',
      table: { type: { summary: 'string | undefined' }, category: 'props' },
    },
    acceptTypes: {
      control: 'object',
      description: 'File types to accept',
      table: {
        type: { summary: 'Extract<FileType, `jpg` | `png` | `pdf`>[]' },
        category: 'props',
      },
    },
    onChange: {
      action: 'changed',
      description: 'The callback invoked when the file is changed',
      table: {
        category: 'Events',
        type: {
          summary: '(file: File | null) => void',
        },
      },
    },
    variant: {
      control: 'select',
      description: 'Determines the shape of the avatar image control.',
      options: variantOptions,
      table: {
        defaultValue: { summary: 'circle' },
        type: { summary: getUnionTypeSummary(variantOptions) },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.AVATAR_IMAGE_CONTROL },
        category: 'tests',
      },
    },
  },
  args: {
    deleteButtonText: 'Delete photo',
    viewModePlaceholder: 'John Lennon',
    isViewMode: false,
    isLoading: false,
    variant: 'circle',
    value: undefined,
    acceptTypes: ['jpg', 'pdf', 'png'],
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.AVATAR_IMAGE_CONTROL,
  },
};
export default meta;

export const Main: StoryObj<typeof AvatarImageControl> = {
  render: ({ value, ...args }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined>(value ?? '');

    return (
      <AvatarImageControl
        {...args}
        value={selectedFileUrl}
        onChange={(file) => (file ? setSelectedFileUrl(URL.createObjectURL(file)) : setSelectedFileUrl(undefined))}
      />
    );
  },
};

export const ViewMode: StoryObj<typeof AvatarImageControl> = {
  render: (args) => (
    <SimpleGrid spacing="m" columns={2} justifyItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>
      <AvatarImageControl {...args} isViewMode />
      <AvatarImageControl {...args} isViewMode variant="square" />
    </SimpleGrid>
  ),
};

export const Loading: StoryObj<typeof AvatarImageControl> = {
  render: (args) => (
    <SimpleGrid spacing="m" columns={2} justifyItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>
      <AvatarImageControl {...args} isLoading />
      <AvatarImageControl {...args} isLoading variant="square" />
    </SimpleGrid>
  ),
};

export const WithImage: StoryObj<typeof AvatarImageControl> = {
  render: (args) => (
    <SimpleGrid spacing="m" columns={2} justifyItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" />
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" variant="square" />
    </SimpleGrid>
  ),
};

export const WithImageReadOnly: StoryObj<typeof AvatarImageControl> = {
  render: (args) => (
    <SimpleGrid spacing="m" columns={2} justifyItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" isViewMode />
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" isViewMode variant="square" />
    </SimpleGrid>
  ),
};

export const WithImageLoading: StoryObj<typeof AvatarImageControl> = {
  render: (args) => (
    <SimpleGrid spacing="m" columns={2} justifyItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" isLoading />
      <AvatarImageControl {...args} value="/assets/Robin.jpeg" isLoading variant="square" />
    </SimpleGrid>
  ),
};
