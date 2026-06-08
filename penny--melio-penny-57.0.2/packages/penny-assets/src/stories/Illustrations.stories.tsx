import '../styles/illustrations.css';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getIllustrationsMap } from '../types/illustrations.generated';
import type { IllustrationKey } from '../types/illustrations.generated.types';
import { AssetCard, EmptyState } from './helpers';

const IllustrationsGallery = () => {
  const illustrationsMap = getIllustrationsMap();
  const illustrationKeys = Object.keys(illustrationsMap) as IllustrationKey[];

  if (illustrationKeys.length === 0) {
    return <EmptyState assetType="Illustrations" directory="src/assets/illustrations/" />;
  }

  return (
    <Storybook.Container>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {illustrationKeys.sort().map((illustrationKey) => (
          <AssetCard key={illustrationKey}>
            <AssetCard.ImageContainer height="120px">
              <AssetCard.IllustrationImage src={illustrationsMap[illustrationKey]} alt={illustrationKey} />
            </AssetCard.ImageContainer>
            <AssetCard.Label>{illustrationKey}</AssetCard.Label>
          </AssetCard>
        ))}
      </div>
    </Storybook.Container>
  );
};

const meta: Meta<typeof IllustrationsGallery> = {
  title: 'Penny Assets/Illustrations',
  component: IllustrationsGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Illustrations are used to enhance user experience through visual storytelling, empty states, and onboarding flows.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev'],
};
