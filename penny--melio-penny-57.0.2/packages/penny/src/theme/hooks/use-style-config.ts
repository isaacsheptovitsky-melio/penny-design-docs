import { useMultiStyleConfig as _useMultiStyleConfig, useStyleConfig as _useStyleConfig } from '@chakra-ui/react';

import type { MultiStyleComponentKey, SingleStyleComponentKey } from '../component-keys';

export function useStyleConfig<K extends SingleStyleComponentKey | (string & {})>(themeKey: K, props?: unknown) {
  return _useStyleConfig(themeKey, props as never);
}

export function useMultiStyleConfig<K extends MultiStyleComponentKey | (string & {})>(themeKey: K, props: unknown) {
  return _useMultiStyleConfig(themeKey, props as never);
}
