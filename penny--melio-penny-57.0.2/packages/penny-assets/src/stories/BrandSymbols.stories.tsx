import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import { Storybook } from 'storybook-utils';

import { getBrandSymbolsMap } from '../types/brand-symbols.generated';
import type { BrandSymbolKey, BrandSymbolsMap } from '../types/brand-symbols.generated.types';
import { AssetCard, EmptyState } from './helpers';

const BrandSymbolsGallery = () => {
  const brandSymbolsMap: BrandSymbolsMap = getBrandSymbolsMap();
  const brandSymbolKeys = Object.keys(brandSymbolsMap) as BrandSymbolKey[];

  if (brandSymbolKeys.length === 0) {
    return <EmptyState assetType="Brand Symbols" directory="src/assets/brand-symbols/" />;
  }

  return (
    <Storybook.Container>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {brandSymbolKeys.sort().map((brandSymbolKey) => {
          const brandSymbol = brandSymbolsMap[brandSymbolKey];
          return (
            <Fragment key={brandSymbolKey}>
              {brandSymbol.default && (
                <AssetCard>
                  <AssetCard.ImageContainer height="60px">
                    <AssetCard.Image src={brandSymbol.default} alt={`${brandSymbolKey} default`} />
                  </AssetCard.ImageContainer>
                  <AssetCard.Label>{`${brandSymbolKey} (default)`}</AssetCard.Label>
                </AssetCard>
              )}
              {brandSymbol.inverse && (
                <AssetCard>
                  <AssetCard.ImageContainer height="60px" backgroundColor="dark">
                    <AssetCard.Image src={brandSymbol.inverse} alt={`${brandSymbolKey} inverse`} />
                  </AssetCard.ImageContainer>
                  <AssetCard.Label>{`${brandSymbolKey} (inverse)`}</AssetCard.Label>
                </AssetCard>
              )}
            </Fragment>
          );
        })}
      </div>
    </Storybook.Container>
  );
};

const meta: Meta<typeof BrandSymbolsGallery> = {
  title: 'Penny Assets/Brand Symbols',
  component: BrandSymbolsGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Brand symbols are simplified, iconic representations of brands used in constrained spaces or as decorative elements.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev'],
};
