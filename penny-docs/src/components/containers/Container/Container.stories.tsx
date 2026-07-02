import type { Meta, StoryObj } from '@storybook/react-vite';

import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Container } from './Container';

const themeSpaceKeys = ['none', 'xxs', 'xs', 'xs-s', 's', 'm', 'l', 'xl', 'xxl'];

const Filler = ({ children = 'Container content' }: { children?: React.ReactNode }) => (
  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#475569' }}>{children}</span>
);

const meta: Meta<typeof Container> = {
  title: 'Components/Containers/Container',
  component: Container,
  argTypes: {
    backgroundColor: {
      control: 'inline-radio',
      options: ['default', 'light', 'white'],
      description: 'Background color — default (transparent), light, or white.',
      table: { defaultValue: { summary: 'default' }, type: { summary: "'default' | 'light' | 'white'" }, category: 'props' },
    },
    border: {
      control: 'inline-radio',
      options: ['none', 'regular', 'dashed'],
      description: 'Border style.',
      table: { defaultValue: { summary: 'none' }, type: { summary: "'none' | 'regular' | 'dashed'" }, category: 'props' },
    },
    paddingX: {
      control: 'select',
      options: themeSpaceKeys,
      description: 'Horizontal padding (a spacing token).',
      table: { defaultValue: { summary: 'none' }, type: { summary: 'ThemeSpaceKey' }, category: 'props' },
    },
    paddingY: {
      control: 'select',
      options: themeSpaceKeys,
      description: 'Vertical padding (a spacing token).',
      table: { defaultValue: { summary: 'none' }, type: { summary: 'ThemeSpaceKey' }, category: 'props' },
    },
    width: {
      control: 'inline-radio',
      options: ['full', 'fit-content'],
      description: 'Container width.',
      table: { defaultValue: { summary: 'full' }, type: { summary: "'full' | 'fit-content'" }, category: 'props' },
    },
  },
  args: { backgroundColor: 'white', border: 'regular', paddingX: 'm', paddingY: 'm', width: 'full' },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['backgroundColor', 'border', 'paddingX', 'paddingY', 'width'] } },
  render: (args) => (
    <div style={{ padding: '24px', background: '#F3F5F7' }}>
      <Container {...args}>
        <Filler />
      </Container>
    </div>
  ),
};

export const Backgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', background: '#F3F5F7' }}>
      {(['default', 'light', 'white'] as const).map((bg) => (
        <Container key={bg} backgroundColor={bg} border="regular" paddingX="m" paddingY="m">
          <Filler>{`backgroundColor="${bg}"`}</Filler>
        </Container>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Borders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px' }}>
      {(['none', 'regular', 'dashed'] as const).map((border) => (
        <Container key={border} border={border} backgroundColor="white" paddingX="m" paddingY="m">
          <Filler>{`border="${border}"`}</Filler>
        </Container>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Group"
        url="/?path=/docs/components-containers-group--docs"
        preview={
          <Container border="regular" backgroundColor="white" paddingX="s" paddingY="s">
            <Filler>Box</Filler>
          </Container>
        }
      />
      <RelatedComponent
        name="Layout"
        url="/?path=/docs/components-layouts-layout--docs"
        preview={
          <Container border="dashed" paddingX="s" paddingY="s">
            <Filler>Page</Filler>
          </Container>
        }
      />
    </RelatedComponents>
  ),
};
