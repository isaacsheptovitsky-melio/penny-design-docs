import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getIconsMap } from '../types/icons.generated';
import type { IconKey } from '../types/icons.generated.types';
import { AssetCard, EmptyState } from './helpers';

const IconsGallery = () => {
  const iconsMap = getIconsMap();
  const iconKeys = Object.keys(iconsMap) as IconKey[];

  if (iconKeys.length === 0) {
    return <EmptyState assetType="Icons" directory="src/assets/icons/" />;
  }

  return (
    <Storybook.Container>
      <div style={{ marginBottom: '32px' }}>
        <h3>Small Icons (16px)</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {iconKeys.sort().map((iconKey) => (
            <AssetCard key={`small-${iconKey}`}>
              <AssetCard.ImageContainer height="32px">
                <AssetCard.Image src={iconsMap[iconKey].small} alt={iconKey} />
              </AssetCard.ImageContainer>
              <AssetCard.Label>{iconKey}</AssetCard.Label>
            </AssetCard>
          ))}
        </div>
      </div>
      <div>
        <h3>Medium Icons (24px)</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {iconKeys.sort().map((iconKey) => (
            <AssetCard key={`medium-${iconKey}`}>
              <AssetCard.ImageContainer height="40px">
                <AssetCard.Image src={iconsMap[iconKey].medium} alt={iconKey} />
              </AssetCard.ImageContainer>
              <AssetCard.Label>{iconKey}</AssetCard.Label>
            </AssetCard>
          ))}
        </div>
      </div>
    </Storybook.Container>
  );
};

const meta: Meta<typeof IconsGallery> = {
  title: 'Penny Assets/Icons',
  component: IconsGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Icons are the most commonly used assets in the design system, used for buttons, navigation, and visual communication.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev'],
};
