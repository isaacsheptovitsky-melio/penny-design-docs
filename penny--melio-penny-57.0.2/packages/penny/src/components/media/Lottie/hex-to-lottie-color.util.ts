/**
 * Convert hex colors to an array of [r/255, g/255, b/255] as used in Lottie animations.
 */
export const hexToLottieColor = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newHex = hex.replace(shorthandRegex, (_, r: string, g: string, b: string) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [parseInt(result![1]!, 16) / 255, parseInt(result![2]!, 16) / 255, parseInt(result![3]!, 16) / 255];
};
