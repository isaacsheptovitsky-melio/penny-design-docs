import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getFlagsMap } from '../types/flags.generated';
import type { FlagKey } from '../types/flags.generated.types';
import { AssetCard, EmptyState } from './helpers';

const FlagsGallery = () => {
  const flagsMap = getFlagsMap();
  const flagKeys = Object.keys(flagsMap) as FlagKey[];

  if (flagKeys.length === 0) {
    return <EmptyState assetType="Flags" directory="src/assets/flags/" />;
  }

  return (
    <Storybook.Container>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '12px',
        }}
      >
        {flagKeys.sort().map((flagKey) => (
          <AssetCard key={flagKey}>
            <AssetCard.ImageContainer height="40px">
              <AssetCard.Image
                src={flagsMap[flagKey]}
                alt={`${flagKey} flag`}
                style={{ maxWidth: '60px', maxHeight: '40px', borderRadius: '2px' }}
              />
            </AssetCard.ImageContainer>
            <AssetCard.Label>{flagKey.toUpperCase()}</AssetCard.Label>
          </AssetCard>
        ))}
      </div>
    </Storybook.Container>
  );
};

const meta: Meta<typeof FlagsGallery> = {
  title: 'Penny Assets/Flags',
  component: FlagsGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Country flags are used to represent international markets, currency selection, and regional preferences.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev'],
};
