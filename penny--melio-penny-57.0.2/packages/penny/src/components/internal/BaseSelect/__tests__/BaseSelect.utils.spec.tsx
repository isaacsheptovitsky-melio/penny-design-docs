import { expect } from 'vitest';

import { options, optionsBySection, optionsWithSection, sections } from '../__fixtures__/mock-data';
import { checkHasSections, getOptionsGroupedBySection, getOptionsWithSection } from '../BaseSelect.utils';

describe('BaseSelect - utils', () => {
  describe('checkHasSections', () => {
    it("returns true if one of the options has an 'options' key", () => {
      expect(checkHasSections(sections)).toBe(true);
    });

    it("returns false if none of the options has an 'options' key", () => {
      expect(checkHasSections(options)).toBe(false);
    });
  });

  describe('getOptionsGroupedBySection', () => {
    it('returns an object which keys are section titles and values are the corresponding section metadata and its options', () => {
      expect(getOptionsGroupedBySection(optionsWithSection)).toStrictEqual(optionsBySection);
    });
  });

  describe('getOptionsWithSection', () => {
    it("converts a list of sections into an options list with a 'section' key in each option", () => {
      expect(getOptionsWithSection(sections)).toStrictEqual([
        { label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } },
        { label: 'Kefar Sava', value: 'Kefar Sava', section: { label: 'Center' } },
        { label: 'Lod', value: 'Lod', section: { label: 'Center' } },
        { label: 'Haifa', value: 'Haifa', section: { label: 'North' } },
        { label: 'Nahariyya', value: 'Nahariyya', section: { label: 'North' } },
        { label: 'Eilat', value: 'Eilat', section: { label: 'South' } },
      ]);
    });
  });
});
