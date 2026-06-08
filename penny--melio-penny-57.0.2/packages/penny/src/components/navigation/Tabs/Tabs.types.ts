import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, RefObject } from 'react';

import type { CounterProps } from '@/components/dataDisplay/Counter';
import type { PillProps } from '@/components/dataDisplay/Pill';

export type TabItem = {
  name: string;
  /** Label of the tab. */
  label: string;
  /** The unique identifier for the tab element. */
  id?: string;
  /** Array of counter components to display on the tab. */
  counters?: CounterProps[];
  /** Array of pill components to display on the tab. */
  pills?: PillProps[];
  /** React ref for the tab element. */
  ref?: RefObject<HTMLDivElement>;
} & AriaAttributes;

/** The variant of the tabs. */
export type TabsVariant = 'default' | 'neutral';

export type TabsProps = {
  /** An array of TabItem props. Can be a responsive object. */
  tabs: TabItem[];
  /** The name of the tab currently active. */
  activeTab: string;
  /** An event for when the selected tab is changed. */
  onChange: (name: string) => void;
  /** The variant of the tabs. @default 'default' */
  variant?: TabsVariant;
  /** Determines if the tabs should evenly distribute within their container. */
  isFullWidth?: boolean;
} & TestIdProp &
  AriaAttributes;
