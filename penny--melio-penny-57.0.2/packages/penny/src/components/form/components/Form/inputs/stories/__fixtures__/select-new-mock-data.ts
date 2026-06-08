import {
  cities as _cities,
  citiesByRegion as _citiesByRegion,
} from '@/components/selectionAndInputs/SelectNew/__fixtures__/mock-data';

import { type FormSelectNewOption, type FormSelectNewSection } from '../../types';

export type City = FormSelectNewOption<string> & { description: string };

export const cities: City[] = _cities;

type Region = FormSelectNewSection<string, City>;

export const citiesByRegion: Region[] = _citiesByRegion;
