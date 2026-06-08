export const GroupVariants = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export type GroupVariants = keyof typeof GroupVariants;
