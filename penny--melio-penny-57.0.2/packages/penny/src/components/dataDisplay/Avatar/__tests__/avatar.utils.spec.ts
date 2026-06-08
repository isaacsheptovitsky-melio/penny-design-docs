import { expect } from 'vitest';

import { getAvatarInitials } from '../avatar.utils';

describe('Avatar Component - utils', () => {
  describe('getAvatarInitials', () => {
    it('works as expected', () => {
      expect(getAvatarInitials('Nina Tomeii')).toBe('NT');
      expect(getAvatarInitials('nina tomeii')).toBe('NT');
      expect(getAvatarInitials('Eden Ben-Zaken')).toBe('EB');
      expect(getAvatarInitials('Madonna')).toBe('M');
      expect(getAvatarInitials('Capital 1')).toBe('C1');
      expect(getAvatarInitials('Nina !@#$%^&*().,-Tomeii')).toBe('NT');
      expect(getAvatarInitials('Eden Ben-Zaken', true)).toBe('E');
    });
  });
});
