import { type TypographyProps } from '@chakra-ui/react';
import { type InputHTMLAttributes } from 'react';

import { type ThemeColorKey } from '../theme/foundations/colors/types';
import { type TextStyleKey } from '../theme/foundations/text-styles';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _BaseInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'autoFocus' | 'onKeyDown' | 'onKeyUp' | 'onChange' | 'onFocus' | 'onBlur' | 'placeholder' | 'value'
>;

export type ThemeProps = {
  textStyle?: TextStyleKey;

  color?: ThemeColorKey | (string & {});

  /** @deprecated use textStyle instead */
  fontSize?: TypographyProps['fontSize'];
  /** @deprecated use textStyle instead */
  lineHeight?: TypographyProps['lineHeight'];
  /** @deprecated use textStyle instead */
  fontWeight?: TypographyProps['fontWeight'];
  /** @deprecated use textStyle instead */
  fontFamily?: TypographyProps['fontFamily'];
  /** @deprecated use textStyle instead */
  letterSpacing?: TypographyProps['letterSpacing'];
};
