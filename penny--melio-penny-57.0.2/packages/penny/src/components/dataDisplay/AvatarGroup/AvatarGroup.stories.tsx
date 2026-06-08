import { type Meta, type StoryObj } from '@storybook/react-vite';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';

import { AvatarGroup } from './AvatarGroup';
import { type AvatarGroupProps } from './AvatarGroup.types';

const avatarsItems: AvatarGroupProps['items'] = [
  { name: 'Mysie Esmeralda' },
  { name: 'Gianna Jeanette', src: '/assets/Gustav.png' },
  { name: 'Berenice Des', bgColor: 'avatar5' },
  { name: 'Segun Adebayo', src: '/assets/SegunAdebayo.jpg' },
  { name: 'Margie Ericka' },
  { name: 'Deonne Vergil' },
  { name: 'Toria Penny' },
  { name: 'Jocelin Alana' },
  { name: 'Talon Emmanuel' },
  { name: 'Esmaralda Julianne' },
  { name: 'Eddy Kamryn' },
  { name: 'Derryl Messiah' },
  { name: 'Torin Amanda' },
  { name: 'Beau Alease' },
  { name: 'Rupert Charity' },
  { name: 'Archibald Gracelynn' },
  { name: 'Porter Sophy' },
];

const avatarItemsType = `{
  name: string;
  src?: string;
  baColor?:  'default' | 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4' | 'avatar5' | 'avatar6';
  'data-testid'?: string;
}`;

const meta: Meta<typeof AvatarGroup> = {
  title: 'Data Display Components/Avatar Group',
  component: AvatarGroup,
  argTypes: {
    items: {
      control: 'object',
      description: "An array of the avatar-group's list items",
      type: {
        required: true,
        name: 'string',
      },
      table: {
        category: 'props',
        type: { summary: 'Pick<AvatarProps, "name" | "src" | "bgColor">[]', detail: avatarItemsType },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.AVATAR_GROUP },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    items: avatarsItems.slice(0, 3),
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.AVATAR_GROUP,
  },
};
export default meta;

export const Main: StoryObj<typeof AvatarGroup> = {};

export const MoreThanMaxItems: StoryObj<typeof AvatarGroup> = {
  render: (args) => <AvatarGroup {...args} items={avatarsItems} />,
};
