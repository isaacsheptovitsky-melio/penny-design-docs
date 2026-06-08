import { Text } from '@/components/dataDisplay/Text';

export const MaxCharsCounter = ({ maxChars, valueLength = 0, ...props }: { valueLength: number; maxChars: number }) => {
  const maxCharsLength = valueLength >= maxChars ? maxChars : valueLength;

  return <Text {...props} textStyle="inline" color="inherit">{`${maxCharsLength}/${maxChars}`}</Text>;
};
