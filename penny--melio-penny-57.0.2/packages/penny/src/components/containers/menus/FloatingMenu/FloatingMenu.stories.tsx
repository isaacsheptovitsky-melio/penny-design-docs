import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { IconButton } from '@/components/action/IconButton';
import { NakedButton } from '@/components/action/NakedButton';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import {
  extractComponentSource,
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
} from '@/test-utils/storybook.utils';

import { Container } from '../../Container';
import { Group } from '../../Group';
import {
  FloatingMenu,
  FloatingMenuActionTrigger,
  FloatingMenuDivider,
  FloatingMenuDropdownList,
  FloatingMenuFooter,
  FloatingMenuHeader,
  FloatingMenuItem,
  FloatingMenuSection,
  useMenuItem,
} from '.';
import { WithSearchBarExample } from './FloatingMenu.examples';
import FloatingMenuExamples from './FloatingMenu.examples?raw';

/**
 * The **Floating Menu** component is a flexible menu that appears as a floating element beside its trigger element.<br />
 * The component supports **FloatingMenuHeader**, **FloatingMenuFooter**, **FloatingMenuSection**, **FloatingMenuDivider**, **FloatingMenuDropdownList** and customizable items, such as [FloatingMenuItem](/docs/containers-menus-floating-menu-items-item--docs) and [FloatingMenuSelectionItem](docs/containers-menus-floating-menu-items-selection-item--docs).<br />
 * The component is fully accessible, offering seamless keyboard navigation and an optimal experience for screen reader users.
 */

const meta: Meta<typeof FloatingMenu> = {
  title: 'Containers/Menus/Floating Menu/Floating Menu [new]',
  component: FloatingMenu,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    trigger: {
      control: false,
      description: 'The trigger element that opens and closes the menu.',
      type: { name: 'other', value: 'ReactNode', required: true },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    content: {
      control: false,
      description: 'The content of the menu.',
      type: { name: 'other', value: 'ReactNode', required: true },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isOpen: {
      control: false,
      type: { name: 'other', value: 'boolean', required: true },
      description: 'Determines if the menu is open.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    onOpenChange: {
      control: false,
      description: "A function that toggles the menu's `isOpen` state.",
      table: { type: { summary: '(isOpen: boolean) => void' }, category: 'events' },
    },
    header: {
      control: false,
      description:
        'The header of the menu.<br />This is an optional section.<br />You can use `FloatingMenuHeader` component to get the conventional paddings for the header.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    footer: {
      control: false,
      description:
        'The footer of the menu.<br />This is an optional section.<br />You can use `FloatingMenuFooter` component to get the conventional paddings for the footer.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    width: {
      control: 'text',
      description: "The width of the menu.<br />If `'match-trigger'` is passed, the width will be the trigger's width.",
      table: { type: { summary: "CSSProperties['width'] | 'match-trigger'" }, category: 'props' },
    },
    maxWidth: {
      control: 'text',
      description:
        "The max-width of the menu.<br />If the width of the menu takes the trigger's width then you shouldn't define a max-width.",
      table: { type: { summary: "CSSProperties['maxWidth']" }, category: 'props' },
    },
    maxHeight: {
      control: 'text',
      description: 'The maximum height of the **menu content**.',
      table: {
        type: { summary: "CSSProperties['maxHeight']" },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the menu is disabled.<br /> Will also disable the trigger.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the trigger is read-only.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    disableMenuShift: {
      control: 'boolean',
      description: 'Disables the menu [shift](https://floating-ui.com/docs/shift) feature.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    disableTypeahead: {
      control: 'boolean',
      description: 'Disables the menu [typeahead](https://floating-ui.com/docs/useTypeahead) feature.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    disableOpenByTriggerClick: {
      control: 'boolean',
      description: 'Disables the menu to be open by clicking the trigger.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    isVirtualList: {
      control: 'boolean',
      description:
        'Whether the focus is [virtual](https://floating-ui.com/docs/useListNavigation#virtual) (using `aria-activedescendant`).<br />Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate list items. This is common in autocomplete listbox components.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    initialFocus: {
      description:
        'Which element to initially focus. See [this](https://floating-ui.com/docs/FloatingFocusManager#initialfocus) for more info.',
      table: { type: { summary: 'number | MutableRefObject<HTMLElement | null>' }, category: 'accessibility' },
    },
    role: {
      control: 'select',
      options: ['menu', 'listbox'],
      description: 'The semantic meaning of the component.',
      table: {
        type: { summary: 'menu | listbox' },
        defaultValue: { summary: 'menu' },
        category: 'accessibility',
      },
    },
    hasItems: {
      control: 'boolean',
      description:
        'A property that marks that the menu has items inside.<br />This is important since it will allow the floating menu to act accordingly, like structuring the HTML in an accessible manner.<br /><br />Setting this prop to `false` will also remove the `role` attribute from the dropdown to allow screen-readers announce the dropdown content correctly.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    'data-component': {
      control: 'text',
      description: 'Gives a name to the component in HTML dom.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'Determines if the focus should be trapped within the dropdown.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'floating-menu' }, type: { summary: 'string' }, category: 'tests' },
    },
    getInsideElements: {
      control: false,
      description:
        "Determines which elements are considered inside the floating element when it's rendered. Such elements will avoid being marked with `aria-hidden` and `data-floating-ui-inert` attributes. See [here](https://floating-ui.com/docs/floatingfocusmanager#getinsideelements) for more details.",
      table: { type: { summary: '() => Element[]' }, category: 'props' },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description:
        'The placement of the menu relative to the trigger. Uses [Floating UI placement](https://floating-ui.com/docs/tutorial#placements).',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'bottom-start' },
        category: 'props',
      },
    },
  },
  args: {
    trigger: undefined,
    content: undefined,
    isOpen: false,
    onOpenChange: undefined,
    header: undefined,
    footer: undefined,
    width: undefined,
    maxHeight: undefined,
    isDisabled: false,
    isReadOnly: false,
    disableMenuShift: false,
    disableTypeahead: false,
    role: undefined,
    hasItems: undefined,
    shouldTrapFocus: false,
    'data-testid': 'floating-menu-dropdown',
    placement: 'bottom-start',
  },
};
export default meta;

export const Main: StoryObj<typeof FloatingMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <FloatingMenuActionTrigger label="Click me" />;

    const header = (
      <FloatingMenuHeader>
        <Storybook.ContentPlaceholder label="Header (optional)" />
      </FloatingMenuHeader>
    );
    const content = (
      <FloatingMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="Body" height="75px" borderRadius="global.none" />
      </FloatingMenuDropdownList>
    );
    const footer = (
      <FloatingMenuFooter>
        <Storybook.ContentPlaceholder label="Footer (optional)" />
      </FloatingMenuFooter>
    );

    return (
      <FloatingMenu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        header={header}
        content={content}
        footer={footer}
        hasItems={false}
        trigger={trigger}
      />
    );
  },
};

/**
 * You can define a custom width to the menu using the `width` property.<br />
 * If you pass `'match-trigger'` to `width`, the width of the menu will match the width of the trigger of the menu. <br />
 *
 * You can also define a `max-width` if you want the menu to fit its content.<br />
 * Note that the convention says that you should put a `max-width` of `400px` in that case.<br />
 * Also note that using `max-width` when the menu width should match the trigger width might cause the menu to not reach the width of the trigger.
 */
export const CustomWidth: StoryObj<typeof FloatingMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
    const [isOpen2, setIsOpen2] = useState(isUsingVisualTesting());
    const [isOpen3, setIsOpen3] = useState(isUsingVisualTesting());

    const FixedWidthMenu = (
      <FloatingMenu
        {...props}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <FloatingMenuItem>Item #1</FloatingMenuItem>
            <FloatingMenuItem>Item #2</FloatingMenuItem>
            <FloatingMenuItem>Item #3</FloatingMenuItem>
            <FloatingMenuItem>Item #4</FloatingMenuItem>
          </FloatingMenuDropdownList>
        }
        width="200px"
      />
    );

    const MaxWidthMenuItem = ({ name, email }: { name: string; email: string }) => (
      <FloatingMenuItem>
        <Group alignItems="center" spacing="xs-s">
          <Icon type="send" size="small" />
          <Group variant="vertical" spacing="xxxs">
            <Text textStyle="inline" color="semantic.text.primary" shouldSupportEllipsis>
              {name}
            </Text>
            <Text textStyle="inline" color="semantic.text.secondary" shouldSupportEllipsis>
              {email}
            </Text>
          </Group>
        </Group>
      </FloatingMenuItem>
    );
    const MaxWidthMenu = (
      <FloatingMenu
        {...props}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen2}
        onOpenChange={setIsOpen2}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <MaxWidthMenuItem
              name="Global Pharmaceuticals Division of IMPAX Laboratories, Inc."
              email="mbesantf1slxi233@jalbumasdd.net"
            />
            <MaxWidthMenuItem name="Wise Consumer Products" email="sgiovannettidovaiovannslx@scientificamerican.com" />
            <MaxWidthMenuItem name="Lupin Pharmaceuticals, Inc." email="tmingasson1w@parallels.com	" />
            <MaxWidthMenuItem name="Clinical Solutions Wholesale" email="ckrystek2m@webeden.co.uk	" />
          </FloatingMenuDropdownList>
        }
        width="fit-content"
        maxWidth="400px"
      />
    );

    const MatchTriggerWidthMenu = (
      <FloatingMenu
        {...props}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen3}
        onOpenChange={setIsOpen3}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <FloatingMenuItem>Item #1</FloatingMenuItem>
            <FloatingMenuItem>Item #2</FloatingMenuItem>
            <FloatingMenuItem>Item #3</FloatingMenuItem>
            <FloatingMenuItem>Item #4</FloatingMenuItem>
          </FloatingMenuDropdownList>
        }
        width="match-trigger"
      />
    );

    return (
      <Storybook.Row
        alignCompLabel="vertical"
        items={[
          { label: 'Fixed Width', component: FixedWidthMenu },
          { label: 'Max Width', component: MaxWidthMenu },
          { label: 'Match Trigger Width', component: MatchTriggerWidthMenu },
        ]}
      />
    );
  },
};

/**
 * The default Max Height is 256px.
 */
export const CustomMaxHeight: StoryObj<typeof FloatingMenu> = {
  render: (props) => {
    const [isDefaultMenuOpen, setIsDefaultMenuOpen] = useState(false);
    const [isCustomOpen, setIsCustomOpen] = useState(false);

    const trigger = <FloatingMenuActionTrigger label="Click me" />;
    const content = (
      <FloatingMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="Body" borderRadius="global.none" height="500px" />
      </FloatingMenuDropdownList>
    );

    const header = (
      <FloatingMenuHeader>
        <Storybook.ContentPlaceholder label="Header (optional)" />
      </FloatingMenuHeader>
    );

    const footer = (
      <FloatingMenuFooter>
        <Storybook.ContentPlaceholder label="Footer (optional)" />
      </FloatingMenuFooter>
    );
    return (
      <Storybook.Row
        alignCompLabel="vertical"
        items={[
          {
            label: 'Default',
            component: (
              <FloatingMenu
                {...props}
                trigger={trigger}
                isOpen={isDefaultMenuOpen}
                onOpenChange={setIsDefaultMenuOpen}
                header={header}
                content={content}
                hasItems={false}
                footer={footer}
              />
            ),
          },
          {
            label: 'Custom Max Height',
            component: (
              <FloatingMenu
                {...props}
                trigger={trigger}
                isOpen={isCustomOpen}
                onOpenChange={setIsCustomOpen}
                header={header}
                content={content}
                hasItems={false}
                footer={footer}
                maxHeight="150px"
              />
            ),
          },
        ]}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * In order for the search to be part of the keyboard navigation - use the available `useMenuItem` hook which will yield a `ref` object.<br />
 * Give that `ref` to the element that should be part of the keyboard navigation.
 */
export const WithSearchBar: StoryObj<typeof FloatingMenu> = {
  render: (props) => <WithSearchBarExample {...props} />,
  parameters: {
    docs: { source: { code: extractComponentSource(FloatingMenuExamples, 'WithSearchBarExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * In order for the back button to be part of the keyboard navigation - use the available `useMenuItem` hook which will yield a `ref` object.<br />
 * Give that `ref` to the element that should be part of the keyboard navigation.
 */
export const WithBackButton: StoryObj<typeof FloatingMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const trigger = <FloatingMenuActionTrigger label="Click me" />;
    const Header = () => {
      const { ref } = useMenuItem();

      return (
        <FloatingMenuHeader>
          <Group alignItems="center" spacing="xs">
            <IconButton icon="arrow-left" size="small" variant="naked" onClick={() => setIsOpen(false)} ref={ref} />
            <Text textStyle="body3Semi" color="semantic.text.primary">
              Back
            </Text>
          </Group>
        </FloatingMenuHeader>
      );
    };

    return (
      <FloatingMenu
        {...props}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        header={<Header />}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <FloatingMenuItem>Item #1</FloatingMenuItem>
            <FloatingMenuItem>Item #2</FloatingMenuItem>
            <FloatingMenuItem>Item #3</FloatingMenuItem>
            <FloatingMenuItem>Item #4</FloatingMenuItem>
          </FloatingMenuDropdownList>
        }
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const EmptyState: StoryObj<typeof FloatingMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const withEmptyState = (
      <FloatingMenu
        {...args}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <Container justifyContent="center" alignItems="center" paddingX="s" paddingY="s">
              <Text textStyle="body3" color="semantic.text.secondary">
                No results
              </Text>
            </Container>
          </FloatingMenuDropdownList>
        }
        hasItems={false}
      />
    );

    const withAction = (
      <FloatingMenu
        {...args}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen2}
        onOpenChange={setIsOpen2}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <Container justifyContent="center" alignItems="center" paddingX="s" paddingY="s">
              <NakedButton label="Action" variant="secondary" />
            </Container>
          </FloatingMenuDropdownList>
        }
        hasItems={false}
      />
    );

    return (
      <Storybook.Row
        alignCompLabel="vertical"
        items={[
          { label: 'Empty State', component: withEmptyState },
          { label: 'With Action', component: withAction },
        ]}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Wrapping options with sections is easy.<br />
 * Use `FloatingMenuSection` to wrap the section's options, and then label the section (you can pass JSX to the label).
 *
 * To create a divider between the section use `FloatingMenuDivider` (this would ensure the current HTML structure for accessibility).
 *
 * Remember to set the `DropdownList` as a div to let the component structure the HTML in an accessible manner.
 */
export const WithSections: StoryObj<typeof FloatingMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    return (
      <FloatingMenu
        {...props}
        trigger={<FloatingMenuActionTrigger label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <FloatingMenuDropdownList as="div" paddingY="xs">
            <FloatingMenuSection label="SECTION TITLE">
              <FloatingMenuItem>Item #1.1</FloatingMenuItem>
              <FloatingMenuItem>Item #1.2</FloatingMenuItem>
            </FloatingMenuSection>
            <FloatingMenuDivider />
            <FloatingMenuSection
              label={
                <Group spacing="xs" alignItems="center">
                  <Text color="semantic.text.secondary" textStyle="body4Semi">
                    SECTION 2 TITLE
                  </Text>
                  <Icon type="verified" color="brand" size="small" />
                </Group>
              }
            >
              <FloatingMenuItem>Item #2.1</FloatingMenuItem>
              <FloatingMenuItem>Item #2.2</FloatingMenuItem>
            </FloatingMenuSection>
          </FloatingMenuDropdownList>
        }
      />
    );
  },
};
