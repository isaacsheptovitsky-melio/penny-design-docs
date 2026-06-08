import { expect } from 'vitest';

import { getEndIndex, getNextEnabled, getPreviousEnabled, getStartIndex } from '../utils';

describe('utils', () => {
  const totalItems = 143;
  const pageSize = 50;

  describe('startIndex', () => {
    it('on 1st page startIndex should be 1', () => {
      const startIndex = getStartIndex(pageSize, 1, totalItems);

      expect(startIndex).toEqual(1);
    });

    it('on 2nd page startIndex should be 51', () => {
      const startIndex = getStartIndex(pageSize, 2, totalItems);

      expect(startIndex).toEqual(51);
    });

    it('on 3rd page startIndex should be 101', () => {
      const startIndex = getStartIndex(pageSize, 3, totalItems);

      expect(startIndex).toEqual(101);
    });
  });

  describe('endIndex', () => {
    it('on 1st page endIndex should be 50', () => {
      const endIndex = getEndIndex(pageSize, 1, totalItems);

      expect(endIndex).toEqual(50);
    });

    it('on 2nd page endIndex should be 100', () => {
      const endIndex = getEndIndex(pageSize, 2, totalItems);

      expect(endIndex).toEqual(100);
    });

    it('on 3rd page endIndex should be 143', () => {
      const endIndex = getEndIndex(pageSize, 3, totalItems);

      expect(endIndex).toEqual(143);
    });
  });

  describe('isPreviousEnabled', () => {
    it('on 1st page isPreviousEnabled should be false', () => {
      const isPreviousEnabled = getPreviousEnabled(1);

      expect(isPreviousEnabled).toEqual(false);
    });

    it('on 2nd page isPreviousEnabled should be true', () => {
      const isPreviousEnabled = getPreviousEnabled(2);

      expect(isPreviousEnabled).toEqual(true);
    });

    it('on 3rd page isPreviousEnabled should be true', () => {
      const isPreviousEnabled = getPreviousEnabled(3);

      expect(isPreviousEnabled).toEqual(true);
    });
  });

  describe('isNextEnabled', () => {
    it('on 1st page isNextEnabled should be true', () => {
      const isNextEnabled = getNextEnabled(1, totalItems, pageSize);

      expect(isNextEnabled).toEqual(true);
    });

    it('on 2nd page isNextEnabled should be true', () => {
      const isNextEnabled = getNextEnabled(2, totalItems, pageSize);

      expect(isNextEnabled).toEqual(true);
    });

    it('on 3rd page isNextEnabled should be false', () => {
      const isNextEnabled = getNextEnabled(3, totalItems, pageSize);

      expect(isNextEnabled).toEqual(false);
    });
  });
});
