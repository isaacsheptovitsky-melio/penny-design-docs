import { getFlagsMap } from './assets/flags/flags.generated';
import { type IconsMap } from './icon.types';
import { getDefaultIconsMap } from './icons.generated';

export { getDefaultIconsMap };

export const getAllIcons = (cdnUrl: string): IconsMap => ({
  ...getDefaultIconsMap(cdnUrl),
  ...getFlagsMap(cdnUrl),
});
