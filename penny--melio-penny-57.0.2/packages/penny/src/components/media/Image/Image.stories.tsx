import { SimpleGrid } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { defaultDesignTokens } from '@/theme/foundations/tokens/defaultDesignTokens';

import { Image } from './Image';

const aspectRatios = ['1 / 1', '16 / 9', '4 / 3', '7 / 3'];
const borderRadiusTokensKeys = Object.keys(defaultDesignTokens.borderRadii.global).map((token) => `global.${token}`);
const meta: Meta<typeof Image> = {
  title: 'Media Components/Image',
  component: Image,
  argTypes: {
    src: {
      control: 'text',
      description: 'The path to the image.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: 'HTMLImageElement["src"]',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'An alternate text for the image, if the image cannot be displayed. Necessary for a11y.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: 'HTMLImageElement["alt"]',
        },
      },
    },
    title: {
      control: 'text',
      description: 'Title to provide further supporting information if needed, This gives us a tooltip on mouse hover',
      table: { category: 'props' },
    },
    height: {
      control: 'text',
      description: 'The height of the Image, if not provided it will take the height of the container.',
      table: {
        category: 'props',
        type: { summary: "CSSObject['height']" },
      },
    },
    width: {
      control: 'text',
      description: 'The width of the Image, if not provided it will take the width of the container.',
      table: {
        category: 'props',
        type: { summary: "CSSObject['width']" },
      },
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description:
        "How the image to fit within its bounds. It maps to css ['object-fit'](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property.",
      table: {
        category: 'props',
        type: { summary: "CSSObject['objectFit']" },
        defaultValue: { summary: 'cover' },
      },
    },
    objectPosition: {
      control: 'select',
      options: ['top', 'center', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
      description:
        "used to align the image within the box that contains it ['object-position'](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property.",
      table: {
        category: 'props',
        type: { summary: "CSSObject['objectPosition']" },
        defaultValue: { summary: 'center' },
      },
    },
    aspectRatio: {
      control: 'select',
      description: "Property allows you to define the desired width-to-height ratio of an element's box.",
      options: [undefined, ...aspectRatios],
      table: {
        type: {
          summary: getUnionTypeSummary(aspectRatios),
        },
        category: 'props',
      },
    },
    borderRadius: {
      control: 'select',
      description: 'The border radius of the image.',
      options: [undefined, ...borderRadiusTokensKeys],
      table: {
        type: {
          summary: getUnionTypeSummary(borderRadiusTokensKeys),
        },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the image is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Determines if the image is read-only.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onClick: {
      control: false,
      action: 'click',
      description: 'A callback for when clicking the image.',
      table: {
        type: { summary: 'ReactEventHandler<HTMLImageElement>' },
        category: 'events',
      },
    },
    onError: {
      control: false,
      action: 'error',
      description: 'A callback for when there was an error loading the image.',
      table: {
        type: { summary: 'ReactEventHandler<HTMLImageElement>' },
        category: 'events',
      },
    },
    onLoad: {
      control: false,
      action: 'load',
      description: 'A callback for when the image has been loaded.',
      table: {
        type: { summary: 'ReactEventHandler<HTMLImageElement>' },
        category: 'events',
      },
    },
    fallbackIcon: {
      control: false,
      description:
        'The fallback icon to display when an error occurred while loading the image / the provided image `src` is wrong',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'image' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    src: '/assets/Robin.jpeg',
    alt: 'Robin the Magician',
    title: 'Robin the Magician',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '200px',
    height: '200px',
    borderRadius: undefined,
    onClick: undefined,
    isDisabled: false,
    isReadOnly: false,
    'data-testid': 'image',
  },
};
export default meta;

export const Main: StoryObj<typeof Image> = {
  render: (args) => <Image {...args} />,
};

export const AspectRatios: StoryObj<typeof Image> = {
  render: ({ aspectRatio, borderRadius, width, height, ...args }) => (
    <SimpleGrid spacing="s" columns={5}>
      <Text as="h2" textStyle="body2Semi">
        No Ratio
      </Text>
      <Text as="h2" textStyle="body2Semi">
        1:1
      </Text>
      <Text as="h2" textStyle="body2Semi">
        4:3
      </Text>
      <Text as="h2" textStyle="body2Semi">
        16:9
      </Text>
      <Text as="h2" textStyle="body2Semi">
        7:3
      </Text>
      <Image {...args} width="100px" height="80px" />
      <Image {...args} width="100px" aspectRatio="1 / 1" />
      <Image {...args} width="100px" aspectRatio="4 / 3" />
      <Image {...args} width="100px" aspectRatio="16 / 9" />
      <Image {...args} width="100px" aspectRatio="7 / 3" />
    </SimpleGrid>
  ),
};

export const borderRadius: StoryObj<typeof Image> = {
  render: ({ aspectRatio, borderRadius, width, height, ...args }) => (
    <SimpleGrid spacing="s" columns={8}>
      <Text as="h2" textStyle="body2Semi">
        none
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.50
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.100
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.200
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.300
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.400
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.600
      </Text>
      <Text as="h2" textStyle="body2Semi">
        global.full
      </Text>
      <Image {...args} width="120px" height="80px" />
      <Image {...args} width="120px" height="80px" borderRadius="global.50" />
      <Image {...args} width="120px" height="80px" borderRadius="global.100" />
      <Image {...args} width="120px" height="80px" borderRadius="global.200" />
      <Image {...args} width="120px" height="80px" borderRadius="global.300" />
      <Image {...args} width="120px" height="80px" borderRadius="global.400" />
      <Image {...args} width="120px" height="80px" borderRadius="global.600" />
      <Image {...args} width="120px" height="80px" borderRadius="global.full" />
    </SimpleGrid>
  ),
};

export const Disabled: StoryObj<typeof Image> = {
  render: ({ aspectRatio, borderRadius, ...args }) => <Image {...args} isDisabled />,
};

/**
 * The fallback placeholder is displayed when:
 *
 * - An error occurred while loading the image / the provided image `src` is wrong.<br/>
 *
 * If the sizes are not set, the fallback image sizes are set according to the container's size.<br/>
 */
export const Fallback: StoryObj<typeof Image> = {
  render: (args) => (
    <Storybook.Container height="300px" width="300px">
      <Image src="." alt={args.alt} />
    </Storybook.Container>
  ),
};

/**
 * The fallback icon to display when:
 *
 * - An error occurred while loading the image / the provided image `src` is wrong.<br/>
 * - `fallbackIcon` prop is provided.
 */
export const FallbackIcon: StoryObj<typeof Image> = {
  render: (args) => (
    <Storybook.Container height="300px" width="300px">
      <Image src="." alt={args.alt} fallbackIcon={<Icon type="bank" />} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
