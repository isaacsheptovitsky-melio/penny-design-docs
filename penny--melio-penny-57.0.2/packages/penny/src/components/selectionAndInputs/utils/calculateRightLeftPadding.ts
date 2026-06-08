import { themeSpaces } from '@/theme';

import { type TextFieldProps } from '../TextField';

export function calculateRightLeftPadding({
  leftElementWidth,
  rightElementWidth,
  align,
}: {
  leftElementWidth?: number | null;
  rightElementWidth?: number | null;
  align?: TextFieldProps['align'];
}) {
  const paddingLeft = leftElementWidth ? `${leftElementWidth}px` : align !== 'end' ? 's' : 'none';
  const paddingRight = rightElementWidth
    ? `calc(${rightElementWidth}px + ${themeSpaces.s})`
    : align === 'end'
      ? 's'
      : 'none';

  return { paddingLeft, paddingRight };
}
