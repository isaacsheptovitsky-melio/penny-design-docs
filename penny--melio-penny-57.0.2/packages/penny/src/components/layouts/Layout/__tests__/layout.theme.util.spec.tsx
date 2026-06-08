import { expect } from 'vitest';

import type { InternalCSSObject } from '@/theme/types';

import { getContentPadding } from '../layout.theme.utils';

describe('Layout Theme Util', () => {
  describe('getContentPadding', () => {
    it('returns padding object when paddingContent is a string', () => {
      expect(getContentPadding('s')).toEqual({ padding: '16px' });
    });

    it('returns default padding object when paddingContent is undefined', () => {
      expect(getContentPadding(undefined)).toEqual({
        padding: { xs: 's', m: 'm', l: 'l', xl: 'xxl' },
      });
    });

    it('returns padding object when paddingContent is an object', () => {
      const paddingObject = { xs: 'm', m: 'xs', l: 'xl', xl: 'l' } as InternalCSSObject['padding'];
      expect(getContentPadding(paddingObject)).toEqual({ padding: paddingObject });
    });
  });
});
