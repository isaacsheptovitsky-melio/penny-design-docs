import { Icon } from '@/components/foundations/Icon';
import { getBrandSymbolsMap } from '@/theme/icons/brandSymbol.generated';
import { getDefaultIconsMap } from '@/theme/icons/icons';

import type { SearchOption, SearchSection } from '../Search.types';

export const cities: SearchOption[] = [
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

export const citiesWithSections: SearchSection[] = [
  {
    metadata: { label: 'Center', icon: 'verified' },
    options: [
      {
        label: 'Tel Aviv',
        value: 'tel_aviv',
        description: 'Population: 436,000',
      },
      {
        label: 'Kefar Sava',
        value: 'kefar_sava',
        description: 'Population: 110,500',
      },
      {
        label: 'Lod',
        value: 'lod',
        description: 'Population: 76,000',
      },
      {
        label: 'Yavne',
        value: 'yavne',
        description: 'Population: 47,000',
      },
    ],
  },
  {
    metadata: { label: 'North' },
    options: [
      {
        label: 'Haifa',
        value: 'haifa',
        description: 'Population: 280,000',
      },
      {
        label: 'Nahariyya',
        value: 'nahariyya',
        description: 'Population: 58,000',
      },
      {
        label: 'Acre',
        value: 'acre',
        description: 'Population: 49,000',
      },
      {
        label: 'Tiberias',
        value: 'tiberias',
        description: 'Population: 45,000',
      },
    ],
  },
  {
    metadata: { label: 'South' },
    options: [
      {
        label: 'Eilat',
        value: 'eilat',
        description: 'Population: 52,000',
      },
      {
        label: 'Netivot',
        value: 'netivot',
        description: 'Population: 37,500',
      },
    ],
  },

  {
    metadata: { label: 'Outer space' },
    options: [
      {
        label: 'Mars City',
        value: 'mars_city',
        description: 'Population: ?',
      },
    ],
  },
];

export const citiesWithAvatars = cities.map((city, i) => ({
  ...city,
  avatarProps: {
    name: city.label,
    ...(i % 2 === 0 && { badge: <Icon type="verified" size="extra-small" color="brand" /> }),
  },
})) as SearchOption[];

export const citiesWithSectionsAvatarsDescription = citiesWithSections.map((city) => ({
  ...city,
  options: city.options.map((option) => ({ ...option, avatarProps: { name: option.label } })),
})) as SearchSection[];

export const citiesWithSectionsAndAvatars = citiesWithSections.map((city) => ({
  ...city,
  options: city.options.map((option) => ({ ...option, avatarProps: { name: option.label } })),
})) as SearchSection[];

export const citiesWithSectionsAvatarsAndVerifiedIcon: SearchSection[] = [
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
})) as SearchOption[];

export const citiesWithRightIcons = cities.map((city, i) => ({
  ...city,
  rightIcon: Object.keys(getDefaultIconsMap(''))[i],
})) as SearchOption[];
