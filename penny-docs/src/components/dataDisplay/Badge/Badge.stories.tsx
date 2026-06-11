import type { Meta, StoryObj } from '@storybook/react-vite';

import { Counter } from '@/components/dataDisplay/Counter';
import { StatusIndicator } from '@/components/dataDisplay/StatusIndicator';
import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Badge } from './Badge';
import type { BadgePlacement } from './Badge.types';

const Avatar = ({ bg = '#5C3EC5', label = 'VN' }: { bg?: string; label?: string }) => (
  <div
    style={{
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: bg,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '15px',
    }}
  >
    {label}
  </div>
);

const VerifiedMark = () => (
  <div
    style={{
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: '#7849ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon type="checked" size="extra-small" color="inverse" aria-hidden />
  </div>
);

type PlaygroundArgs = { placement: BadgePlacement; hasBorder: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Data Display/Badge',
  argTypes: {
    placement: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Which corner of the children the mark sits on.',
      table: { defaultValue: { summary: 'bottom-right' }, type: { summary: 'BadgePlacement' }, category: 'props' },
    },
    hasBorder: {
      control: 'boolean',
      description: 'Adds a border around the mark — use when the mark color matches the underlying element.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: { placement: 'bottom-right', hasBorder: true },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['placement', 'hasBorder'] } },
  render: ({ placement, hasBorder }) => (
    <div style={{ padding: '40px' }}>
      <Badge placement={placement} hasBorder={hasBorder} mark={<VerifiedMark />}>
        <Avatar />
      </Badge>
    </div>
  ),
};

export const Placement: Story = {
  render: () => (
    <Group spacing="xl" alignItems="center">
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as BadgePlacement[]).map((placement) => (
        <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Badge placement={placement} hasBorder mark={<StatusIndicator status="success" />}>
            <Avatar />
          </Badge>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{placement}</span>
        </div>
      ))}
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const CustomContent: Story = {
  render: () => (
    <Group spacing="xl" alignItems="center">
      <Badge placement="top-right" mark={<Counter status="critical" number={3} />}>
        <Avatar bg="#0F766E" label="AC" />
      </Badge>
      <Badge placement="bottom-right" hasBorder mark={<StatusIndicator status="warning" />}>
        <Avatar bg="#B45309" label="MB" />
      </Badge>
      <Badge placement="bottom-right" hasBorder mark={<VerifiedMark />}>
        <Avatar />
      </Badge>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Counter"
        url="/?path=/docs/components-data-display-counter--docs"
        preview={
          <Badge placement="top-right" mark={<Counter status="critical" number={2} />}>
            <Avatar />
          </Badge>
        }
      />
      <RelatedComponent
        name="Status Indicator"
        url="/?path=/docs/components-data-display-status-indicator--docs"
        preview={
          <Badge placement="bottom-right" hasBorder mark={<StatusIndicator status="success" />}>
            <Avatar />
          </Badge>
        }
      />
    </RelatedComponents>
  ),
};
