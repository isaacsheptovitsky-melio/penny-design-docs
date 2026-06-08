import { Storybook } from 'storybook-utils';

import { useTheme } from '../../../hooks';
import { type FontKey } from '../../fonts';

export const FontFamily = ({ fontKey }: { fontKey: FontKey }) => {
  const { fonts } = useTheme();

  return <Storybook.Code label={fonts[fontKey]} />;
};
