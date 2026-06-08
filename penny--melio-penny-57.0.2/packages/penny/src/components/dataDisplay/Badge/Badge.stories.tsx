import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Icon } from '@/components/foundations/Icon';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { BrandSymbol } from '../BrandSymbol';
import { Counter } from '../Counter';
import { StatusIndicator } from '../StatusIndicator';
import { Badge } from './Badge';

const placementOptions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const customPositionsType = `{
  top: CSSProperties['top']},
  right: CSSProperties['right']},
  bottom: CSSProperties['bottom']},
  left: CSSProperties['left']
}`;

/**
 * The `Badge component` allows you to place and position any element on top of another element.<br/>
 *
 * <b>Features:</b><br/>
 * - The `mark` is the element that serves as the badge.<br/>
 * - The `children` are the base element that the mark is positioned on.<br/>
 * - The `placement` prop allows you to easily position the badge relative to the children.<br/>
 * - The `customPositions` prop is an object that provides precise control over the badge's placement along the x and y axes.<br/>
 *
 * <b>Guidelines:</b><br/>
 * - The mark should be placed on one of the corners of the children.
 * - We recommend wrapping the mark with a border to ensure the badge is visible.
 **/

const meta: Meta<typeof Badge> = {
  title: 'Data Display Components/Badge',
  component: Badge,
  argTypes: {
    mark: {
      control: false,
      type: { required: true, name: 'string' },
      description: 'The element that is positioned.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    children: {
      control: false,
      type: { required: true, name: 'string' },
      description: 'The element that the mark is applied to.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    placement: {
      control: 'select',
      options: placementOptions,
      description:
        'The vertical and horizontal offsets of the mark from the edge of the children.<br/>The offset is -2px.',
      table: {
        type: {
          summary: getUnionTypeSummary(placementOptions),
        },
        category: 'props',
      },
    },
    customPositions: {
      control: 'object',
      description:
        'An object of the specific top, bottom, right and left offest of the mark from the edge of the children. This prop should be used to override the default placement.',
      table: {
        defaultValue: { summary: "{ top: '-2px', right: '-2px' }" },
        type: {
          summary: 'customPositionsType',
          detail: customPositionsType,
        },
        category: 'props',
      },
    },
    hasBorder: {
      control: 'boolean',
      description: 'Determines if the mark has a border surrounding it.',
      type: { name: 'boolean' },
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'badge' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    mark: <StatusIndicator status="brand" />,
    children: <Button label="Label" variant="tertiary" />,
    placement: 'bottom-right',
    customPositions: undefined,
    hasBorder: false,
    'data-testid': 'badge',
  },
};
export default meta;
export const Main: StoryObj<typeof Badge> = {};

export const Placement: StoryObj<typeof Badge> = {
  render: () => {
    const mark = <StatusIndicator status="brand" />;
    const children = (
      <Button
        label="Label"
        variant="tertiary"
        leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
      />
    );

    const items = [
      {
        label: 'top-left',
        component: (
          <Badge mark={mark} placement="top-left">
            {children}
          </Badge>
        ),
      },
      {
        label: 'top-right',
        component: (
          <Badge mark={mark} placement="top-right">
            {children}
          </Badge>
        ),
      },
      {
        label: 'bottom-left',
        component: (
          <Badge mark={mark} placement="bottom-left">
            {children}
          </Badge>
        ),
      },
      {
        label: 'bottom-right',
        component: (
          <Badge mark={mark} placement="bottom-right">
            {children}
          </Badge>
        ),
      },
    ];
    return <Storybook.Row alignCompLabel="vertical" items={items} />;
  },
};

export const CustomPosition: StoryObj<typeof Badge> = {
  render: ({ children, ...args }) => (
    <Badge
      {...args}
      placement="top-left"
      customPositions={{ top: '-6px', left: '-6px' }}
      mark={<Counter status="critical" number={99} />}
    >
      {children}
    </Badge>
  ),
};

export const CustomContent: StoryObj<typeof Badge> = {
  render: ({ children, ...args }) => (
    <Badge {...args} mark={<BrandSymbol type="citi-bank" size="small" />}>
      {children}
    </Badge>
  ),
};
