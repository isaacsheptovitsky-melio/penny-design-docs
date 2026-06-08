/* eslint-disable @typescript-eslint/no-deprecated */
import { uniqueId } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';

import { Toast } from './Toast';
import type { ToastProps } from './Toast.types';
import { useToast, type UseToastOptions } from './useToast';

/**
 * This component is **deprecated** since it's not accessible. Please use [SectionBanner](?path=/docs/data-display-components-section-banner--docs).
 */
const meta: Meta<typeof Toast> = {
  title: 'Feedback Components/Toast [deprecated]',
  component: Toast,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: { delay: 300 },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The text of the toast.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    type: {
      control: 'select',
      options: ['informative', 'success', 'error'],
      type: { required: true, name: 'string' },
      description: 'The type of the toast.',
      table: { type: { summary: 'informative | success | error' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'toast' }, type: { summary: 'string' }, category: 'tests' },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    duration: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Duration of the toast in milliseconds. Default is to stay until closed.',
      table: { defaultValue: { summary: 'null' }, type: { summary: 'number' }, category: 'props' },
    },
    actionType: {
      control: 'select',
      options: ['button', 'link'],
      description: 'Determines if the action is a button or a link.',
      table: { type: { summary: 'button | link' }, category: 'props' },
    },
    actionText: {
      control: 'text',
      description: 'Will display an action with the given text.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onAction: {
      control: false,
      description: 'What will happen when clicking on the action.<br />**Relevant if `actionText` is defined.**',
      table: { type: { summary: "(close: RenderProps['onClose']): void;" }, category: 'events' },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description:
        "The `aria-label` of the close button of the toast. The default equals 'Close toast {TITLE}' when the title is a string otherwise it's 'Close toast'.",
      table: { type: { summary: 'string' }, category: 'accessibility', defaultValue: { summary: 'Close toast' } },
    },
  },
  args: {
    title: 'Wow!',
    type: 'informative',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    duration: null,
    'data-testid': 'toast',
  },
};
export default meta;

/**
 * In order to override the default `id` of each toast please see the following code example:
 */
export const Main: StoryObj<typeof Toast> = {
  render: ({ actionText, onAction, ...restArgs }: ToastProps) => {
    const { toast } = useToast();
    const toastOptions = {
      action: {
        type: 'button' as NonNullable<ToastProps['actionType']>,
        text: actionText as string,
        onAction: onAction as NonNullable<typeof onAction>,
      },
      ...restArgs,
      // id: uniqueId('toast-'), <-- Do not override the default id here as it messes with the toast's functionality.
    };

    if (isUsingVisualTesting()) {
      toast(toastOptions);

      return <></>;
    }

    return (
      <Button
        onClick={() =>
          toast({
            ...toastOptions,
            id: uniqueId('toast-'), // <-- Override the default id here.
          })
        }
        label="Do it"
      />
    );
  },
};

export const Info: StoryObj = {
  render: (args) => {
    const { toast } = useToast();
    const props = { ...args, type: 'informative', title: 'Okay' } as UseToastOptions;

    if (isUsingVisualTesting()) {
      toast(props);

      return <></>;
    }

    return <Button onClick={() => toast(props)} label="Do it" />;
  },
};

export const Success: StoryObj = {
  render: (args) => {
    const { toast } = useToast();
    const props = { ...args, type: 'success', title: 'Hooray!' } as UseToastOptions;

    if (isUsingVisualTesting()) {
      toast(props);

      return <></>;
    }

    return <Button onClick={() => toast(props)} label="Do it" />;
  },
};

export const Error: StoryObj = {
  render: (args) => {
    const { toast } = useToast();
    const props = { ...args, type: 'error', title: 'Gah!' } as UseToastOptions;

    if (isUsingVisualTesting()) {
      toast(props);

      return <></>;
    }

    return <Button onClick={() => toast(props)} label="Do it" />;
  },
};

export const WithButtonAction: StoryObj = {
  render: () => {
    const { toast } = useToast();
    const props = {
      title: 'Done',
      type: 'informative',
      action: { text: 'Undo', onAction: (closeToast) => closeToast() },
    } as UseToastOptions;

    if (isUsingVisualTesting()) {
      toast(props);

      return <></>;
    }

    return (
      <Group>
        <Button onClick={() => toast(props)} label="Informative" />
        <Button onClick={() => toast({ ...props, type: 'success' })} label="Success" variant="success" />
        <Button onClick={() => toast({ ...props, type: 'error' })} label="Error" variant="critical" />
      </Group>
    );
  },
};

export const WithLinkAction: StoryObj = {
  render: () => {
    const { toast } = useToast();
    const props = {
      title: 'Done',
      type: 'informative',
      action: { type: 'link', text: 'Undo', onAction: (closeToast) => closeToast() },
    } as UseToastOptions;

    if (isUsingVisualTesting()) {
      toast(props);

      return <></>;
    }

    return (
      <Group>
        <Button onClick={() => toast(props)} label="Informative" />
        <Button onClick={() => toast({ ...props, type: 'success' })} label="Success" variant="success" />
        <Button onClick={() => toast({ ...props, type: 'error' })} label="Error" variant="critical" />
      </Group>
    );
  },
};

/**
 * Since the toasts now don't close by themselves after a duration of time - you can close the toast programmatically.
 * This is useful if the toasts should be closed when the user is directed to another route.
 */
export const CloseToastProgrammatically: StoryObj = {
  render: () => {
    const { toast, closeToast } = useToast();
    const props = {
      title: 'Done',
      type: 'informative',
      action: { type: 'link', text: 'Undo', onAction: (closeToast) => closeToast() },
    } as UseToastOptions;

    return (
      <Group>
        <Button onClick={() => toast(props)} label="Open toast" />
        <Button onClick={() => closeToast()} label="Close toast" />
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports([Main, WithButtonAction], ['xs', 'xl']);
