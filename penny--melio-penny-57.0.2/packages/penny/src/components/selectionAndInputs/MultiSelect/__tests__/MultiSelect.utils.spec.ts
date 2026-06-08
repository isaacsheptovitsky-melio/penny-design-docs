import { expect } from 'vitest';

import { cities, citiesByRegion } from '../__fixtures__/mock-data';
import { type MultiSelectOption, type MultiSelectSection } from '../MultiSelect.types';
import { checkHasSections, getFlatIndex, getFlatOptions } from '../MultiSelect.utils';

describe('MultiSelect - utils', () => {
  describe('checkHasSections', () => {
    it('should return true if options include sections and false otherwise', () => {
      expect(checkHasSections(cities)).toBe(false);
      expect(checkHasSections(citiesByRegion)).toBe(true);
    });
  });

  describe('getFlatOptions', () => {
    it('should return a flat array of options', () => {
      expect(getFlatOptions(cities)).toStrictEqual(cities);
      expect(getFlatOptions(citiesByRegion)).toStrictEqual([
        { label: 'Boston', value: 'boston', description: 'Population: 692,600' },
        { label: 'Buffalo', value: 'buffalo', description: 'Population: 255,284' },
        { label: 'Jersey City', value: 'jersey_city', description: 'Population: 265,549' },
        { label: 'New York', value: 'new_york', description: 'Population: 8,336,817' },
        { label: 'Newark', value: 'newark', description: 'Population: 282,011' },
        { label: 'Philadelphia', value: 'philadelphia', description: 'Population: 1,584,064' },
        { label: 'Pittsburgh', value: 'pittsburgh', description: 'Population: 300,286' },
        { label: 'Atlanta', value: 'atlanta', description: 'Population: 488,800' },
        { label: 'Charlotte', value: 'charlotte', description: 'Population: 885,708' },
        { label: 'Miami', value: 'miami', description: 'Population: 467,963' },
        { label: 'Nashville', value: 'nashville', description: 'Population: 670,820' },
        { label: 'Richmond', value: 'richmond', description: 'Population: 230,436' },
        { label: 'Tampa', value: 'tampa', description: 'Population: 399,700' },
        { label: 'Virginia Beach', value: 'virginia_beach', description: 'Population: 449,974' },
        { label: 'Chicago', value: 'chicago', description: 'Population: 2,693,976' },
        { label: 'Columbus', value: 'columbus', description: 'Population: 898,553' },
        { label: 'Detroit', value: 'detroit', description: 'Population: 670,031' },
        { label: 'Indianapolis', value: 'indianapolis', description: 'Population: 876,384' },
        { label: 'Kansas City', value: 'kansas_city', description: 'Population: 495,327' },
        { label: 'Milwaukee', value: 'milwaukee', description: 'Population: 590,157' },
        { label: 'Minneapolis', value: 'minneapolis', description: 'Population: 429,606' },
        { label: 'Denver', value: 'denver', description: 'Population: 727,211' },
        { label: 'Las Vegas', value: 'las_vegas', description: 'Population: 651,319' },
        { label: 'Los Angeles', value: 'los_angeles', description: 'Population: 3,979,576' },
        { label: 'Phoenix', value: 'phoenix', description: 'Population: 1,680,992' },
        { label: 'Portland', value: 'portland', description: 'Population: 654,741' },
        { label: 'San Francisco', value: 'san_francisco', description: 'Population: 881,549' },
        { label: 'Seattle', value: 'seattle', description: 'Population: 753,675' },
        { label: 'Albuquerque', value: 'albuquerque', description: 'Population: 560,513' },
        { label: 'Austin', value: 'austin', description: 'Population: 978,908' },
        { label: 'Dallas', value: 'dallas', description: 'Population: 1,343,573' },
        { label: 'El Paso', value: 'el_paso', description: 'Population: 681,728' },
        { label: 'Houston', value: 'houston', description: 'Population: 2,320,268' },
        {
          label: 'San Antonio',
          value: 'san_antonio',
          description: 'Population: 1,547,253',
          disabled: true,
        },
        { label: 'Tucson', value: 'tucson', description: 'Population: 548,073' },
      ]);
    });
  });

  describe('getFlatIndex', () => {
    it('should return the flat index of an option within a sectioned options array', () => {
      const sectionedOptions: MultiSelectSection<string, MultiSelectOption<string>>[] = [
        {
          label: 'Section 1',
          options: [
            { label: 'Option 1', value: 'option_1' },
            { label: 'Option 2', value: 'option_2' },
          ],
        },
        {
          label: 'Section 2',
          options: [
            { label: 'Option 3', value: 'option_3' },
            { label: 'Option 4', value: 'option_4' },
          ],
        },
        {
          label: 'Section 3',
          options: [
            { label: 'Option 5', value: 'option_5' },
            { label: 'Option 6', value: 'option_6' },
          ],
        },
      ];

      expect(getFlatIndex(sectionedOptions, 0, 0)).toBe(0);
      expect(getFlatIndex(sectionedOptions, 0, 1)).toBe(1);
      expect(getFlatIndex(sectionedOptions, 1, 0)).toBe(2);
      expect(getFlatIndex(sectionedOptions, 1, 1)).toBe(3);
      expect(getFlatIndex(sectionedOptions, 2, 0)).toBe(4);
      expect(getFlatIndex(sectionedOptions, 2, 1)).toBe(5);
    });
  });
});
