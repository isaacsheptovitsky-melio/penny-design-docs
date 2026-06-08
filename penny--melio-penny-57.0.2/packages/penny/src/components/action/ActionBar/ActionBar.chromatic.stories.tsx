import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Layout } from '@/components/layouts/Layout';
import { setChromaticViewports } from '@/test-utils/storybook.utils';

import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'Chromatic/Action Bar [pattern]',
  component: ActionBar,
  argTypes: {},
};
export default meta;

export const MaxWidthDefault: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout>
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar isOpen />
    </Layout>
  ),
};

export const MaxWidthFull: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="full">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="full" isOpen />
    </Layout>
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const MaxWidth1600: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="1600px">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="1600px" isOpen />
    </Layout>
  ),
};

export const MaxWidth1200: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="1200px">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="1200px" isOpen />
    </Layout>
  ),
};

export const MaxWidth800: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="800px">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="800px" isOpen />
    </Layout>
  ),
};

export const MaxWidth600: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="600px">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="600px" isOpen />
    </Layout>
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const MaxWidth480: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth="480px">
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth="480px" isOpen />
    </Layout>
  ),
};

export const MaxWidthCustom: StoryObj<typeof ActionBar> = {
  render: (_) => (
    <Layout maxWidth={200}>
      <Storybook.ContentPlaceholder label="Screen content" height="700px" />
      <ActionBar maxWidth={200} isOpen />
    </Layout>
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

// We want to check all maxWidth options in all viewports
setChromaticViewports([
  MaxWidthDefault,
  MaxWidthFull,
  MaxWidth1600,
  MaxWidth1200,
  MaxWidth800,
  MaxWidth600,
  MaxWidth480,
  MaxWidthCustom,
]);
