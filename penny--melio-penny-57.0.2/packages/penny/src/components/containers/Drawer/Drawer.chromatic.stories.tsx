import { useBoolean } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { fullScreenChromaticDecorator, setChromaticViewports } from '@/test-utils/storybook.utils';

import { BaseSheet, BaseSheetHeader } from '../BaseSheet';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Chromatic/Drawer',
  component: Drawer,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories.
    chromatic: { delay: 300 },
  },
};
export default meta;

export const WithBottomSheetTrigger: StoryObj<typeof Drawer> = {
  render: (args) => {
    const [isDrawerOpen, drawerOpen] = useBoolean(false);
    const [isBottomSheetOpen, bottomSheetOpen] = useBoolean(false);

    return (
      <>
        <Button onClick={drawerOpen.on} label="Open Drawer" />

        <Drawer
          {...args}
          aria-label="drawer with bottom sheet"
          isOpen={isDrawerOpen}
          onClose={drawerOpen.off}
          footer={
            <>
              <Button onClick={bottomSheetOpen.on} label="Open Sheet" />
              <BaseSheet
                isOpen={isBottomSheetOpen}
                onClose={bottomSheetOpen.off}
                placement="bottom"
                aria-label="bottom sheet"
              >
                <BaseSheetHeader />
                <Storybook.ContentPlaceholder height="200px" borderRadius="global.200" />
              </BaseSheet>
            </>
          }
        />
      </>
    );
  },
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Open Sheet' }));
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

setChromaticViewports([WithBottomSheetTrigger], ['xs']);
