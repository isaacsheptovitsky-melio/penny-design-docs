import { expect } from 'vitest';

import { hexToLottieColor } from '../hex-to-lottie-color.util';

describe('Hex to Lottie color', () => {
  it('returns a Lottie color upon receiving a hex value', () => {
    const color = '#FFAA22';
    const lottieColor = [255 / 255, 170 / 255, 34 / 255];

    expect(hexToLottieColor(color)).toEqual(lottieColor);
  });
});
