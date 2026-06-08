/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-brand-symbols.yml

import { type BrandSymbolKey } from './brandSymbol.generated.types';

const getBrandSymbolPath = (cdnUrl: string, name: string) => `${cdnUrl}/assets/1.0.0/brand-symbols/${name}.svg`;

export const getBrandSymbolsMap = (cdnUrl: string): Record<BrandSymbolKey, Record<'default' | 'inverse', string>> => ({
  amazon: { default: getBrandSymbolPath(cdnUrl, 'amazon'), inverse: getBrandSymbolPath(cdnUrl, 'amazon-inverse') },
  amex: { default: getBrandSymbolPath(cdnUrl, 'amex'), inverse: getBrandSymbolPath(cdnUrl, 'amex-inverse') },
  'bank-of-america': {
    default: getBrandSymbolPath(cdnUrl, 'bank-of-america'),
    inverse: getBrandSymbolPath(cdnUrl, 'bank-of-america-inverse'),
  },
  'capital-one': {
    default: getBrandSymbolPath(cdnUrl, 'capital-one'),
    inverse: getBrandSymbolPath(cdnUrl, 'capital-one-inverse'),
  },
  chase: { default: getBrandSymbolPath(cdnUrl, 'chase'), inverse: getBrandSymbolPath(cdnUrl, 'chase-inverse') },
  'citi-bank': {
    default: getBrandSymbolPath(cdnUrl, 'citi-bank'),
    inverse: getBrandSymbolPath(cdnUrl, 'citi-bank-inverse'),
  },
  clover: { default: getBrandSymbolPath(cdnUrl, 'clover'), inverse: getBrandSymbolPath(cdnUrl, 'clover-inverse') },
  covantage: {
    default: getBrandSymbolPath(cdnUrl, 'covantage'),
    inverse: getBrandSymbolPath(cdnUrl, 'covantage-inverse'),
  },
  'credit-key': {
    default: getBrandSymbolPath(cdnUrl, 'credit-key'),
    inverse: getBrandSymbolPath(cdnUrl, 'credit-key-inverse'),
  },
  diners: { default: getBrandSymbolPath(cdnUrl, 'diners'), inverse: getBrandSymbolPath(cdnUrl, 'diners-inverse') },
  discover: {
    default: getBrandSymbolPath(cdnUrl, 'discover'),
    inverse: getBrandSymbolPath(cdnUrl, 'discover-inverse'),
  },
  dynamics365bc: {
    default: getBrandSymbolPath(cdnUrl, 'dynamics365bc'),
    inverse: getBrandSymbolPath(cdnUrl, 'dynamics365bc-inverse'),
  },
  'first-financial': {
    default: getBrandSymbolPath(cdnUrl, 'first-financial'),
    inverse: getBrandSymbolPath(cdnUrl, 'first-financial-inverse'),
  },
  flex: { default: getBrandSymbolPath(cdnUrl, 'flex'), inverse: getBrandSymbolPath(cdnUrl, 'flex-inverse') },
  freshbooks: {
    default: getBrandSymbolPath(cdnUrl, 'freshbooks'),
    inverse: getBrandSymbolPath(cdnUrl, 'freshbooks-inverse'),
  },
  gmail: { default: getBrandSymbolPath(cdnUrl, 'gmail'), inverse: getBrandSymbolPath(cdnUrl, 'gmail-inverse') },
  'google-ads': {
    default: getBrandSymbolPath(cdnUrl, 'google-ads'),
    inverse: getBrandSymbolPath(cdnUrl, 'google-ads-inverse'),
  },
  google: { default: getBrandSymbolPath(cdnUrl, 'google'), inverse: getBrandSymbolPath(cdnUrl, 'google-inverse') },
  gusto: { default: getBrandSymbolPath(cdnUrl, 'gusto'), inverse: getBrandSymbolPath(cdnUrl, 'gusto-inverse') },
  mastercard: {
    default: getBrandSymbolPath(cdnUrl, 'mastercard'),
    inverse: getBrandSymbolPath(cdnUrl, 'mastercard-inverse'),
  },
  melio: { default: getBrandSymbolPath(cdnUrl, 'melio'), inverse: getBrandSymbolPath(cdnUrl, 'melio-inverse') },
  meta: { default: getBrandSymbolPath(cdnUrl, 'meta'), inverse: getBrandSymbolPath(cdnUrl, 'meta-inverse') },
  'ms-dynamic-365': {
    default: getBrandSymbolPath(cdnUrl, 'ms-dynamic-365'),
    inverse: getBrandSymbolPath(cdnUrl, 'ms-dynamic-365-inverse'),
  },
  ocean: { default: getBrandSymbolPath(cdnUrl, 'ocean'), inverse: getBrandSymbolPath(cdnUrl, 'ocean-inverse') },
  'oracle-netsuite': {
    default: getBrandSymbolPath(cdnUrl, 'oracle-netsuite'),
    inverse: getBrandSymbolPath(cdnUrl, 'oracle-netsuite-inverse'),
  },
  paypal: { default: getBrandSymbolPath(cdnUrl, 'paypal'), inverse: getBrandSymbolPath(cdnUrl, 'paypal-inverse') },
  quickbooks: {
    default: getBrandSymbolPath(cdnUrl, 'quickbooks'),
    inverse: getBrandSymbolPath(cdnUrl, 'quickbooks-inverse'),
  },
  sage: { default: getBrandSymbolPath(cdnUrl, 'sage'), inverse: getBrandSymbolPath(cdnUrl, 'sage-inverse') },
  'us-bank': { default: getBrandSymbolPath(cdnUrl, 'us-bank'), inverse: getBrandSymbolPath(cdnUrl, 'us-bank-inverse') },
  visa: { default: getBrandSymbolPath(cdnUrl, 'visa'), inverse: getBrandSymbolPath(cdnUrl, 'visa-inverse') },
  wafed: { default: getBrandSymbolPath(cdnUrl, 'wafed'), inverse: getBrandSymbolPath(cdnUrl, 'wafed-inverse') },
  wave: { default: getBrandSymbolPath(cdnUrl, 'wave'), inverse: getBrandSymbolPath(cdnUrl, 'wave-inverse') },
  'wells-fargo': {
    default: getBrandSymbolPath(cdnUrl, 'wells-fargo'),
    inverse: getBrandSymbolPath(cdnUrl, 'wells-fargo-inverse'),
  },
  xero: { default: getBrandSymbolPath(cdnUrl, 'xero'), inverse: getBrandSymbolPath(cdnUrl, 'xero-inverse') },
});
