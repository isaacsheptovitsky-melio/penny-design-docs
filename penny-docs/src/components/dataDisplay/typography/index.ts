import { _SectionLabel } from './_SectionLabel';
import { updateDisplayName } from './utils';

// Vendored-trimmed: only `SectionLabel` is in the Menu spine (used by _MenuTitle).
// The Description/Label/MainLabel/Paragraph/ParagraphList members were dropped to avoid
// pulling in NakedButton/Link/_IconIndicator/StatusIconSolid/_BaseIcon.
export type { _SectionLabelProps as TypographySectionLabelProps } from './_SectionLabel/_SectionLabel.types';

export const Typography = {
  SectionLabel: updateDisplayName(_SectionLabel),
};
