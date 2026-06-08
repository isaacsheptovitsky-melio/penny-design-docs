import type { TestIdProp } from '@melio/penny-utils';

import { type IconProps } from '../../../foundations/Icon';
import { type _ParagraphProps } from '../_Paragraph';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _ParagraphListProps = {
  size?: 'small' | 'large';
} & ({ type: 'ordered'; list: _OrderedParagraphProps[] } | { type: 'unordered'; list: _UnorderedParagraphProps[] }) &
  TestIdProp;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _BaseParagraphProps = Pick<_ParagraphProps, 'content' | 'title'>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _OrderedParagraphProps = _BaseParagraphProps & { icon?: never };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _UnorderedParagraphProps = _BaseParagraphProps & { icon?: IconProps['type'] };
