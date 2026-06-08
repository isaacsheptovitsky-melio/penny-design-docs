/* eslint-disable @typescript-eslint/no-deprecated */
import { Icon } from '@/components/foundations/Icon';
import { getBrandSymbolsMap, getDefaultIconsMap } from '@/theme/icons';

import type { SelectOption, SelectSection } from '../Select.types';

export const cities: SelectOption[] = [
  {
    label: 'Tel Aviv',
    value: 'Tel Aviv',
  },
  { label: 'Haifa', value: 'Haifa' },
  { label: 'Eilat', value: 'Eilat' },
  { label: 'Nahariyya', value: 'Nahariyya' },
  { label: 'Kefar Sava', value: 'Kefar Sava' },
  { label: 'Lod', value: 'Lod' },
  { label: 'Yavne', value: 'Yavne' },
  { label: 'Acre', value: 'Acre' },
  { label: 'Tiberias', value: 'Tiberias' },
  { label: 'Netivot', value: 'Netivot' },
  { label: 'Mars City', value: 'Mars City' },
];

export const citiesWithSections: SelectSection[] = [
  {
    metadata: { label: 'Center', icon: 'verified' },
    options: [
      {
        label: 'Tel Aviv',
        value: 'Tel Aviv',
      },
      { label: 'Kefar Sava', value: 'Kefar Sava' },
      { label: 'Lod', value: 'Lod' },
      { label: 'Yavne', value: 'Yavne' },
    ],
  },
  {
    metadata: { label: 'North' },
    options: [
      { label: 'Haifa', value: 'Haifa' },
      {
        label: 'Nahariyya',
        value: 'Nahariyya',
      },
      { label: 'Acre', value: 'Acre' },
      { label: 'Tiberias', value: 'Tiberias' },
    ],
  },
  {
    metadata: { label: 'South' },
    options: [
      {
        label: 'Eilat',
        value: 'Eilat',
      },
      {
        label: 'Netivot',
        value: 'Netivot',
      },
    ],
  },
  {
    metadata: { label: 'Outer space' },
    options: [
      {
        label: 'Mars City',
        value: 'Mars City',
      },
    ],
  },
];

export const citiesWithSectionsAndDescriptions: SelectSection[] = [
  {
    metadata: { label: 'Center', icon: 'verified' },
    options: [
      {
        label: 'Tel Aviv',
        value: 'Tel Aviv',
        description: 'Population: 436,000',
      },
      { label: 'Kefar Sava', value: 'Kefar Sava', description: 'Population: 110,500' },
      { label: 'Lod', value: 'Lod', description: 'Population: 76,000' },
      { label: 'Yavne', value: 'Yavne', description: 'Population: 47,000' },
    ],
  },
  {
    metadata: { label: 'North' },
    options: [
      { label: 'Haifa', value: 'Haifa', description: 'Population: 280,000' },
      {
        label: 'Nahariyya',
        value: 'Nahariyya',
        description: 'Population: 58,000',
      },
      { label: 'Acre', value: 'Acre', description: 'Population: 49,000' },
      { label: 'Tiberias', value: 'Tiberias', description: 'Population: 45,000' },
    ],
  },
  {
    metadata: { label: 'South' },
    options: [
      {
        label: 'Eilat',
        value: 'Eilat',
        description: 'Population: 52,000',
      },
      {
        label: 'Netivot',
        value: 'Netivot',
        description: 'Population: 37,500',
      },
    ],
  },
  {
    metadata: { label: 'Outer space' },
    options: [
      {
        label: 'Mars City',
        value: 'Mars City',
        description: 'Population: ?',
      },
    ],
  },
];

export const citiesWithAvatars = cities.map((city) => ({
  ...city,
  avatarProps: { name: city.label },
})) as SelectOption[];

export const citiesWithSectionsAndAvatars = citiesWithSections.map((city) => ({
  ...city,
  options: city.options.map((option) => ({ ...option, avatarProps: { name: option.label } })),
})) as SelectSection[];

export const citiesWithSectionsAvatarsAndVerifiedIcon: SelectSection[] = [
  {
    metadata: { label: 'Center', icon: 'verified' },
    options: [
      {
        label: 'Tel Aviv',
        value: 'Tel Aviv',
        avatarProps: { name: 'Tel Aviv' },
      },
      { label: 'Kefar Sava', value: 'Kefar Sava', avatarProps: { name: 'Kefar Sava' } },
      { label: 'Lod', value: 'Lod', avatarProps: { name: 'Lod' } },
      { label: 'Yavne', value: 'Yavne', avatarProps: { name: 'Yavne' } },
    ],
  },
  {
    metadata: { label: 'North' },
    options: [
      { label: 'Haifa', value: 'Haifa', avatarProps: { name: 'Haifa' } },
      {
        label: 'Nahariyya',
        value: 'Nahariyya',
        avatarProps: { name: 'Nahariyya' },
      },
      { label: 'Acre', value: 'Acre', avatarProps: { name: 'Acre' } },
      { label: 'Tiberias', value: 'Tiberias', avatarProps: { name: 'Tiberias' } },
    ],
  },
  {
    metadata: { label: 'South' },
    options: [
      {
        label: 'Eilat',
        value: 'Eilat',
        avatarProps: { name: 'Eilat' },
      },
      {
        label: 'Netivot',
        value: 'Netivot',
        avatarProps: { name: 'Netivot', badge: <Icon type="verified" size="extra-small" color="brand" /> },
      },
    ],
  },
  {
    metadata: { label: 'Outer space' },
    options: [
      {
        label: 'Mars City',
        value: 'Mars City',
        avatarProps: { name: 'Mars City', badge: <Icon type="verified" size="extra-small" color="brand" /> },
      },
    ],
  },
];

export const citiesWithLeftIcons = cities.map((city, i) => ({
  ...city,
  leftIcon: Object.keys(getBrandSymbolsMap(''))[i],
})) as SelectOption[];

export const citiesWithRightIcons = cities.map((city, i) => ({
  ...city,
  rightIcon: Object.keys(getDefaultIconsMap(''))[i],
})) as SelectOption[];
