/**
 * @melio/penny-assets
 * This package is for Storybook documentation only
 * Design System Assets Package - Icons, Brands, Illustrations, and Flags
 * This package provides versioned access to Melio's design system assets.
 */

export {};

export const PENNY_ASSETS_VERSION = process.env['npm_package_version'] || '0.1.0';

// Asset base paths for S3 integration
export const getAssetPath = (category: string, version = PENNY_ASSETS_VERSION): string =>
  `assets/${version}/${category}`;
