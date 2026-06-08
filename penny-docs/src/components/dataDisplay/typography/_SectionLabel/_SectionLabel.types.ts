import type { ReactNode } from 'react';

export const asOptions = ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'section'] as const;

export type AsType = (typeof asOptions)[number];

// Vendored-trimmed: the tooltip indicator subsystem (_IconIndicator -> Popover/StatusIconSolid)
// is not exercised by the Menu spine, so the tooltip prop type is inlined here.
type SectionLabelIndicatorTooltip = { content: ReactNode } & Record<string, unknown>;

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _SectionLabelProps = {
  label: string;
  as?: AsType;
  children?: ReactNode;
} & OneOrNone<{
  tooltipProps: SectionLabelIndicatorTooltip;
  isVerified: boolean;
}>;
