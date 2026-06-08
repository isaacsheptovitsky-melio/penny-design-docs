import { _Description } from './_Description';
import { _Label } from './_Label';
import { _MainLabel } from './_MainLabel';
import { _Paragraph } from './_Paragraph/_Paragraph';
import { _ParagraphList } from './_ParagraphList';
import { _SectionLabel } from './_SectionLabel';
import { updateDisplayName } from './utils';

export type {
  _DescriptionProps as DescriptionProps,
  _ParagraphListProps as ParagraphListProps,
  _ParagraphProps as ParagraphProps,
  _DescriptionProps as TypographyDescriptionProps,
  _LabelProps as TypographyLabelProps,
  _MainLabelProps as TypographyMainLabelProps,
  _SectionLabelProps as TypographySectionLabelProps,
} from './types';

export const Typography = {
  Description: updateDisplayName(_Description),
  Label: updateDisplayName(_Label),
  MainLabel: updateDisplayName(_MainLabel),
  Paragraph: updateDisplayName(_Paragraph),
  ParagraphList: updateDisplayName(_ParagraphList),
  SectionLabel: updateDisplayName(_SectionLabel),
};
