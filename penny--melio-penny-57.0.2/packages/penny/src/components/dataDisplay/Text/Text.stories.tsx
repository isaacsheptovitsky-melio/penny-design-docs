import type { Meta, StoryObj } from '@storybook/react-vite';

import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';
import { getTextStyleKeys, getThemeColorKeys } from '@/theme';

import { Text } from './Text';
import { asOptions } from './Text.types';

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const textStyleOptions = [...getTextStyleKeys(), 'inherit'];

const meta: Meta<typeof Text> = {
  title: 'Data Display Components/Typography/Text',
  component: Text,
  argTypes: {
    children: {
      control: false,
      description: 'The text to display.',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    textStyle: {
      control: 'select',
      description: 'Determines the typography of the text.',
      options: textStyleOptions,
      table: {
        defaultValue: { summary: 'body2' },
        type: { summary: textStyleOptions.join(' | ') },
        category: 'props',
      },
    },
    color: {
      control: 'select',
      description: 'Determines the color of the text.',
      options: [...Object.keys(getThemeColorKeys()), 'inherit'],
      table: {
        defaultValue: { summary: 'semantic.text.primary' },
        type: { summary: 'string' },
        category: 'props',
      },
    },
    as: {
      control: 'select',
      options: asOptions,
      description: 'Determines which type of element the component should be rendered as.',
      table: {
        defaultValue: { summary: 'span' },
        type: { summary: asOptions.join(' | ') },
        category: 'props',
      },
    },
    disableResizeListener: {
      control: 'boolean',
      description:
        'Disables the `resize` event listener. Useful if you know your text container has static width and you want to avoid unnecessary renders that might affect performance.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    shouldSupportEllipsis: {
      control: 'boolean',
      description:
        'If true, the text will support ellipsis and a tooltip will be shown when the text is truncated. The tooltip will show the full text. This will only work if the `children` are of type `string`.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    tabIndex: {
      control: 'number',
      description:
        'The tab index of the text element. If `shouldSupportEllipsis` is true, the tab index will be set to 0 no matter the value passed.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    children: text,
    textStyle: undefined,
    color: undefined,
    as: undefined,
    shouldSupportEllipsis: false,
    tabIndex: undefined,
    disableResizeListener: false,
    'data-testid': 'text',
  },
};
export default meta;

export const Main: StoryObj<typeof Text> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
/**
 * Resize viewport to see ellipsis and a tooltip
 */
export const WithEllipsis: StoryObj<typeof Text> = {
  args: {
    ...Main.args,
    shouldSupportEllipsis: true,
  },
  decorators: [fullScreenChromaticDecorator],
  render: (args) => <Text {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
