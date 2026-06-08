import type { DesignTokenMeta } from '@/types';
import { getPennyMetadata } from '@/utils/metadata';

export async function listPennyDesignTokens(args: { type?: string }): Promise<DesignTokenMeta[]> {
  const metadata = await getPennyMetadata();
  const { type } = args || {};

  if (!metadata.designTokens) {
    return [];
  }

  if (typeof type === 'string' && type.length > 0) {
    return metadata.designTokens.filter((token) => token.type === type);
  }

  return metadata.designTokens;
}
