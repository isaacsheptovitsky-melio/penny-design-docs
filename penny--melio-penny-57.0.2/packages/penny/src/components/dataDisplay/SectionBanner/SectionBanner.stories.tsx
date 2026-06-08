import { capitalize } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import {
  SectionBannerCloseButton,
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
  SectionBannerTitle,
} from '@/components/dataDisplay/SectionBanner';
import type { SectionBannerVariant } from '@/components/dataDisplay/SectionBanner/SectionBanner.types';
import { Icon } from '@/components/foundations/Icon';
import { Illustration } from '@/components/foundations/Illustration';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { BrandSymbol } from '../BrandSymbol';
import { FlagIcon } from '../FlagIcon';
import { Typography } from '../typography';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene';

const variants: SectionBannerVariant[] = [
  'neutral',
  'informative',
  'success',
  'warning',
  'critical',
  'brand',
  'secondary',
];

const childrenPropType = `
type SectionBannerContextValue = {
  variant: ${getUnionTypeSummary(variants)};
  isCompact: boolean;
};`;

const meta: Meta<typeof SectionBannerRoot> = {
  title: 'Data Display Components/Section Banner [composable]',
  component: SectionBannerRoot,
  subcomponents: {
    SectionBannerIcon,
    SectionBannerContent,
    SectionBannerTitle,
    SectionBannerDescription,
    SectionBannerCloseButton,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      table: {
        type: {
          summary: getUnionTypeSummary(variants),
        },
        defaultValue: { summary: 'informative' },
      },
    },
    children: {
      table: {
        type: {
          summary: `ReactNode | ((props: SectionBannerContextValue) => ReactNode)`,
          detail: childrenPropType,
        },
      },
    },
  },
  args: {
    isCompact: false,
    variant: 'informative',
    'data-testid': 'section-banner',
  },
};
export default meta;

export const Main: StoryObj<typeof SectionBannerRoot> = {
  render: (args) => (
    <SectionBannerRoot {...args}>
      <SectionBannerIcon />

      <SectionBannerContent>
        <SectionBannerTitle>Title</SectionBannerTitle>

        <SectionBannerDescription>{content}</SectionBannerDescription>
      </SectionBannerContent>
    </SectionBannerRoot>
  ),
};

export const Types: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <Group variant="vertical">
      {variants.map((variant) => (
        <SectionBannerRoot key={variant} variant={variant}>
          <SectionBannerIcon />

          <SectionBannerContent>
            <SectionBannerTitle>{capitalize(variant)}</SectionBannerTitle>

            <SectionBannerDescription>{content}</SectionBannerDescription>
          </SectionBannerContent>
        </SectionBannerRoot>
      ))}
    </Group>
  ),
};

export const WithCloseButton: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <SectionBannerRoot>
      <SectionBannerIcon />

      <SectionBannerContent>
        <SectionBannerTitle>Title</SectionBannerTitle>

        <SectionBannerDescription>{content}</SectionBannerDescription>
      </SectionBannerContent>

      <SectionBannerCloseButton />
    </SectionBannerRoot>
  ),
};

export const WithoutIcon: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <SectionBannerRoot>
      <SectionBannerContent>
        <SectionBannerTitle>Title</SectionBannerTitle>

        <SectionBannerDescription>{content}</SectionBannerDescription>
      </SectionBannerContent>
    </SectionBannerRoot>
  ),
};

export const WithoutTitle: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <SectionBannerRoot>
      <SectionBannerIcon />
      <SectionBannerContent>
        <SectionBannerDescription>{content}</SectionBannerDescription>
      </SectionBannerContent>
    </SectionBannerRoot>
  ),
};

export const LeftElement: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <Group variant="vertical">
      <SectionBannerRoot variant="secondary">
        <Icon type="customer" aria-hidden />
        <SectionBannerContent>
          <SectionBannerTitle>Title</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>

      <SectionBannerRoot variant="secondary">
        <BrandSymbol type="google" size="medium" aria-hidden />
        <SectionBannerContent>
          <SectionBannerTitle>Title</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>

      <SectionBannerRoot variant="secondary">
        <StatusIconSolid variant="scheduled" size="medium" aria-hidden />
        <SectionBannerContent>
          <SectionBannerTitle>Title</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>

      <SectionBannerRoot variant="secondary">
        <FlagIcon countryCode="CA" size="medium" aria-hidden />
        <SectionBannerContent>
          <SectionBannerTitle>Title</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>

      <SectionBannerRoot variant="brand">
        <Illustration type="no-items" size="small" />
        <SectionBannerContent>
          <SectionBannerTitle>Title</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>
    </Group>
  ),
};

export const WithCustomDescription: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <SectionBannerRoot>
      <SectionBannerIcon />
      <SectionBannerContent>
        <SectionBannerTitle>Title</SectionBannerTitle>
        <SectionBannerDescription>
          <Typography.ParagraphList
            type="unordered"
            list={[
              {
                title: 'Item #1',
                content: 'Long long long long long description of item number one.',
              },
              {
                title: 'Item #2',
                content: 'Long long long long long description of item number two.',
              },
              {
                title: 'Item #3',
                content: 'Long long long long long description of item number three.',
              },
            ]}
          />
        </SectionBannerDescription>
      </SectionBannerContent>
    </SectionBannerRoot>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Compact: StoryObj<typeof SectionBannerRoot> = {
  render: () => {
    const shortContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    return (
      <Storybook.Container display="flex" flexDirection="column" gap="s">
        <SectionBannerRoot variant="warning" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerDescription>{shortContent}</SectionBannerDescription>
          </SectionBannerContent>
          <SectionBannerCloseButton />
        </SectionBannerRoot>

        <SectionBannerRoot variant="critical" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerDescription>{content}</SectionBannerDescription>
          </SectionBannerContent>
        </SectionBannerRoot>
      </Storybook.Container>
    );
  },
};

export const WithAction: StoryObj<typeof SectionBannerRoot> = {
  render: () => (
    <Storybook.Container display="flex" flexDirection="column" gap="s">
      <SectionBannerRoot>
        <SectionBannerIcon />

        <SectionBannerContent>
          <SectionBannerTitle>Section Banner</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
          <Storybook.ContentPlaceholder width="fit-content" />
        </SectionBannerContent>
      </SectionBannerRoot>

      <SectionBannerRoot isCompact>
        <SectionBannerIcon />

        <SectionBannerContent>
          <SectionBannerTitle>Compact Section Banner</SectionBannerTitle>
          <SectionBannerDescription>{content}</SectionBannerDescription>
        </SectionBannerContent>

        <Storybook.ContentPlaceholder width="fit-content" />
      </SectionBannerRoot>
    </Storybook.Container>
  ),
};
