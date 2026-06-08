import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Container } from '@/components/containers/Container';
import { setChromaticViewports } from '@/test-utils';

import { AvatarWithDetails } from './AvatarWithDetails';

const longMainLabel = 'A Long Label To Test Ellipsis';

const meta: Meta<typeof AvatarWithDetails> = {
  title: 'Chromatic/Avatar With Details',
  component: AvatarWithDetails,
};
export default meta;

export const DescriptionBadgeAndAction: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => (
    <AvatarWithDetails
      {...args}
      mainLabelProps={{ label: 'Chief Dog at Melio', pillProps: { label: 'Admin', status: 'neutral' } }}
      avatarProps={{ name: 'Gustav the Dog' }}
      descriptionProps={{ label: 'gustav@email.com', action: { label: 'See my profile', onClick: () => null } }}
    />
  ),
};

// A regression visual test for ME-52164
export const LongMainLabel: StoryObj<typeof AvatarWithDetails> = {
  args: {
    mainLabelProps: { label: longMainLabel, pillProps: { label: 'Admin', status: 'neutral' } },
    avatarProps: { name: 'Gustav the Dog' },
    descriptionProps: { label: 'gustav@email.com', action: { label: 'See my profile', onClick: () => null } },
  },
  render: (args) => (
    <Container paddingY="l">
      <AvatarWithDetails {...args} />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByText(longMainLabel)),
};

setChromaticViewports([LongMainLabel], ['xs']);
