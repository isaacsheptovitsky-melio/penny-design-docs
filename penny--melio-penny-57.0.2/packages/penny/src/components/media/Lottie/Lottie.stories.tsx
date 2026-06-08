import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { getThemeColorKeys } from '@/theme/foundations/colors/utils';

import { lottieAnimation } from './__fixtures__/lottie';
import { getLottie as getLottieWithThemeColors } from './__fixtures__/lottie-with-theme-colors';
import { Lottie } from './Lottie';
import type { LottieProps, LottieRef } from './Lottie.types';

/**
 * This component helps you display Lottie animations.<br />
 * In order to get started - you need to supply an animation object or function that will return the Lottie animation.<br />
 */
const meta: Meta<LottieProps> = {
  title: 'Media Components/Lottie',
  component: Lottie,
  argTypes: {
    animation: {
      control: false,
      type: { required: true, name: 'symbol' },
      description:
        'The animation function for the Lottie animation.<br />This can be either the Lottie animation directly, or a function that returns the Lottie animation (used to allow overriding the colors with theme colors (see ["Override With Theme Colors"](#override-with-theme-colors) story).',
      table: {
        category: 'props',
        type: { summary: 'LottieObject | (...rest: number[][]) => LottieObject' },
      },
    },
    colors: {
      control: 'object',
      description:
        'Pass color names to be used in the Lottie.<br />This prop is relevant if you pass the Lottie animation as a function.<br />We use these colors to pass to the animation so it could override the colors.',
      table: {
        category: 'props',
        type: { summary: 'ThemeColorKey[]', detail: getUnionTypeSummary(Object.keys(getThemeColorKeys())) },
      },
    },
    height: {
      control: 'text',
      description: 'The height of the Lottie container',
      table: {
        category: 'props',
        defaultValue: { summary: '340px' },
        type: { summary: "CSSObject['height']" },
      },
    },
    width: {
      control: 'text',
      description: 'The width of the Lottie container',
      table: {
        category: 'props',
        defaultValue: { summary: '450px' },
        type: { summary: "CSSObject['width']" },
      },
    },
    loop: {
      control: 'boolean',
      description: 'Determines if the Lottie animation should loop.',
      table: {
        category: 'props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'lottie' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    animation: lottieAnimation,
    colors: undefined,
    loop: true,
    'data-testid': 'lottie',
  },
};
export default meta;

export const Main: StoryObj<LottieProps> = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * You can also override the colors of the Lottie with theme colors by supplying a list of color names to be passed to the Lottie animation function.<br />
 * For example - If you want `semantic.illustration.brand.primary` and `semantic.illustration.critical` to be used in the Lottie, just pass them in the `colors` prop.<br />
 * The Lottie animation also needs to be adjusted so it would pass the said colors to the correct location in the Lottie.
 *
 * ```tsx
 * const lottieGetter = (color1: number[], color2: number[]) => ({
 *   ... c: { a: 0, k: color1, ix: 3 },
 *   ...
 *   ... c: { a: 0, k: color2, ix: 4 },
 * })
 * ```
 *
 * Under the hood the `Lottie` component converts the theme color to be a `[r/255, g/255, b/255]` array, which is what Lottie uses for coloring.
 *
 * **TIP** - It's hard to find the places where the colors need to be replaced since the Lottie can be several hundreds of lines.
 * We suggest that the Lottie will mark the places of the colors with something that is easy to find and replace (e.g `color1`).
 *
 * Go ahead - Change the theme and see the magic happens.
 */
export const OverrideWithThemeColors: StoryObj<LottieProps> = {
  render: (args) => {
    const ref = useRef<LottieRef>(null);

    useEffect(() => {
      if (isUsingVisualTesting()) {
        ref.current?.stop();
      }
    }, [ref]);

    return (
      <Lottie
        {...args}
        animation={getLottieWithThemeColors}
        colors={['semantic.illustration.brand.primary', 'semantic.illustration.critical']}
        ref={ref}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * You can control the Lottie animation using a ref to the Lottie.<br />
 * Available actions are:<br />
 * `stop()` - Reset the Lottie into the first frame and stop it from running.<br />
 * `pause()` - Stop the Lottie at the frame it's currently in.<br />
 * `play()` - Start the Lottie animation.<br />
 */
export const ControlWithRef: StoryObj<LottieProps> = {
  render: (args) => {
    const ref = useRef<LottieRef>(null);

    const handlePlayClick = () => ref.current?.play();
    const handleStopClick = () => ref.current?.stop();
    const handlePauseClick = () => ref.current?.pause();

    return (
      <Group variant="vertical">
        <Group>
          <Button onClick={handlePlayClick} label="Play" />
          <Button onClick={handleStopClick} label="Stop" />
          <Button onClick={handlePauseClick} label="Pause" />
        </Group>
        <Lottie {...args} animation={lottieAnimation} ref={ref} />
      </Group>
    );
  },
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: { disableSnapshot: true },
  },
};
