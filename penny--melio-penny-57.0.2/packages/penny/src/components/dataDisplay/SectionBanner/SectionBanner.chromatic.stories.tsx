import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Link } from '@/components/navigation/Link';

import { Typography } from '../typography';
import {
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
  SectionBannerTitle,
} from './index';

const meta: Meta<typeof SectionBannerRoot> = {
  title: 'Chromatic/Section Banner',
  component: SectionBannerRoot,
  args: {
    variant: 'informative',
  },
};
export default meta;

export const InsideFlexContainer: StoryObj<typeof SectionBannerRoot> = {
  render: (args) => (
    <Storybook.Container display="flex" height="200px">
      <SectionBannerRoot {...args}>
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim vene
          </SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>
    </Storybook.Container>
  ),
};

export const BreakLongWords: StoryObj<typeof SectionBannerRoot> = {
  render: (args) => {
    const content = (
      <>
        Contact{' '}
        <Link
          href="mailto:support@CapitalOneVendorPayments.melio.com"
          label="support@CapitalOneVendorPayments.melio.com"
        />{' '}
        for assistance
      </>
    ) as never;

    const paragraph = {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    };
    const orderedList = [paragraph, paragraph, paragraph, paragraph];

    return (
      <Group variant="horizontal">
        <Storybook.Container display="flex" width="300px">
          <SectionBannerRoot {...args} variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerDescription>{content}</SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>
        </Storybook.Container>

        <Storybook.Container display="flex" width="300px">
          <SectionBannerRoot {...args} variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>{content}</SectionBannerTitle>
            </SectionBannerContent>
          </SectionBannerRoot>
        </Storybook.Container>

        <Storybook.Container display="flex" width="300px">
          <SectionBannerRoot {...args} variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>{content}</SectionBannerTitle>
              <SectionBannerDescription>{content}</SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>
        </Storybook.Container>

        <Storybook.Container display="flex" width="300px">
          <SectionBannerRoot {...args} variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>{content}</SectionBannerTitle>
              <SectionBannerDescription>
                <Typography.ParagraphList type="ordered" list={orderedList} />
              </SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>
        </Storybook.Container>
      </Group>
    );
  },
};
