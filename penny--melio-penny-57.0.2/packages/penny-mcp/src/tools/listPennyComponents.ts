import type { ComponentMetaSummary } from '@/types';
import { getPennyMetadata } from '@/utils/metadata';

export async function listPennyComponents(args: { category?: string }): Promise<ComponentMetaSummary[]> {
  const metadata = await getPennyMetadata();
  const { category } = args || {};

  const components =
    typeof category === 'string' && category.length > 0
      ? metadata.components.filter((c) => c.category === category)
      : metadata.components;

  return components.map((c) => ({
    name: c.name,
    description: c.description,
    category: c.category,
  }));
}
