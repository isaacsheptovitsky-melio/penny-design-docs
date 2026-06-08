import { type Option, type OptionWithSection, type Section } from '../BaseSelect.types';
import { type getOptionsGroupedBySection } from '../BaseSelect.utils';

export const options: Option<string>[] = [
  { label: 'Tel Aviv', value: 'Tel Aviv' },
  { label: 'Haifa', value: 'Haifa' },
  { label: 'Eilat', value: 'Eilat' },
  { label: 'Nahariyya', value: 'Nahariyya' },
  { label: 'Kefar Sava', value: 'Kefar Sava' },
  { label: 'Lod', value: 'Lod' },
];

export const sections: Section<string>[] = [
  {
    metadata: { label: 'Center' },
    options: [
      { label: 'Tel Aviv', value: 'Tel Aviv' },
      { label: 'Kefar Sava', value: 'Kefar Sava' },
      { label: 'Lod', value: 'Lod' },
    ],
  },
  {
    metadata: { label: 'North' },
    options: [
      { label: 'Haifa', value: 'Haifa' },
      { label: 'Nahariyya', value: 'Nahariyya' },
    ],
  },
  {
    metadata: { label: 'South' },
    options: [{ label: 'Eilat', value: 'Eilat' }],
  },
];

export const optionsWithSection: OptionWithSection<string>[] = [
  { label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } },
  { label: 'Haifa', value: 'Haifa', section: { label: 'North' } },
  { label: 'Eilat', value: 'Eilat', section: { label: 'South' } },
  { label: 'Nahariyya', value: 'Nahariyya', section: { label: 'North' } },
  { label: 'Kefar Sava', value: 'Kefar Sava', section: { label: 'Center' } },
  { label: 'Lod', value: 'Lod', section: { label: 'Center' } },
];

export const optionsBySection: ReturnType<typeof getOptionsGroupedBySection> = {
  Center: {
    section: {},
    options: [
      { index: 0, label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } },
      { index: 4, label: 'Kefar Sava', value: 'Kefar Sava', section: { label: 'Center' } },
      { index: 5, label: 'Lod', value: 'Lod', section: { label: 'Center' } },
    ],
  },
  North: {
    section: {},
    options: [
      { index: 1, label: 'Haifa', value: 'Haifa', section: { label: 'North' } },
      { index: 3, label: 'Nahariyya', value: 'Nahariyya', section: { label: 'North' } },
    ],
  },
  South: {
    section: {},
    options: [{ index: 2, label: 'Eilat', value: 'Eilat', section: { label: 'South' } }],
  },
};
