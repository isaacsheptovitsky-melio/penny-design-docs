import { extendTheme as extendChakraTheme, theme as chakraTheme } from '@chakra-ui/react';

import { components } from './components';
import {
  fonts,
  getColorPalettes,
  getThemeRadiiFromTokens,
  shadows,
  sizes,
  textStyles,
  themeBreakpoints,
  themeSpaces,
  zIndices,
} from './foundations';
import { getThemeBordersFromTokens } from './foundations/borders/utils';
import { styles } from './styles';
import { type ThemeOptions } from './types';

const melioBaseTheme = {
  space: themeSpaces,
  breakpoints: themeBreakpoints,
  fonts,
  shadows,
  textStyles,
  styles,
  components,
  sizes,
  zIndices,
  config: { initialColorMode: 'light', useSystemColorMode: false, cssVarPrefix: 'penny' },
  direction: 'ltr',
  fontSizes: {},
  fontWeights: {},
  letterSpacings: {},
  lineHeights: {},
  transition: {},
} as const;

export const extendTheme = ({
  colors = {},
  borderRadii = {},
  borders = {},
  icons = {},
  ...theme
}: Omit<ThemeOptions, 'logos' | 'loader'>) => {
  // This here is a duplicated code from the ColorPalettesProvider until we remove Chakra.
  const colorPalettes = getColorPalettes(colors);
  const borderTokens = getThemeBordersFromTokens(borders);
  const radiiTokens = getThemeRadiiFromTokens(borderRadii);

  return extendChakraTheme(melioBaseTheme, theme, {
    ...melioBaseTheme,
    borders: borderTokens,
    icons,
    colors: colorPalettes,
    radii: radiiTokens,
    components: cleanChakraComponents(),
    config: {},
  });
};

// Because chakra has hard coded typography specific css attributes (suh as fontSize) inside some if it's components
// We need to override the whole theme for those components and remove the specific css attributes.
// Chakra doesn't provide a way to do this, but the workaround is to cheat it and make it think the base theme
// We provide in `extendTheme` is the complete chakra theme.
// See:
// https://github.com/chakra-ui/chakra-ui/blob/f9f532e54d5ac76233fb9a957999c36373a96c3c/packages/react/src/extend-theme.ts#L81
// https://github.com/chakra-ui/chakra-ui/blob/f9f532e54d5ac76233fb9a957999c36373a96c3c/packages/theme/src/utils.ts#L25-L33
const cleanChakraComponents = () => {
  const {
    Accordion,
    Form,
    Input,
    Select,
    Button,
    Heading,
    Tabs,
    Badge,
    Avatar,
    Tooltip,
    Table,
    Link,
    Modal,
    Drawer,
    ...chakraComponents
  } = chakraTheme.components;

  return {
    ...chakraComponents,
    Form: {
      ...Form,
      baseStyle: {
        ...Form.baseStyle,
        helperText: {},
      },
    },
    Modal: {
      ...Modal,
      baseStyle: (props: never) => ({
        ...(Modal.baseStyle?.(props) ?? {}),
        header: {}, // this is to remove the default style
        body: {}, // this is to remove the default style
        footer: {
          display: 'block',
        },
      }),
    },
    Drawer: {
      ...Drawer,
      baseStyle: (props: never) => ({
        ...(Drawer?.baseStyle?.(props) ?? {}),
        header: {}, // this is to remove the default style
      }),
    },
  };
};
