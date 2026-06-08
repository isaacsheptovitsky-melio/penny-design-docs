import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import { Storybook } from 'storybook-utils';

import { getBrandsMap } from '../types/brands.generated';
import type { BrandKey } from '../types/brands.generated.types';
import { AssetCard, EmptyState } from './helpers';

const BrandsGallery = () => {
  const brandsMap = getBrandsMap();
  const brandKeys = Object.keys(brandsMap) as BrandKey[];

  if (brandKeys.length === 0) {
    return <EmptyState assetType="Brands" directory="src/assets/brands/" />;
  }

  return (
    <Storybook.Container>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {brandKeys.sort().map((brandKey) => {
          const brand = brandsMap[brandKey];
          return (
            <Fragment key={brandKey}>
              {brand.default && (
                <AssetCard>
                  <AssetCard.ImageContainer height="60px">
                    <AssetCard.Image src={brand.default} alt={`${brandKey} default`} />
                  </AssetCard.ImageContainer>
                  <AssetCard.Label>{`${brandKey} (default)`}</AssetCard.Label>
                </AssetCard>
              )}
              {brand.neutral && (
                <AssetCard>
                  <AssetCard.ImageContainer height="60px">
                    <AssetCard.Image src={brand.neutral} alt={`${brandKey} neutral`} />
                  </AssetCard.ImageContainer>
                  <AssetCard.Label>{`${brandKey} (neutral)`}</AssetCard.Label>
                </AssetCard>
              )}
              {brand.inverse && (
                <AssetCard>
                  <AssetCard.ImageContainer height="60px" backgroundColor="dark">
                    <AssetCard.Image src={brand.inverse} alt={`${brandKey} inverse`} />
                  </AssetCard.ImageContainer>
                  <AssetCard.Label>{`${brandKey} (inverse)`}</AssetCard.Label>
                </AssetCard>
              )}
            </Fragment>
          );
        })}
      </div>
    </Storybook.Container>
  );
};

const meta: Meta<typeof BrandsGallery> = {
  title: 'Penny Assets/Brands',
  component: BrandsGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Brand logos are used to represent partner companies, payment methods, and third-party integrations.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev'],
};
