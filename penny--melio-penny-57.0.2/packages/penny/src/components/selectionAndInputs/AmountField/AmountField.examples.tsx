/* eslint-disable max-lines */
import { type Currency, isEqual } from '@melio/penny-utils';
import { useState } from 'react';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import {
  FloatingMenu,
  FloatingMenuDropdownList,
  FloatingMenuSelectionItem,
} from '@/components/containers/menus/FloatingMenu';
import { FlagIcon } from '@/components/dataDisplay/FlagIcon';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { isUsingVisualTesting } from '@/test-utils';
import { type FlagKey } from '@/theme';

import { AmountField } from './AmountField';
import { type AmountFieldProps } from './AmountField.types';
import { AmountFieldEndElement } from './EndElement';

export type CurrencyDetails = { label: string; flag: FlagKey; sign: string; currencyCode: Currency };

export type CurrencyDictionaryType = Record<Currency, CurrencyDetails>;
export const currencyDictionary: CurrencyDictionaryType = {
  AUD: {
    label: 'Australian dollar',
    flag: 'AU',
    sign: '$',
    currencyCode: 'AUD',
  },
  USD: {
    label: 'United States dollar',
    flag: 'US',
    sign: '$',
    currencyCode: 'USD',
  },
  EUR: {
    label: 'Eurozone Countries',
    flag: 'EU',
    sign: '€',
    currencyCode: 'EUR',
  },
  GBP: {
    label: 'British pounds',
    flag: 'GB',
    sign: '£',
    currencyCode: 'GBP',
  },
  INR: {
    label: 'Indian roupee',
    flag: 'IN',
    sign: '₹',
    currencyCode: 'INR',
  },
  CAD: {
    label: 'Canadian dollar',
    flag: 'CA',
    sign: '$',
    currencyCode: 'CAD',
  },
  SGD: {
    label: 'Singapore Dollar',
    flag: 'SG',
    sign: '$',
    currencyCode: 'SGD',
  },
  ILS: {
    label: 'Israeli New Sheqel',
    flag: 'IL',
    sign: '₪',
    currencyCode: 'ILS',
  },
  CHF: {
    label: 'Swiss Franc',
    flag: 'CH',
    sign: 'CHF',
    currencyCode: 'CHF',
  },
  CNY: {
    label: 'Chinese Yuan',
    flag: 'CN',
    sign: '¥',
    currencyCode: 'CNY',
  },
  HKD: {
    label: 'Hong Kong Dollar',
    flag: 'HK',
    sign: '$',
    currencyCode: 'HKD',
  },
  JPY: {
    label: 'Japanese Yen',
    flag: 'JP',
    sign: '¥',
    currencyCode: 'JPY',
  },
  MXN: {
    label: 'Mexican Peso',
    flag: 'MX',
    sign: '$',
    currencyCode: 'MXN',
  },
  NZD: {
    label: 'New Zealand Dollar',
    flag: 'NZ',
    sign: '$',
    currencyCode: 'NZD',
  },
  SEK: {
    label: 'Swedish Krona',
    flag: 'SE',
    sign: 'kr',
    currencyCode: 'SEK',
  },
  PLN: {
    label: 'Polish Złoty',
    flag: 'PL',
    sign: 'zł',
    currencyCode: 'PLN',
  },
  PHP: {
    label: 'Philippine Peso',
    flag: 'PH',
    sign: '₱',
    currencyCode: 'PHP',
  },
  BRL: {
    label: 'Brazilian Real',
    flag: 'BR',
    sign: 'R$',
    currencyCode: 'BRL',
  },
  GEL: {
    label: 'Georgian Lari',
    flag: 'GE',
    sign: '₾',
    currencyCode: 'GEL',
  },
  KRW: {
    label: 'South Korean Won',
    flag: 'KR',
    sign: '₩',
    currencyCode: 'KRW',
  },
  VND: {
    label: 'Vietnamese dong',
    flag: 'VN',
    sign: '₫',
    currencyCode: 'VND',
  },
  HUF: {
    label: 'Hungarian Forint',
    flag: 'HU',
    sign: 'Ft',
    currencyCode: 'HUF',
  },
  CZK: {
    label: 'Czech Koruna',
    flag: 'CZ',
    sign: 'Kč',
    currencyCode: 'CZK',
  },
  DKK: {
    label: 'Danish Krone',
    flag: 'DK',
    sign: 'kr.',
    currencyCode: 'DKK',
  },
  NOK: {
    label: 'Norwegian Krone',
    flag: 'NO',
    sign: 'kr',
    currencyCode: 'NOK',
  },
  JOD: {
    label: 'Jordanian Dinar',
    flag: 'JO',
    sign: 'JD',
    currencyCode: 'JOD',
  },
};

export const defaultCurrencyDetails: CurrencyDetails = {
  label: 'United States dollar',
  flag: 'US',
  sign: '$',
  currencyCode: 'USD',
};

export const EndElementExample = (args: AmountFieldProps) => {
  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDetails>(defaultCurrencyDetails);
  const countries: CurrencyDetails[] = Object.keys(currencyDictionary).map(
    (key) => currencyDictionary[key] as CurrencyDetails
  );

  return (
    <AmountField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      currency={selectedCurrency.currencyCode}
      currencySign={selectedCurrency.sign}
      locale="en-US"
      endElement={
        <FloatingMenu
          maxHeight={256}
          width={306}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDisabled={args.isDisabled}
          isReadOnly={args.isReadOnly}
          trigger={
            <AmountFieldEndElement>
              <Container
                alignItems="center"
                paddingX="s"
                height="full"
                color={args.isDisabled ? 'semantic.text.disabled' : undefined}
              >
                <Group width="full" justifyContent="center" alignItems="center" spacing="xxs">
                  <FlagIcon isDisabled={args.isDisabled} countryCode={selectedCurrency.flag} size="small" />
                  <Text color={args.isDisabled ? 'semantic.text.disabled' : 'semantic.text.primary'}>
                    {selectedCurrency.currencyCode}
                  </Text>
                  <Icon type={isOpen ? 'caret-up' : 'caret-down'} size="small" color="inherit" />
                </Group>
              </Container>
            </AmountFieldEndElement>
          }
          content={
            <FloatingMenuDropdownList paddingY="xs">
              {countries.map((country, index) => (
                <FloatingMenuSelectionItem
                  key={index}
                  isSelected={isEqual(selectedCurrency, country)}
                  onClick={() => {
                    setSelectedCurrency(country);
                    setIsOpen(false);
                  }}
                >
                  <Group alignItems="center" spacing="xs-s">
                    <FlagIcon countryCode={country.flag} size="small" />
                    <Group alignItems="center" spacing="none">
                      <Text textStyle="body3Semi">{country.currencyCode}&nbsp;</Text>
                      <Text textStyle="body3">- {country.label}</Text>
                    </Group>
                  </Group>
                </FloatingMenuSelectionItem>
              ))}
            </FloatingMenuDropdownList>
          }
        />
      }
    />
  );
};

export const EndElementDisabledExample = (args: AmountFieldProps) => {
  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDetails>(defaultCurrencyDetails);
  const countries: CurrencyDetails[] = Object.keys(currencyDictionary).map(
    (key) => currencyDictionary[key] as CurrencyDetails
  );

  return (
    <AmountField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      currency={selectedCurrency.currencyCode}
      currencySign={selectedCurrency.sign}
      locale="en-US"
      endElement={
        <FloatingMenu
          maxHeight={256}
          width={306}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDisabled
          trigger={
            <AmountFieldEndElement>
              <Container alignItems="center" paddingX="s" height="full" color="semantic.surface.primary.disabled">
                <Group width="full" justifyContent="center" alignItems="center" spacing="xxs">
                  <FlagIcon isDisabled countryCode={selectedCurrency.flag} size="small" />
                  <Text color="semantic.text.disabled">{selectedCurrency.currencyCode}</Text>
                  <Icon type={isOpen ? 'caret-up' : 'caret-down'} size="small" color="inherit" />
                </Group>
              </Container>
            </AmountFieldEndElement>
          }
          content={
            <FloatingMenuDropdownList paddingY="xs">
              {countries.map((country, index) => (
                <FloatingMenuSelectionItem
                  key={index}
                  isSelected={isEqual(selectedCurrency, country)}
                  onClick={() => {
                    setSelectedCurrency(country);
                    setIsOpen(false);
                  }}
                >
                  <Group alignItems="center" spacing="xs-s">
                    <FlagIcon countryCode={country.flag} size="small" />
                    <Group alignItems="center" spacing="none">
                      <Text textStyle="body3Semi">{country.currencyCode}&nbsp;</Text>
                      <Text textStyle="body3">- {country.label}</Text>
                    </Group>
                  </Group>
                </FloatingMenuSelectionItem>
              ))}
            </FloatingMenuDropdownList>
          }
        />
      }
    />
  );
};

export const EndElementReadOnlyExample = (args: AmountFieldProps) => {
  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDetails>(defaultCurrencyDetails);
  const countries: CurrencyDetails[] = Object.keys(currencyDictionary).map(
    (key) => currencyDictionary[key] as CurrencyDetails
  );

  return (
    <AmountField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      currency={selectedCurrency.currencyCode}
      currencySign={selectedCurrency.sign}
      locale="en-US"
      endElement={
        <FloatingMenu
          maxHeight={256}
          width={306}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isReadOnly
          trigger={
            <AmountFieldEndElement>
              <Container alignItems="center" paddingX="s" height="full">
                <Group width="full" justifyContent="center" alignItems="center" spacing="xxs">
                  <FlagIcon countryCode={selectedCurrency.flag} size="small" />
                  <Text>{selectedCurrency.currencyCode}</Text>
                  <Icon type={isOpen ? 'caret-up' : 'caret-down'} size="small" />
                </Group>
              </Container>
            </AmountFieldEndElement>
          }
          content={
            <FloatingMenuDropdownList paddingY="xs">
              {countries.map((country, index) => (
                <FloatingMenuSelectionItem
                  key={index}
                  isSelected={isEqual(selectedCurrency, country)}
                  onClick={() => {
                    setSelectedCurrency(country);
                    setIsOpen(false);
                  }}
                >
                  <Group alignItems="center" spacing="xs-s">
                    <FlagIcon countryCode={country.flag} size="small" />
                    <Group alignItems="center" spacing="none">
                      <Text textStyle="body3Semi">{country.currencyCode}&nbsp;</Text>
                      <Text textStyle="body3">- {country.label}</Text>
                    </Group>
                  </Group>
                </FloatingMenuSelectionItem>
              ))}
            </FloatingMenuDropdownList>
          }
        />
      }
    />
  );
};
