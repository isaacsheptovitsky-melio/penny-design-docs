import { type ChakraTheme, type ResponsiveValue } from '@chakra-ui/react';

import { type ThemeBorderRadiusKey } from './foundations/borderRadii/types';
import { type ThemeBorderKey } from './foundations/borders/types';
import { type ThemeColorKey } from './foundations/colors/types';
import { type InternalCSSObject } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordKey = keyof any;

export type PartsStyleInterpolation<TParts extends RecordKey, TProps, TPartial extends boolean = false> =
  | PartsStyleObject<TParts, TPartial>
  | PartsStyleFunction<TParts, TProps, TPartial>;

type PartsStyleObject<TParts extends RecordKey, TPartial extends boolean> = TPartial extends true
  ? Partial<Record<TParts, InternalCSSObject>>
  : Record<TParts, InternalCSSObject>;

type PartsStyleFunction<TParts extends RecordKey, TProps, TPartial extends boolean> = (
  props: StyleFunctionProps<TProps>
) => PartsStyleObject<TParts, TPartial>;

type StyleFunctionProps<P> = P & {
  theme: ChakraTheme;
};

type BaseColor = 'transparent' | 'inherit' | 'initial';
export type Color = ResponsiveValue<BaseColor> | ThemeColorKey;
export type BorderRadius = ResponsiveValue<ThemeBorderRadiusKey>;
export type Border = ResponsiveValue<ThemeBorderKey>;

type BaseProps<V extends RecordKey = RecordKey, S extends RecordKey = RecordKey> = {
  variant?: V;
  size?: S;
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EmptyProps = {};

type SizeOrVariant<
  TProps extends BaseProps | EmptyProps,
  TKey extends 'variant' | 'size',
  TValue,
> = TProps extends BaseProps
  ? Required<TProps>[TKey] extends RecordKey
    ? Record<Required<TProps>[TKey], TValue>
    : never
  : never;

type SystemStyleFunction<TProps = EmptyProps> = (props: StyleFunctionProps<TProps>) => InternalCSSObject;

type DefaultProps<TProps extends BaseProps | EmptyProps> = Partial<TProps> & {
  variant?: TProps extends BaseProps ? TProps['variant'] : never;
  size?: TProps extends BaseProps ? TProps['size'] : never;
};

export type ComponentMultiStyleConfig<TParts extends RecordKey, TProps extends BaseProps | EmptyProps = EmptyProps> = {
  baseStyle?: PartsStyleInterpolation<TParts, TProps>;
  variants?: SizeOrVariant<TProps, 'variant', PartsStyleInterpolation<TParts, TProps, true>>;
  sizes?: SizeOrVariant<TProps, 'size', PartsStyleInterpolation<TParts, TProps, true>>;
  defaultProps?: DefaultProps<TProps>;
  parts?: TParts[];
};

type SystemStyle<T> = SystemStyleFunction<T> | InternalCSSObject;

export type ComponentSingleStyleConfig<TProps extends BaseProps | EmptyProps = EmptyProps> = {
  baseStyle?: SystemStyle<TProps>;
  variants?: SizeOrVariant<TProps, 'variant', SystemStyle<TProps>>;
  sizes?: SizeOrVariant<TProps, 'size', SystemStyle<TProps>>;
  defaultProps?: DefaultProps<TProps>;
};
