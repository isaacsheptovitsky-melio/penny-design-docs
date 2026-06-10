import { Box } from '@chakra-ui/react';
import { forwardRef, type HTMLAttributes } from 'react';

import announceRaw from '@/assets/illustrations/announce.svg?raw';
import approveRaw from '@/assets/illustrations/approve.svg?raw';
import bankSuccessRaw from '@/assets/illustrations/bank-success.svg?raw';
import celebrationRaw from '@/assets/illustrations/celebration.svg?raw';
import errorRaw from '@/assets/illustrations/error.svg?raw';
import newEmailRaw from '@/assets/illustrations/new-email.svg?raw';

/**
 * Docs reimplementation of Penny's `Illustration`.
 *
 * The real component pulls SVGs through `useIllustrations` → `ConfigProvider` →
 * `react-inlinesvg` (not installed here), so — like `Icon` and `StatusIconSolid` — this
 * version inlines the raw SVG directly and resolves the `penny-illustration-*` color classes
 * to their token hex values (see penny-assets `styles/illustrations.css`). Add more `type`s by
 * importing their `?raw` SVG and extending `SOURCES`.
 */
export type IllustrationType =
  | 'new-email'
  | 'announce'
  | 'celebration'
  | 'error'
  | 'approve'
  | 'bank-success';
export type IllustrationSize = 'small' | 'medium' | 'large';

export type IllustrationProps = {
  type: IllustrationType;
  size?: IllustrationSize;
} & HTMLAttributes<HTMLSpanElement>;

const SOURCES: Record<IllustrationType, string> = {
  'new-email': newEmailRaw,
  announce: announceRaw,
  celebration: celebrationRaw,
  error: errorRaw,
  approve: approveRaw,
  'bank-success': bankSuccessRaw,
};

const SIZE_PX: Record<IllustrationSize, number> = {
  small: 96,
  medium: 120,
  large: 144,
};

// Resolved semantic.illustration.* token values (penny-assets styles/illustrations.css)
const ILLUSTRATION_FILLS = {
  '& svg': { width: '100%', height: '100%', display: 'block' },
  '& .penny-illustration-border': { fill: '#18191b' },
  '& .penny-illustration-background': { fill: '#ffffff' },
  '& .penny-illustration-success': { fill: '#028838' },
  '& .penny-illustration-critical': { fill: '#d80e25' },
  '& .penny-illustration-brand-secondary': { fill: '#f6f2fd' },
  '& .penny-illustration-brand-primary': { fill: '#7849ff' },
  '& .penny-illustration-stroke-border': { stroke: '#18191b' },
  '& .penny-illustration-stroke-background': { stroke: '#ffffff' },
  '& .penny-illustration-stroke-success': { stroke: '#028838' },
  '& .penny-illustration-stroke-critical': { stroke: '#d80e25' },
  '& .penny-illustration-stroke-brand-secondary': { stroke: '#f6f2fd' },
  '& .penny-illustration-stroke-brand-primary': { stroke: '#7849ff' },
} as const;

export const Illustration = forwardRef<HTMLSpanElement, IllustrationProps>(
  ({ type, size = 'medium', ...props }, ref) => {
    const px = SIZE_PX[size];

    return (
      <Box
        as="span"
        ref={ref}
        data-component="Illustration"
        display="inline-flex"
        flexShrink={0}
        width={`${px}px`}
        height={`${px}px`}
        __css={ILLUSTRATION_FILLS}
        dangerouslySetInnerHTML={{ __html: SOURCES[type] }}
        {...props}
      />
    );
  }
);

Illustration.displayName = 'Illustration';
