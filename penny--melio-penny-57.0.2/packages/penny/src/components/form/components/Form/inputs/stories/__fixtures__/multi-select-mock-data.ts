import {
  cities as _cities,
  citiesByRegion as _citiesByRegion,
} from '@/components/selectionAndInputs/MultiSelect/__fixtures__/mock-data';

import { type FormMultiSelectOption, type FormMultiSelectSection } from '../../types';

export type City = FormMultiSelectOption<string> & { description: string };

export const cities: City[] = _cities;

type Region = FormMultiSelectSection<string, City>;

export const citiesByRegion: Region[] = _citiesByRegion;
