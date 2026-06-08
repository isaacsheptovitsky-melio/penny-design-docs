export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator?.userAgent) &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !(window as Window & typeof globalThis & { MSStream?: any }).MSStream;
