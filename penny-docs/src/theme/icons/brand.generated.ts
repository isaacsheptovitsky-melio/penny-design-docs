/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-brands.yml

import { type BrandKey } from './brand.generated.types';

const getBrandPath = (cdnUrl: string, name: string) => `${cdnUrl}/assets/1.0.0/brands/${name}.svg`;

export const getBrandMap = (cdnUrl: string): Record<BrandKey, Record<'default' | 'neutral' | 'inverse', string>> => ({
  adp: {
    default: getBrandPath(cdnUrl, 'adp'),
    neutral: getBrandPath(cdnUrl, 'adp-neutral'),
    inverse: getBrandPath(cdnUrl, 'adp-inverse'),
  },
  amex: {
    default: getBrandPath(cdnUrl, 'amex'),
    neutral: getBrandPath(cdnUrl, 'amex-neutral'),
    inverse: getBrandPath(cdnUrl, 'amex-inverse'),
  },
  'credit-key': {
    default: getBrandPath(cdnUrl, 'credit-key'),
    neutral: getBrandPath(cdnUrl, 'credit-key-neutral'),
    inverse: getBrandPath(cdnUrl, 'credit-key-inverse'),
  },
  diners: {
    default: getBrandPath(cdnUrl, 'diners'),
    neutral: getBrandPath(cdnUrl, 'diners-neutral'),
    inverse: getBrandPath(cdnUrl, 'diners-inverse'),
  },
  discover: {
    default: getBrandPath(cdnUrl, 'discover'),
    neutral: getBrandPath(cdnUrl, 'discover-neutral'),
    inverse: getBrandPath(cdnUrl, 'discover-inverse'),
  },
  evolve: {
    default: getBrandPath(cdnUrl, 'evolve'),
    neutral: getBrandPath(cdnUrl, 'evolve-neutral'),
    inverse: getBrandPath(cdnUrl, 'evolve-inverse'),
  },
  'first-financial': {
    default: getBrandPath(cdnUrl, 'first-financial'),
    neutral: getBrandPath(cdnUrl, 'first-financial-neutral'),
    inverse: getBrandPath(cdnUrl, 'first-financial-inverse'),
  },
  flex: {
    default: getBrandPath(cdnUrl, 'flex'),
    neutral: getBrandPath(cdnUrl, 'flex-neutral'),
    inverse: getBrandPath(cdnUrl, 'flex-inverse'),
  },
  freshbooks: {
    default: getBrandPath(cdnUrl, 'freshbooks'),
    neutral: getBrandPath(cdnUrl, 'freshbooks-neutral'),
    inverse: getBrandPath(cdnUrl, 'freshbooks-inverse'),
  },
  intuit: {
    default: getBrandPath(cdnUrl, 'intuit'),
    neutral: getBrandPath(cdnUrl, 'intuit-neutral'),
    inverse: getBrandPath(cdnUrl, 'intuit-inverse'),
  },
  'jp-morgan': {
    default: getBrandPath(cdnUrl, 'jp-morgan'),
    neutral: getBrandPath(cdnUrl, 'jp-morgan-neutral'),
    inverse: getBrandPath(cdnUrl, 'jp-morgan-inverse'),
  },
  mastercard: {
    default: getBrandPath(cdnUrl, 'mastercard'),
    neutral: getBrandPath(cdnUrl, 'mastercard-neutral'),
    inverse: getBrandPath(cdnUrl, 'mastercard-inverse'),
  },
  melio: {
    default: getBrandPath(cdnUrl, 'melio'),
    neutral: getBrandPath(cdnUrl, 'melio-neutral'),
    inverse: getBrandPath(cdnUrl, 'melio-inverse'),
  },
  'pci-dss': {
    default: getBrandPath(cdnUrl, 'pci-dss'),
    neutral: getBrandPath(cdnUrl, 'pci-dss-neutral'),
    inverse: getBrandPath(cdnUrl, 'pci-dss-inverse'),
  },
  quickbooks: {
    default: getBrandPath(cdnUrl, 'quickbooks'),
    neutral: getBrandPath(cdnUrl, 'quickbooks-neutral'),
    inverse: getBrandPath(cdnUrl, 'quickbooks-inverse'),
  },
  'us-bank': {
    default: getBrandPath(cdnUrl, 'us-bank'),
    neutral: getBrandPath(cdnUrl, 'us-bank-neutral'),
    inverse: getBrandPath(cdnUrl, 'us-bank-inverse'),
  },
  visa: {
    default: getBrandPath(cdnUrl, 'visa'),
    neutral: getBrandPath(cdnUrl, 'visa-neutral'),
    inverse: getBrandPath(cdnUrl, 'visa-inverse'),
  },
  wafed: {
    default: getBrandPath(cdnUrl, 'wafed'),
    neutral: getBrandPath(cdnUrl, 'wafed-neutral'),
    inverse: getBrandPath(cdnUrl, 'wafed-inverse'),
  },
});
