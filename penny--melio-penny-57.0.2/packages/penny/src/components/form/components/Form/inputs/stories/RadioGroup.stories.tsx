/* eslint-disable @typescript-eslint/no-deprecated */
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import type { RadioOption } from '@/components/selectionAndInputs/Radio';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const radioOptionType = `{
  value: string;
  mainLabelProps: {
    label: string;
    secondaryLabel?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    pillProps?: {
      status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
      label: string;
      type?: 'primary' | 'secondary' | 'status';
    } | {
      status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
      label: string;
      type?: 'primary' | 'secondary' | 'status';
    }[]];
    tooltipProps?: Pick<TooltipProps, 'content'> & { triggerStatus?: _IconIndicatorProps['variant'] };
    variant?: 'default' | 'bold';
  };
  descriptionProps?: {
    label: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
  } & OneOrNone<{
    link: { label: string; href: string };
    action: {
      label: string;
      onClick: MouseEventHandler;
      'data-testid'?: string;
    };
  }>;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  isReadOnly?: boolean;
  id?: string;
}[]`;

const optionsVertical: RadioOption[] = [
  {
    mainLabelProps: { label: 'Main label' },
    value: '1',
    descriptionProps: { label: 'Description text' },
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '2',
    descriptionProps: { label: 'Description text' },
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '3',
    descriptionProps: { label: 'Description text' },
  },
];

const optionsHorizontal: RadioOption[] = [
  {
    mainLabelProps: { label: 'Main label' },
    value: '1',
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '2',
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '3',
  },
];

const meta: Meta<typeof Form.RadioGroup> = {
  title: 'Internal Components/Form Fields/Radio Group',
  component: Form.RadioGroup,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    options: {
      description: 'Sets the radio buttons and their description.',
      table: { type: { summary: 'RadioOption[]', detail: radioOptionType }, category: 'props' },
      type: { name: 'other', value: 'RadioOption[]', required: true },
    },
    variant: {
      control: 'select',
      description: 'Sets the layout of the options.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'horizontal | vertical' },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, category: 'tests' },
    },
    isDisabled: commonFormFieldControls['isDisabled'],
    isHidden: commonFormFieldControls['isHidden'],
    isViewMode: commonFormFieldControls['isViewMode'],
    labelProps: commonFormFieldControls['labelProps'],
    helperTextProps: commonFormFieldControls['helperTextProps'],
    isRequired: commonFormFieldControls['isRequired'],
    showOptionalIndicator: commonFormFieldControls['showOptionalIndicator'],
    isReadOnly: commonFormFieldControls['isReadOnly'],
  },
  args: {
    options: optionsHorizontal,
    variant: 'horizontal',
    isDisabled: false,
    isHidden: false,
    isViewMode: false,
    labelProps: { label: 'React skills' },
    helperTextProps: { label: 'This will help us determine your salary.' },
    isRequired: false,
    showOptionalIndicator: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: '1' }, onSubmit: () => null });

    return (
      <Form>
        <Form.RadioGroup {...registerField('field1')} {...args} />
      </Form>
    );
  },
};

export const Variants: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: '1' }, onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Horizontal
            </Text>
            <Form.RadioGroup {...registerField('field1')} {...args} options={optionsHorizontal} variant="horizontal" />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Vertical
            </Text>
            <Form.RadioGroup
              {...registerField('field1')}
              {...args}
              options={optionsVertical}
              variant="vertical"
              helperTextProps={undefined}
            />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const WithBadgeAndIconAndDescription: StoryObj<typeof Form.RadioGroup> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: value }, onSubmit: () => null });

    const optionsVertical: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label', tooltipProps: { content: 'Hi you!' } },
        value: '1',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: { label: 'Main label', pillProps: { label: 'Badge', status: 'brand' } },
        value: '2',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: 'Hi again!' },
        },
        value: '3',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: "You're the best!", triggerStatus: 'warning' },
        },
        value: '4',
        descriptionProps: {
          label: 'Slightly longer description',
          // eslint-disable-next-line no-alert
          action: { label: 'With CTA', onClick: () => alert('description action') },
        },
      },
    ];

    return (
      <Form>
        <Form.RadioGroup
          {...registerField('field1')}
          {...args}
          options={optionsVertical}
          variant="vertical"
          helperTextProps={undefined}
        />
      </Form>
    );
  },
};

export const WithBadgeAndIcon: StoryObj<typeof Form.RadioGroup> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: value }, onSubmit: () => null });

    const optionsHorizontal: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label', tooltipProps: { content: 'Hi you!' } },
        value: '1',
      },
      {
        mainLabelProps: { label: 'Main label', pillProps: { label: 'Badge', status: 'brand' } },
        value: '2',
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: 'Hi agin!' },
        },
        value: '3',
      },
    ];

    return (
      <Form>
        <Form.RadioGroup {...registerField('field1')} {...args} options={optionsHorizontal} variant="horizontal" />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: '1' }, onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Horizontal
            </Text>
            <Form.RadioGroup
              {...registerField('disabled')}
              {...args}
              options={optionsHorizontal}
              variant="horizontal"
              isDisabled
            />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Vertical
            </Text>
            <Form.RadioGroup
              {...registerField('disabled')}
              {...args}
              options={optionsVertical}
              variant="vertical"
              helperTextProps={undefined}
              isDisabled
            />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const SingleOptionDisabled: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: '1' }, onSubmit: () => null });

    return (
      <Form>
        <Group variant="vertical">
          <Text as="h2" textStyle="heading4">
            Horizontal
          </Text>
          <Form.RadioGroup
            {...registerField('disabled')}
            {...args}
            options={[
              {
                mainLabelProps: { label: 'Disabled main label' },
                value: 'disabled',
                disabled: true,
              },
              ...optionsHorizontal,
            ]}
            variant="horizontal"
          />
        </Group>
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.RadioGroup> = {
  args: { isReadOnly: true },
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { readonly: '1' }, onSubmit: () => null });

    return (
      <Form>
        <Form.RadioGroup {...registerField('readonly')} {...args} />
      </Form>
    );
  },
};

export const SingleOptionReadOnly: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { optionReadonly: '1' }, onSubmit: () => null });
    const readOnlyOptions = [
      {
        mainLabelProps: { label: 'Main label' },
        isReadOnly: true,
        value: '1',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '2',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '3',
      },
    ];
    return (
      <Form>
        <Form.RadioGroup {...registerField('optionReadonly')} {...args} options={readOnlyOptions} />
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      defaultValues: { invalid: '3' },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Error message' });
    }, [setError]);

    const options: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label' },
        value: '1',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '2',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '3',
      },
    ];

    return (
      <Form>
        <Form.RadioGroup {...registerField('invalid')} {...args} options={options} isInvalid variant="horizontal" />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: '1' }, onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Required
            </Text>
            <Form.RadioGroup {...registerField('field1')} {...args} options={optionsHorizontal} isRequired />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Optional
            </Text>
            <Form.RadioGroup {...registerField('field1')} {...args} options={optionsHorizontal} />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: '1' }, onSubmit: () => null });

    return (
      <Form>
        <Form.RadioGroup {...registerField('field1')} {...args} options={optionsHorizontal} showOptionalIndicator />
      </Form>
    );
  },
};

export const ViewMode: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { viewMode: '1' }, onSubmit: () => null });
    return (
      <Form isViewMode>
        <Form.RadioGroup {...registerField('viewMode')} {...args} />
      </Form>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: '1' }, onSubmit: () => null });

    const labelWithTooltip = {
      label: 'React skills',
      tooltipProps: {
        content: (
          <>
            <Box as="span" display="inline-flex" textStyle="body4Semi">
              Title
            </Box>
            Label
          </>
        ),
      },
    };

    return (
      <Form>
        <Form.RadioGroup
          {...registerField('field1')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const Placeholder: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Placeholder
            </Text>
            <Text as="h2" textStyle="heading2">
              Not yet defined.
            </Text>
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              View-mode Placeholder
            </Text>
            <Form.RadioGroup {...registerField('none')} {...args} viewModePlaceholder="No name provided" isViewMode />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.RadioGroup ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.RadioGroup> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        <Form>
          {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
          <Form.RadioGroup {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.RadioGroup {...registerField('field2')} {...args} />}
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
