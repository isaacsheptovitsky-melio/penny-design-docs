import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fireEvent, screen } from '@testing-library/dom';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';

import { DropzoneArea } from '../DropzoneArea';
import { DropzoneContent } from '../DropzoneContent';
import { DropzoneHiddenInput } from '../DropzoneHiddenInput';
import { DropzoneRoot } from '../DropzoneRoot';

const meta: Meta<typeof DropzoneRoot> = {
  title: 'Chromatic/Dropzone',
  component: DropzoneRoot,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj<typeof DropzoneRoot>;

export const Dragging: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <DropzoneRoot data-testid="dropzone">
        <DropzoneHiddenInput />
        <DropzoneArea>
          <DropzoneContent>
            <Group variant="vertical" alignItems="center" spacing="s">
              <Icon type="file-add" size="large" aria-hidden />
              <Group variant="vertical" alignItems="center" spacing="xxs">
                <Text textStyle="body3" color="semantic.text.primary">
                  Select or drop a file
                </Text>
                <Text textStyle="body3" color="semantic.text.secondary">
                  PDF, PNG, JPG up to 10MB
                </Text>
              </Group>
            </Group>
          </DropzoneContent>
        </DropzoneArea>
      </DropzoneRoot>
    </div>
  ),
  play: () => {
    const element = screen.getByTestId('dropzone');
    const area = element.querySelector('[role="button"]') as HTMLElement;
    fireEvent.dragEnter(area);
  },
};
