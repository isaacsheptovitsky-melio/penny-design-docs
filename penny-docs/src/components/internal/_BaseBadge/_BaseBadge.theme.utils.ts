import { type ThemeBorderKey, type ThemeColorKey } from '../../../theme/foundations';
import { type _BaseBadgeProps } from './_BaseBadge.types';

const PrimaryBackgroundStyle: Record<_BaseBadgeProps['status'], ThemeColorKey> = {
  warning: 'semantic.fill.warning.primary',
  critical: 'semantic.fill.critical.primary',
  success: 'semantic.fill.success.primary',
  neutral: 'semantic.fill.inverse',
  brand: 'semantic.fill.brand.primary',
  informative: 'semantic.fill.informative.primary',
};

const SecondaryBackgroundStyle: Record<_BaseBadgeProps['status'], ThemeColorKey> = {
  warning: 'component.pill.secondaryWarning.rest.background',
  critical: 'component.pill.secondaryCritical.rest.background',
  success: 'component.pill.secondarySuccess.rest.background',
  neutral: 'component.pill.secondaryNeutral.rest.background',
  brand: 'component.pill.secondaryBrand.rest.background',
  informative: 'component.pill.secondaryInformative.rest.background',
};

const SecondaryColorStyle: Record<_BaseBadgeProps['status'], ThemeColorKey> = {
  warning: 'component.pill.secondaryWarning.rest.label',
  critical: 'component.pill.secondaryCritical.rest.label',
  success: 'component.pill.secondarySuccess.rest.label',
  neutral: 'component.pill.secondaryNeutral.rest.label',
  brand: 'component.pill.secondaryBrand.rest.label',
  informative: 'component.pill.secondaryInformative.rest.label',
};

const SecondaryBorderStyle: Record<_BaseBadgeProps['status'], ThemeColorKey> = {
  warning: 'component.pill.secondaryWarning.rest.border',
  critical: 'component.pill.secondaryCritical.rest.border',
  success: 'component.pill.secondarySuccess.rest.border',
  neutral: 'component.pill.secondaryNeutral.rest.border',
  brand: 'component.pill.secondaryBrand.rest.border',
  informative: 'component.pill.secondaryInformative.rest.border',
};

const SecondaryBorderTokenStyle: Record<_BaseBadgeProps['status'], ThemeBorderKey> = {
  warning: 'component.pill.secondaryWarning.rest',
  critical: 'component.pill.secondaryCritical.rest',
  success: 'component.pill.secondarySuccess.rest',
  neutral: 'component.pill.secondaryNeutral.rest',
  brand: 'component.pill.secondaryBrand.rest',
  informative: 'component.pill.secondaryInformative.rest',
};

export const getBackgroundColor = (status: _BaseBadgeProps['status'], type: _BaseBadgeProps['type']): ThemeColorKey => {
  if (type === 'tertiary') return 'semantic.fill.primary';
  if (type === 'primary') return PrimaryBackgroundStyle[status];
  return SecondaryBackgroundStyle[status];
};

export const getColor = (status: _BaseBadgeProps['status'], type: _BaseBadgeProps['type']): ThemeColorKey => {
  if (type === 'tertiary' || status === 'warning') return 'semantic.text.primary';
  if (type === 'secondary') return SecondaryColorStyle[status];
  return 'semantic.text.inverse';
};

export const getBorderColor = (status: _BaseBadgeProps['status'], type: _BaseBadgeProps['type']): ThemeColorKey => {
  if (type === 'tertiary') return 'semantic.border.static';
  if (type === 'secondary') return SecondaryBorderStyle[status];
  return 'global.neutral.A0';
};

export const getBorder = (status: _BaseBadgeProps['status'], type: _BaseBadgeProps['type']): ThemeBorderKey => {
  if (type === 'tertiary') return 'global.25';
  if (type === 'secondary') return SecondaryBorderTokenStyle[status];
  return 'global.none';
};
