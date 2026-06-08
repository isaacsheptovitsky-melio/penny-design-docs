/* eslint-disable @typescript-eslint/no-deprecated */
import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';

import { Button } from '@/components/action/Button';
import { CollapsibleCard } from '@/components/containers/cards/CollapsibleCard';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';

import { Form } from '../..';
import { citiesWithSectionsAvatarsAndVerifiedIcon } from './__fixtures__/search-mock-data';

const meta: Meta<typeof Form.Search> = {
  title: 'Chromatic/Search',
  parameters: {
    a11y: {
      // deprecated component
      test: 'off',
    },
  },
  args: {
    'aria-label': 'search label',
  },
};
export default meta;

export const Loading: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { loading: null, loadingWithValue: 'Tel Aviv' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.Search
          {...args}
          {...registerField('loading')}
          emptyState={{ label: 'No options' }}
          options={[]}
          isLoading
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => {
    await userEvent.click(screen.getByRole('combobox'));
    await screen.findByText('Loading...');
  },
};

export const DefaultValueWithBrandSymbol: StoryObj<typeof Form.Search> = {
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
            <Form.Search
              {...args}
              {...registerField('sectionWithBrandSymbol')}
              emptyState={{ label: 'No options' }}
              options={citiesWithSectionsAvatarsAndVerifiedIcon}
              valueRightElement={<Icon size="small" type="verified" color="brand" />}
            />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Option with brand symbol
            </Text>
            <Form.Search
              {...registerField('optionWithBrandSymbol')}
              emptyState={{ label: 'No options' }}
              options={citiesWithSectionsAvatarsAndVerifiedIcon}
              valueRightElement={<Icon size="small" type="verified" color="brand" />}
              aria-label="option with brand symbol"
            />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const CreatableOptionWithEmptyState: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Search
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

export const InsideCollapsibleCard: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const [expanded, setExpanded] = useState(false);

    return (
      <CollapsibleCard
        isExpanded={expanded}
        header={<Button label="expend card" onClick={() => setExpanded(true)} data-testid="expand-button" />}
      >
        <Form>
          <Form.Search {...registerField('insideCollapsibleCard')} {...args} options={[]} placeholder="Search" />
        </Form>
      </CollapsibleCard>
    );
  },
  play: async () => await userEvent.click(screen.getByTestId('expand-button')),
};
