import { range } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import {
  FormLineItems,
  FormLineItemsBody,
  FormLineItemsCell,
  FormLineItemsHeaderCell,
  FormLineItemsHeaderRow,
  FormLineItemsRow,
} from './index';

const meta: Meta<typeof FormLineItems> = {
  title: 'Chromatic/Form Line Items',
  parameters: {
    a11y: {
      // demonstration
      test: 'off',
    },
  },
  args: {},
};
export default meta;

export const StickyNoScroll: StoryObj<typeof FormLineItems> = {
  render: () => (
    <FormLineItems>
      <FormLineItemsHeaderRow>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl" isSticky>
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" backgroundColor="global.brand.700" />
        </FormLineItemsHeaderCell>
      </FormLineItemsHeaderRow>
      <FormLineItemsBody>
        {range(4).map((index) => (
          <FormLineItemsRow key={index}>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl" isSticky>
              <Storybook.ContentPlaceholder
                label=""
                height="100px"
                borderRadius="global.none"
                backgroundColor="global.brand.600"
              />
            </FormLineItemsCell>
          </FormLineItemsRow>
        ))}
      </FormLineItemsBody>
    </FormLineItems>
  ),
};
