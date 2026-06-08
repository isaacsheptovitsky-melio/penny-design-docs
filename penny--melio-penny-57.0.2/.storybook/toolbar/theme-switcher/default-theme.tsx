import { ThemeOptions } from '../../../packages/penny/src/theme/types';
import { MelioLogo, MelioLogoDark } from '../../themes/melio/logos';

export const defaultTheme: ThemeOptions = {
  logos: {
    dark: MelioLogoDark,
    light: MelioLogo,
  },
};
