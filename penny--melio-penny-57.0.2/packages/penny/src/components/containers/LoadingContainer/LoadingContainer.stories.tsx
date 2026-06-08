import { useBoolean } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/action/Button';

import { Card } from '../cards/Card';
import { Container } from '../Container';
import { Group } from '../Group';
import { LoadingContainer } from './LoadingContainer';

const meta: Meta<typeof LoadingContainer> = {
  title: 'Containers/Loading Container',
  component: LoadingContainer,
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Determines if the loader is shown or not',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    loadingText: {
      control: 'text',
      description:
        'For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.',
      table: {
        category: 'props',
        defaultValue: { summary: 'Loading...' },
        type: { summary: 'string' },
      },
    },
    hideLoadingText: {
      control: 'boolean',
      description:
        'To prevent rendering the loading text, set `hideLoadingText` to true, the loading component uses the aria-busy attribute. However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'loading-container' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    isLoading: false,
    loadingText: 'Loading...',
    hideLoadingText: false,
    'data-testid': 'loading-container',
  },
};
export default meta;

export const Main: StoryObj<typeof LoadingContainer> = {
  render: (args) => (
    <Container border="regular">
      <LoadingContainer {...args}>
        <Card>This card has content that loaded</Card>
      </LoadingContainer>
    </Container>
  ),
};

export const Loading: StoryObj<typeof LoadingContainer> = {
  render: (args) => {
    const [isLoading, loading] = useBoolean(true);
    setTimeout(loading.off, 3000);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Main.render {...args} isLoading={isLoading} />;
  },
};

/**
 * Here's an example of how to associate the trigger with the `LoadingContainer`:
 * - Use the `aria-labelledby` attribute to set the associated element's ID as a reference.
 * - Set the `id` of `LoadingContainer` as a reference on the button that toggles the loading state.
 *
 * Refer to the code for details and use a screen reader to experience the announcement.
 */
export const AssociateLoadingContainer: StoryObj<typeof LoadingContainer> = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Group variant="vertical">
        <Button
          onClick={() => setIsLoading(!isLoading)}
          label="Toggle loading container"
          aria-labelledby="loadingContainer"
        />
        <Container border="regular">
          <LoadingContainer isLoading={isLoading} id="loadingContainer">
            <Card>This card has content that loaded</Card>
          </LoadingContainer>
        </Container>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Here's an example of how to focus the `LoadingContainer` to announce the loading state:
 * - Add `tabIndex={0}` to the `LoadingContainer` to make it focusable.
 * - Use a ref to focus on the container when the loading state is true.
 *
 * Refer to the code for details and use a screen reader to experience the announcement.
 */
export const AnnounceAndFocusLoadingContainer: StoryObj<typeof LoadingContainer> = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!divRef.current) return;

      if (isLoading) {
        divRef.current.focus();
      }
    }, [isLoading]);

    return (
      <Group variant="vertical">
        <Button onClick={() => setIsLoading(!isLoading)} label="Toggle loading container" />
        <Container border="regular">
          <LoadingContainer isLoading={isLoading} tabIndex={0} ref={divRef}>
            <Card>This card has content that loaded</Card>
          </LoadingContainer>
        </Container>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
