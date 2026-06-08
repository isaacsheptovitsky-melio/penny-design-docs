import { type AllIconKey, type IconSize, type IconType, type ThemeIconBySizes } from '../icons/icon.types';
import { useIcons } from './useIcons';

function isIconBySizes(icon?: ThemeIconBySizes | IconType | string): icon is ThemeIconBySizes {
  return typeof icon !== 'string' && !!icon && 'small' in icon && 'medium' in icon;
}

export const useIconAsset = (type: AllIconKey, size: IconSize): IconType | string => {
  const icons = useIcons();

  const getIconSize = () => {
    switch (size) {
      case 'medium':
      case 'large':
      case 'extra-large':
        return 'medium';
      default:
        return 'small';
    }
  };

  const iconSize = getIconSize();

  const icon: IconType = isIconBySizes(icons[type]) ? (icons[type] as ThemeIconBySizes)[iconSize] : icons[type];

  return icon;
};
