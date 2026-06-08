import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { BrandSymbol } from '../BrandSymbol';
import type { BrandSymbolProps } from '../BrandSymbol.types';

validateComponent<BrandSymbolProps>(BrandSymbol, 'BrandSymbol', {
  props: { type: 'google' },
  defaultDataTestId: 'brand-symbol',
});
