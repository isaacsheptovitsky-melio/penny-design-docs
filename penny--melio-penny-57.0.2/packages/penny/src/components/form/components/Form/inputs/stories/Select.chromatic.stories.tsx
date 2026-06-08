/* eslint-disable @typescript-eslint/no-deprecated */
import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';

import { Form } from '../..';
import { citiesWithSectionsAvatarsAndVerifiedIcon } from './__fixtures__/select-mock-data';

const meta: Meta<typeof Form.Select> = {
  title: 'Chromatic/Select',
  component: Form.Select,
  parameters: {
    a11y: {
      // deprecated component
      test: 'off',
    },
  },
  args: {
    'aria-label': 'select label',
  },
};
export default meta;

export const BoldCreatableOption: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select
          {...registerField('no options')}
          {...args}
          options={[]}
          creatableOption={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - this is only for visual testing in Chromatic
            label: (value) => (
              <>
                Add <strong>{value}</strong> as a city
              </>
            ),
          }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => {
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.type(screen.getByRole('combobox'), 'Dimona');
  },
};

export const DefaultValueWithBrandSymbol: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { sectionWithBrandSymbol: 'Lod', optionWithBrandSymbol: 'Mars City' },
      onSubmit: () => null,
    });
    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Section with brand symbol
            </Text>
            <Form.Select
              {...registerField('sectionWithBrandSymbol')}
              {...args}
              options={citiesWithSectionsAvatarsAndVerifiedIcon}
              valueRightElement={<Icon size="small" type="verified" color="brand" />}
            />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Option with brand symbol
            </Text>
            <Form.Select
              {...registerField('optionWithBrandSymbol')}
              {...args}
              options={citiesWithSectionsAvatarsAndVerifiedIcon}
              valueRightElement={<Icon size="small" type="verified" color="brand" />}
            />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const WithTruncatedLongLabel: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form width={400}>
        <Form.Select
          {...registerField('long label')}
          {...args}
          options={[
            {
              label: 'A really long label that will be truncated and display a tooltip on hover',
              value: 'long label',
            },
          ]}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => {
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.hover(screen.getByText(/really long label/i));
  },
};

export const WithLongDescription: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form width={400}>
        <Form.Select
          {...registerField('long description')}
          {...args}
          options={[
            {
              label: 'Option label',
              value: 'long description',
              description:
                'List item with a very very very very very very very very very very very very very long description, but without ellipsis (:',
            },
          ]}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const WithLongLabelAndValueRightElement: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { fieldName: 'long label' }, onSubmit: () => null });
    const options = [
      {
        label: 'A really long label that will be truncated and show ellipsis',
        value: 'long label',
      },
    ];
    const props = { ...args, options };
    const propsWithValueRightElement = {
      ...props,
      valueRightElement: <Icon size="small" type="verified" color="brand" />,
    };
    return (
      <Group variant="vertical" hasDivider>
        <Group variant="vertical">
          <Text as="h2">
            With <Storybook.Code label="valueRightElement" />
          </Text>
          <Form width={700}>
            <SimpleGrid columns={2} gridGap="xl">
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Large size
                </Text>
                <Form.Select {...registerField('fieldName')} {...propsWithValueRightElement} />
              </Group>
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Large size - View mode
                </Text>
                <Form.Select {...registerField('fieldName')} {...propsWithValueRightElement} isViewMode />
              </Group>
            </SimpleGrid>
          </Form>
          <Form width={700}>
            <SimpleGrid columns={2} gridGap="xl">
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Small size
                </Text>
                <Form.Select {...registerField('fieldName')} {...propsWithValueRightElement} size="small" />
              </Group>
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Small size - View mode
                </Text>
                <Form.Select {...registerField('fieldName')} {...propsWithValueRightElement} size="small" isViewMode />
              </Group>
            </SimpleGrid>
          </Form>
        </Group>
        <Group variant="vertical">
          <Text as="h2" textStyle="body2">
            Without <Storybook.Code label="valueRightElement" />
          </Text>
          <Form width={700}>
            <SimpleGrid columns={2} gridGap="xl">
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Large size
                </Text>
                <Form.Select {...registerField('fieldName')} {...props} />
              </Group>
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Large size - View mode
                </Text>
                <Form.Select {...registerField('fieldName')} {...props} isViewMode />
              </Group>
            </SimpleGrid>
          </Form>
          <Form width={700}>
            <SimpleGrid columns={2} gridGap="xl">
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Small size
                </Text>
                <Form.Select {...registerField('fieldName')} {...props} size="small" />
              </Group>
              <Group variant="vertical">
                <Text as="h2" textStyle="body4">
                  Small size - View mode
                </Text>
                <Form.Select {...registerField('fieldName')} {...props} size="small" isViewMode />
              </Group>
            </SimpleGrid>
          </Form>
        </Group>
      </Group>
    );
  },
};

export const CreatableOptionWithEmptyState: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select
          {...registerField('no options')}
          {...args}
          options={[]}
          emptyState={{ label: 'No options' }}
          creatableOption={{
            label: (value) => `Add ${value} as a city`,
          }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    chromatic: { diffThreshold: 0.8, delay: 2000 },
  },
  play: async () => {
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.type(screen.getByRole('combobox'), 'Dimona');
  },
};
