import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { fullScreenChromaticDecorator, setChromaticViewports } from '@/test-utils/storybook.utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BaseModal, BaseModalBody, BaseModalFooter, BaseModalHeader } from '.';

const meta: Meta<typeof BaseModal> = {
  title: 'Chromatic/Base Modal',
  component: BaseModal,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109855 (aria-dialog-name)
      test: 'todo',
    },
  },
};
export default meta;

export const MaxHeight: StoryObj<typeof BaseModal> = {
  render: () => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <BaseModal isOpen onClose={noop}>
        <BaseModalHeader>
          <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
        </BaseModalHeader>
        <BaseModalBody>
          <Storybook.ContentPlaceholder label="Body" height="1000px" />
        </BaseModalBody>
        <BaseModalFooter>
          <Storybook.ContentPlaceholder label="Footer" />
        </BaseModalFooter>
      </BaseModal>
    );
  },
};

setChromaticViewports([MaxHeight], ['xs', 'xl']);
