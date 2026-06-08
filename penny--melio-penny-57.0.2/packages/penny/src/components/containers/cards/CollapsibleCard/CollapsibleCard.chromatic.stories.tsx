import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { CollapsibleCard } from './CollapsibleCard';

const meta: Meta<typeof CollapsibleCard> = {
  title: 'Chromatic/Collapsible Card',
  component: CollapsibleCard,
};
export default meta;

export const ClosedWithDescription: StoryObj<typeof CollapsibleCard> = {
  render: () => (
    <CollapsibleCard title="Heading text" description="Description">
      <Storybook.ContentPlaceholder height="200px" />
    </CollapsibleCard>
  ),
  parameters: {
    pseudo: { hover: true },
  },
};

export const OpenWithDescriptionWithHover: StoryObj<typeof CollapsibleCard> = {
  render: () => (
    <CollapsibleCard title="Heading text" description="Description" defaultIsExpanded>
      <Storybook.ContentPlaceholder height="200px" />
    </CollapsibleCard>
  ),
  parameters: {
    pseudo: { hover: true },
  },
};
