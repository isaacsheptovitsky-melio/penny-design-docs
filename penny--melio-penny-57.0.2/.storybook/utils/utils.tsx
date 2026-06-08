import { StoryFn } from '@storybook/react-vite';
import isChromatic from 'chromatic/isChromatic';

export const getPreferredColorScheme = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof global === 'undefined') {
    return 'light';
  }

  // @ts-ignore
  if (!global?.matchMedia) return 'light';

  // @ts-ignore
  const isDarkThemePreferred = global.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkThemePreferred) return 'dark';

  return 'light';
};

// This is a decorator so we will be able to screenshot the outlines and shadows.
export const padStoryChromaticDecorator = (Story: StoryFn) =>
  isChromatic() ? (
    <div style={{ padding: '12px' }}>
      <Story />
    </div>
  ) : (
    <Story />
  );
