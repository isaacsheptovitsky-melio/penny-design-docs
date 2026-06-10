import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Panel } from './Panel';

const Stage = ({ children, height = 150 }: { children: React.ReactNode; height?: number }) => (
  <div
    style={{
      position: 'relative',
      height: `${height}px`,
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#F3F5F7',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    {children}
  </div>
);

const BatchActions = () => (
  <Group justifyContent="space-between" alignItems="center" width="full">
    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>3 vendors selected</span>
    <Group spacing="s" alignItems="center">
      <Button label="Archive" variant="secondary-inverse" size="small" />
      <Button label="Pay" variant="primary-inverse" size="small" />
    </Group>
  </Group>
);

const meta: Meta<typeof Panel> = {
  title: 'Components/Containers/Panel',
  component: Panel,
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['bottom', 'top', 'left', 'right'],
      description: 'Which side of the container the panel sticks to.',
      table: { defaultValue: { summary: 'bottom' }, type: { summary: "'bottom' | 'top' | 'left' | 'right'" }, category: 'props' },
    },
    position: {
      control: 'inline-radio',
      options: ['sticky', 'fixed', 'absolute'],
      description: 'CSS positioning strategy.',
      table: { defaultValue: { summary: 'sticky' }, type: { summary: "'sticky' | 'fixed' | 'absolute'" }, category: 'props' },
    },
  },
  args: { placement: 'bottom', position: 'absolute' },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['placement', 'position'] } },
  render: (args) => (
    <div style={{ padding: '24px' }}>
      <Stage height={170}>
        <Panel {...args} position="absolute">
          <BatchActions />
        </Panel>
      </Stage>
    </div>
  ),
};

export const Placement: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '8px', fontFamily: 'Poppins, sans-serif' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <div key={placement}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B95A9', textTransform: 'uppercase', marginBottom: '8px' }}>
            {placement}
          </div>
          <Stage height={160}>
            <Panel placement={placement} position="absolute">
              {placement === 'left' || placement === 'right' ? (
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>Panel</span>
              ) : (
                <BatchActions />
              )}
            </Panel>
          </Stage>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Action Bar"
        url="/?path=/docs/components-action-action-bar--docs"
        preview={
          <div style={{ width: '160px' }}>
            <Stage height={60}>
              <Panel placement="bottom" position="absolute" paddingX="s" paddingY="xs">
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>Bar</span>
              </Panel>
            </Stage>
          </div>
        }
      />
    </RelatedComponents>
  ),
};
