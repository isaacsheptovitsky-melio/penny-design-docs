import { validateComponent } from '@/test-utils/__tests__/component.validation';
import type { ThemeLogos } from '@/theme/foundations/logos';
import { PennyProvider } from '@/theme/providers/PennyProvider';

import { Logo } from '../Logo';

const themeLogos: ThemeLogos = {
  light: () => <></>,
  dark: () => <></>,
};

validateComponent(Logo, 'Logo', {
  props: { type: 'light' },
  wrapper: (props) => <PennyProvider {...props} theme={{ logos: themeLogos }} />,
});
