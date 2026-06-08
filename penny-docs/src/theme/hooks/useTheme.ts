import { useTheme as useChakraTheme } from '@chakra-ui/react';

import { type ThemeBorderRadii } from '../foundations/borderRadii/types';
import { type ThemeBorders } from '../foundations/borders/types';
import { type Theme } from '../types';

type ChakraTheme = Omit<Theme, 'borderRadii'> & { radii: ThemeBorderRadii; borders: ThemeBorders };

export const useTheme = (): Theme => {
  const { colors, radii, textStyles, fonts, borders } = useChakraTheme<ChakraTheme>();

  return {
    borderRadii: radii,
    colors,
    textStyles,
    fonts,
    borders,
  };
};
