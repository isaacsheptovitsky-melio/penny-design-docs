import * as fs from 'fs';
import * as path from 'path';

import type { ComponentMetadata, DesignTokenMetadata, MetadataOutput } from './types';

/**
 * Generate metadata output object
 */
export function generateMetadataOutput(
  components: ComponentMetadata[],
  designTokens: DesignTokenMetadata[]
): MetadataOutput {
  return {
    components,
    designTokens,
  };
}

/**
 * Write metadata to JSON file
 */
export function writeMetadataToFile(metadata: MetadataOutput, outputPath: string): void {
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write file with pretty formatting
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        components: metadata.components,
        designTokens: metadata.designTokens,
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(`Metadata successfully written to ${outputPath}`);
  console.log(
    `Generated metadata for ${metadata.components.length} components and ${metadata.designTokens.length} design tokens`
  );
}

/**
 * Format components for better readability
 */
export function formatComponents(components: ComponentMetadata[]): ComponentMetadata[] {
  return components.map((component) => {
    const sortedProps = [...component.props].sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...component,
      props: sortedProps,
    };
  });
}

/**
 * Generate summary statistics about the extracted metadata
 */
export function generateMetadataSummary(metadata: MetadataOutput): string {
  const { components, designTokens } = metadata;

  // Extract unique categories
  const categories = [
    ...new Set(components.filter((comp) => comp.category).map((comp) => comp.category as string)),
  ].sort();

  // Count components by category
  const componentsByCategory = categories.map((category) => {
    const count = components.filter((c) => c.category === category).length;
    return { category, count };
  });

  // Count design tokens by type and level
  const tokensByType = designTokens.reduce(
    (acc, token) => {
      acc[token.type] = (acc[token.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const withPropsCount = components.filter((c) => c.props.length > 0).length;
  const totalPropsCount = components.reduce((sum, c) => sum + c.props.length, 0);

  let summary = '# Component and Design Token Metadata Summary\n\n';

  summary += `## Overview\n`;
  summary += `- Total components: ${components.length}\n`;
  summary += `- Total categories: ${categories.length}\n`;
  summary += `- Components with props: ${withPropsCount} (${Math.round((withPropsCount / components.length) * 100)}%)\n`;
  summary += `- Total props: ${totalPropsCount} (avg ${Math.round(totalPropsCount / components.length)} per component)\n`;
  summary += `- Total design tokens: ${designTokens.length}\n\n`;

  summary += `## Components by Category\n`;
  componentsByCategory.forEach(({ category, count }) => {
    summary += `- ${category}: ${count} components\n`;
  });

  summary += `\n## Design Tokens by Type\n`;
  Object.entries(tokensByType).forEach(([type, count]) => {
    summary += `- ${type}: ${count} tokens\n`;
  });

  return summary;
}
