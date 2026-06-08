import type { ComponentMeta } from '@/types';
import { getPennyMetadata } from '@/utils/metadata';

export async function getPennyComponentDetails(args: { componentName: string }): Promise<ComponentMeta> {
  const searchName = args.componentName.toLowerCase();
  const metadata = await getPennyMetadata();
  const component = metadata.components.find((c) => c.name.toLowerCase() === searchName);

  if (component) {
    return component;
  }

  const availableComponents = metadata.components.map((c) => c.name).sort();
  throw new Error(
    `Component "${args.componentName}" not found. Available components: ${availableComponents.join(', ')}`
  );
}
