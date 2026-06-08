import type { AriaAttributes as ReactAriaAttributes } from 'react';

export type TestKitProps = {
  dataTestId?: string;
};

export type AriaAttributes = keyof ReactAriaAttributes;
