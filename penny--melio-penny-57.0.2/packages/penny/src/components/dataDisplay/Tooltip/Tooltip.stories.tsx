import { Box } from '@chakra-ui/react';
import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';

import { IconButton } from '../../action/IconButton';
import { Text } from '..';
import { Tooltip } from './Tooltip';

const onOpenChangeType = `(open: boolean, event: Event, reason: "outside-press" | "escape-key" | "ancestor-scroll" | "reference-press" | "click" | "hover" | "focus" | "focus-out" | "list-navigation" | "safe-polygon") => void`;
/**
 * A tooltip is a brief, informative message that appears when a user interacts with an element.<br/>
 * Tooltips are usually initiated through a mouse-hover gesture.<br /><br />
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Data Display Components/Tooltip',
  component: Tooltip,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    children: {
      control: false,
      description: 'The DOM node that will trigger the tooltip on hover.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    content: {
      control: false,
      description: 'The tooltip content.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isEnabled: {
      control: 'boolean',
      description: 'Determine the tooltip is enabled or not on hover / focus.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    shouldAddTriggerFocus: {
      control: 'boolean',
      description:
        'Use this wrapper to add a focusable container to the trigger of the tooltip.<br /><br />' +
        "Use this for disabled components, such as a disabled button (which doesn't trigger hover events when disabled).",
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    triggerAriaLabel: {
      control: 'text',
      description: 'Add aria-label to the trigger of the tooltip.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    dontDescribeChild: {
      control: 'boolean',
      description:
        'Determine if the tooltip stops the act of an accessible description.<br /> It wont pass an aria-describedby attribute to the trigger. <br /> In cases like the Pagination component, where we dont want the tooltip to be announced with the icon button, we should avoid using aria-describedby',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'accessibility' },
    },
    isOpen: {
      control: 'boolean',
      description: 'Determines if the tooltip is open (controlled mode only).',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onOpenChange: {
      control: false,
      description: 'The callback event is invoked when the tooltip is opened or closed (controlled mode only)',
      table: {
        type: {
          summary: "UseFloatingOptions['onOpenChange']",
          detail: onOpenChangeType,
        },
        category: 'events',
      },
    },
  },
  args: {
    children: <IconButton data-testid="trigger" variant="naked" icon="help-circle" aria-label="Info" size="small" />,
    content: 'Did you know? A group of ferrets is called a "business".',
    isEnabled: true,
    shouldAddTriggerFocus: false,
    isOpen: undefined,
    onOpenChange: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Tooltip> = {
  play: async () => userEvent.hover(screen.getByTestId('trigger')),
};

export const WithTitle: StoryObj<typeof Tooltip> = {
  args: {
    ...Main.args,
    content: (
      <>
        <Box as="span" textStyle="body4Semi" display="inline-flex">
          Title
        </Box>
        Did you know? A group of ferrets is called a &quot;business&quot;.
      </>
    ),
  },
  render: (args) => <Tooltip {...args} />,
  play: async () => userEvent.hover(screen.getByTestId('trigger')),
};

export const LabelWithLineBreak: StoryObj<typeof Tooltip> = {
  render: (args) => {
    const label =
      'In order for to enforce line-breaks {\\n},\neither assign the label to a variable\nor use backticks {``}';

    return <Tooltip {...args} content={label} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Placement: StoryObj<typeof Tooltip> = {
  render: (args) => {
    const placements = [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
    ];

    return <Storybook.Placement wrapper={<Tooltip {...args} content="Hi!" />} placements={placements} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * The `shouldAddTriggerFocus` prop is used to add a focusable container to the tooltip trigger when it is a non-interactive element.
 * Use the controls and the tab key to observe how focus behaves when you toggle this prop.
 */
export const ShouldAddTriggerFocus: StoryObj<typeof Tooltip> = {
  args: {
    ...Main.args,
    shouldAddTriggerFocus: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Text>{`I'm a non-interactive element`}</Text>
    </Tooltip>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LabelWithIcon: StoryObj<typeof Tooltip> = {
  render: (args) => {
    const [isCopied, setIsCopied] = useState(false);
    const [copyStatus, setCoptStatus] = useState<'success' | 'failed' | undefined>(undefined);

    const textToCopy = 'Copy me!';

    const getTooltipText = () => {
      switch (copyStatus) {
        case 'success':
          return 'Copied to clipboard';
        case 'failed':
          return 'Failed copying to clipboard';
        default:
          return 'Click to copy';
      }
    };

    const handleCopyToClipboard = useCallback(() => {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCoptStatus('success');
          setIsCopied(true);
        })
        .catch(() => {
          setCoptStatus('failed');
          setIsCopied(true);
        });
    }, []);

    const getCopyLabel = () => {
      if (isCopied) {
        return (
          <Group spacing="xs">
            <Icon size="small" color="inverse" type="checked" aria-hidden />
            <Text textStyle="body4" color="semantic.text.inverse">
              {getTooltipText()}
            </Text>
          </Group>
        );
      } else {
        return getTooltipText();
      }
    };

    const handleReset = useCallback(() => {
      setCoptStatus(undefined);
      setIsCopied(false);
    }, []);

    return (
      <Storybook.Container display="flex" gap="m" alignItems="center">
        <Tooltip {...args} content={getCopyLabel()}>
          <IconButton
            data-testid="trigger"
            variant="tertiary"
            icon="duplicate-flip"
            aria-label="Duplicate"
            size="medium"
            onClick={handleCopyToClipboard}
            onFocus={handleReset}
            onMouseEnter={handleReset}
          />
        </Tooltip>
        <Text>{textToCopy}</Text>
      </Storybook.Container>
    );
  },
  play: async () => userEvent.type(screen.getByTestId('trigger'), '{enter}'),
};

/**
 * Here’s an example of how to control the tooltip state with elements that are not wrapped by the Tooltip but still display it when hovered over. <br />
 * Using control mode is the best practice for triggering the tooltip without wrapping multiple elements, and it also helps avoid accessibility issues.
 */
export const Controlled: StoryObj<typeof Tooltip> = {
  render: ({ isOpen, onOpenChange, ...args }) => {
    const [open, setOpen] = useState(isOpen);

    const onTooltipOpenChange = (open: boolean) => {
      setOpen(open);
    };

    return (
      <Group alignItems="center">
        <Tooltip
          {...args}
          isOpen={open}
          onOpenChange={onTooltipOpenChange}
          content="Did you know? You can control my open state yourself 🤯"
        >
          <IconButton
            data-testid="icon-trigger"
            variant="tertiary"
            icon="info"
            aria-label="More information"
            size="medium"
            onClick={noop}
          />
        </Tooltip>
        <Storybook.Container
          onMouseEnter={() => onTooltipOpenChange(true)}
          onMouseLeave={() => onTooltipOpenChange(false)}
        >
          <Text>I’m not wrapped with a tooltip, but I still trigger the tooltip when hovered over.</Text>
        </Storybook.Container>
      </Group>
    );
  },
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
