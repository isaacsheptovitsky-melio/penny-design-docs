import { createDate, formatDateTime, noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { InputType } from 'storybook/internal/csf';

import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import type { OpenChangeTriggerEvent } from '@/components/containers/menus/Context/types';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator, isUsingVisualTesting, setChromaticViewports } from '@/test-utils';

import CalendarMeta from '../Calendar/Calendar.stories';
import { FloatingCalendar } from './FloatingCalendar';

const isVisualTesting = isUsingVisualTesting();

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;

const floatingCalendarArgTypes: Record<string, InputType> = {
  legendItems: {
    control: 'object',
    description: 'An array of the legends under the calendar.',
    table: {
      category: 'props',
      type: {
        summary: 'CalendarLegendProps[]',
        detail: calendarLegendPropsType,
      },
    },
  },
  legendWidth: {
    control: 'select',
    description: 'Decides the width of the legend items.',
    options: ['fit-content', 'full'],
    table: {
      defaultValue: { summary: 'fit-content' },
      type: { summary: 'fit-content | full' },
      category: 'props',
    },
  },
  shouldDisableDate: {
    control: false,
    description: 'Callback to determine if a date should be disabled.',
    table: {
      type: { summary: '(date: Date) => boolean' },
      category: 'props',
    },
  },
  backButton: {
    control: 'object',
    description: "The back button's callback and label.",
    table: {
      category: 'props',
      type: {
        summary: '{onBack: VoidFunction; label: string;}',
      },
    },
  },
  onSelect: {
    control: false,
    action: 'select',
    description: 'Callback to call when a date is selected',
    table: {
      category: 'events',
      type: {
        summary: '(date: Date) => void',
      },
    },
  },
  value: {
    control: 'date',
    description: 'Current selected date.',
    table: {
      category: 'props',
      type: {
        summary: "CalendarProps['selectedDate']",
      },
    },
  },
  'data-testid': {
    control: 'text',
    description: 'The `data-testid` attribute for testing purposes.',
    table: { defaultValue: { summary: 'floating-calendar' }, type: { summary: 'string' }, category: 'tests' },
  },
  selectedDateAriaLabel: {
    control: 'text',
    description: 'The `aria-label` of the selected date (current value) in floating calendar.',
    table: { type: { summary: 'string' }, category: 'accessibility' },
  },
  secondaryDateAriaLabel: {
    control: 'text',
    description: 'The `aria-label` of the secondary selected date in floating calendar.',
    table: { type: { summary: 'string' }, category: 'accessibility' },
  },
  currentDateAriaLabel: {
    control: 'text',
    description: 'The `aria-label` of the current date (today) in floating calendar.',
    table: { type: { summary: 'string' }, category: 'accessibility' },
  },
};

const calendarArgTypes: Record<string, InputType> = Object.fromEntries(
  Object.entries(CalendarMeta.argTypes ?? {}).filter(
    ([key]) => key !== 'size' && key !== 'isDisabled' && key !== 'onSelect' && key !== 'selectedDate'
  )
);

const menuArgTypes: Record<string, InputType> = {
  trigger: {
    control: false,
    type: { name: 'other', value: 'ReactNode', required: true },
    description: 'The trigger that opens the FloatingCalendar.',
    table: {
      category: 'props',
      type: {
        summary: 'ReactElement',
      },
    },
  },
  isOpen: {
    control: false,
    description: 'Determines if the dropdown is open, when the menu is controlled outside of the context.',
    table: {
      type: { summary: 'boolean' },
      category: 'props',
    },
  },
  onOpenChange: {
    control: false,
    description:
      'An event callback invoked when the open boolean state should change. <br /> `triggerEvent` is used to determine the source of the change in the open state. <br /> - `trigger`: The open state was changed by the trigger. <br /> - `outside`: The open state was changed by clicking outside the floating calendar. <br /> - `content`: The open state was changed by selecting a day.',
    table: {
      type: {
        summary: `(isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void`,
        detail: `OpenChangeTriggerEvent = 'trigger' | 'outside' | 'content';`,
      },
      category: 'props',
    },
  },
  isDisabled: {
    control: 'boolean',
    description: 'Determines if the component is in a disabled state.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
  },
  size: {
    control: 'select',
    options: ['small', 'large'],
    description: 'Determines the size of the dropdown.',
    table: {
      category: 'props',
      defaultValue: { summary: 'small' },
      type: { summary: 'small | large' },
    },
  },
  disableYearSelection: {
    control: 'boolean',
    description: "Disables the Calander's year selection.",
    table: {
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
      category: 'props',
    },
  },
  shouldTrapFocus: {
    control: 'boolean',
    description: 'If set, the focus will be trapped within the calendar.',
    table: {
      defaultValue: { summary: 'true' },
      type: { summary: 'boolean' },
      category: 'props',
    },
  },
};

const meta: Meta<typeof FloatingCalendar> = {
  title: 'Selection & Inputs Components/Floating Calendar [pattern]',
  component: FloatingCalendar,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    docs: { source: { type: 'code' } },
    date: createDate('2022-11-20'),
  },
  argTypes: {
    ...menuArgTypes,
    ...floatingCalendarArgTypes,
    ...calendarArgTypes,
  },
  args: {
    value: createDate('2022-11-05'),
    showToday: !isVisualTesting,
    disableYearSelection: false,
    shouldTrapFocus: true,
    'data-testid': 'floating-calendar',
    selectedDateAriaLabel: '',
    secondaryDateAriaLabel: '',
    currentDateAriaLabel: '',
  },
};
export default meta;

export const Main: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const [isOpen, setIsOpen] = useState<boolean>(isVisualTesting);
    const [selection, setSelection] = useState<Date | undefined>(value);

    const formattedValue = formatDateTime(selection);

    const handleSelect = (date: Date) => {
      setSelection(date);
    };

    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
      />
    );
    return (
      <FloatingCalendar
        {...args}
        isOpen={isOpen}
        trigger={triggerComponent}
        value={selection}
        onSelect={handleSelect}
        onOpenChange={setIsOpen}
      />
    );
  },
};

export const BackButton: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const [selection, setSelection] = useState<Date | undefined>(value);
    const [isOpen, setIsOpen] = useState<boolean>(isVisualTesting);

    const secondarySelectedDate = createDate('2022-11-25');
    const formattedValue = formatDateTime(selection);

    const backButton = { onBack: noop, label: 'Back' };

    const handleSelect = (date: Date) => {
      setSelection(date);
    };
    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
      />
    );
    return (
      <FloatingCalendar
        {...args}
        trigger={triggerComponent}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSelect={handleSelect}
        value={selection}
        secondarySelectedDate={secondarySelectedDate}
        legendItems={[
          { label: 'Due date', date: formattedValue },
          { label: 'Selected', date: formatDateTime(secondarySelectedDate), variant: 'secondary' },
          { label: 'Today', date: formatDateTime(createDate('2022-11-15')), variant: 'today' },
        ]}
        backButton={backButton}
      />
    );
  },
};

/**
 * Here's an example of a `FloatingCalendar` with a footer that contains actions to save or cancel the selection.
 *
 * When the user clicks outside the `FloatingCalendar` doesn't close.
 */
export const WithFooterActionsWithoutCloseByClickingOutside: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const secondarySelectedDate = createDate('2022-11-25');

    const [isOpen, setIsOpen] = useState<boolean>(isVisualTesting);
    const [selection, setSelection] = useState<Date | undefined>(value);
    const [localSelection, setLocalSelection] = useState<Date | undefined>(value);
    const formattedValue = formatDateTime(selection);

    // saves the local selection and closes the `FloatingCalendar`.
    const saveSelection = () => {
      setSelection(localSelection);
      setIsOpen(false);
    };

    // resets the local selection and closes the `FloatingCalendar`.
    const resetSelection = () => {
      setLocalSelection(selection);
      setIsOpen(false);
    };

    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
      />
    );
    return (
      <FloatingCalendar
        {...args}
        isOpen={isOpen}
        trigger={triggerComponent}
        value={localSelection}
        onSelect={(date: Date) => {
          // sets the local selection but don't save it yet.
          setLocalSelection(date);
        }}
        // opens the `FloatingCalendar` when the user clicks on the trigger.
        onOpenChange={(open) => open && setIsOpen(true)}
        legendItems={[
          { label: 'Due date', date: formattedValue },
          { label: 'Selected', date: formatDateTime(secondarySelectedDate), variant: 'secondary' },
          { label: 'Today', date: formatDateTime(createDate('2022-11-15')), variant: 'today' },
        ]}
        footer={
          <Container paddingX="s" paddingY="s" paddingBottom="xs">
            <Group justifyContent="space-between" spacing="s">
              <Button variant="secondary" onClick={resetSelection} label="Cancel" />
              <Button variant="primary" onClick={saveSelection} label="Apply" />
            </Group>
          </Container>
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

/**
 * Here's an example of a `FloatingCalendar` with a footer that contains actions and full control over the open state (Click on show code for reference).
 *
 * When the user clicks outside the `FloatingCalendar`, it closes by detecting the source of the trigger event.
 */
export const ControlledWithFooterActions: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const secondarySelectedDate = createDate('2022-11-25');

    const [isOpen, setIsOpen] = useState<boolean>(isVisualTesting);
    const [selection, setSelection] = useState<Date | undefined>(value);
    const [localSelection, setLocalSelection] = useState<Date | undefined>(value);
    const formattedValue = formatDateTime(selection);

    // saves the local selection and closes the `FloatingCalendar`.
    const saveSelection = () => {
      setSelection(localSelection);
      setIsOpen(false);
    };

    // resets the local selection and closes the `FloatingCalendar`.
    const resetSelection = () => {
      setLocalSelection(selection);
      setIsOpen(false);
    };

    const onOpenChange = (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => {
      if (isOpen) {
        setIsOpen(true);
      } else if (triggerEvent === 'outside') {
        // when the user clicks outside the `FloatingCalendar`, it resets the selection and close the `FloatingCalendar`.
        resetSelection();
      }
    };

    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
      />
    );
    return (
      <FloatingCalendar
        {...args}
        isOpen={isOpen}
        trigger={triggerComponent}
        value={localSelection}
        onSelect={(date: Date) => {
          // sets the local selection but don't save it yet.
          setLocalSelection(date);
        }}
        onOpenChange={onOpenChange}
        legendItems={[
          { label: 'Due date', date: formattedValue },
          { label: 'Selected', date: formatDateTime(secondarySelectedDate), variant: 'secondary' },
          { label: 'Today', date: formatDateTime(createDate('2022-11-15')), variant: 'today' },
        ]}
        footer={
          <Container paddingX="s" paddingY="s" paddingBottom="xs">
            <Group justifyContent="space-between" spacing="s">
              <Button variant="secondary" onClick={resetSelection} label="Cancel" />
              <Button variant="primary" onClick={saveSelection} label="Apply" />
            </Group>
          </Container>
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

/**
 * Here's an example of a `FloatingCalendar` with custom disabled dates (all Wednesdays).
 */

export const WithDisabledDates: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const [isOpen, setIsOpen] = useState<boolean>(isVisualTesting);
    const [selection, setSelection] = useState<Date | undefined>(value);

    const formattedValue = formatDateTime(selection);
    const shouldDisableDate = (date: Date) => date.getDay() === 3;

    const handleSelect = (date: Date) => {
      setSelection(date);
    };

    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
      />
    );

    return (
      <FloatingCalendar
        {...args}
        isOpen={isOpen}
        trigger={triggerComponent}
        value={selection}
        onSelect={handleSelect}
        onOpenChange={setIsOpen}
        weekDays={[0, 1, 2, 3, 4, 5, 6]}
        shouldDisableDate={shouldDisableDate}
      />
    );
  },
};

setChromaticViewports([Main, BackButton], ['xs', 'm']);
