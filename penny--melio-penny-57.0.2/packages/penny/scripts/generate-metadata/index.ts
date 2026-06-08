import * as path from 'path';

import { extractExportsFromFile, findComponentFiles, initializeComponentTSMorphProject } from './component-discovery';
import { extractDesignTokens } from './design-tokens-extraction';
import { extractComponentMetadata } from './metadata-extraction';
import {
  formatComponents,
  generateMetadataOutput,
  generateMetadataSummary,
  writeMetadataToFile,
} from './metadata-output';

function generateMetadata() {
  try {
    console.log('Starting metadata generation...');

    // Get paths
    const ROOT_DIR = path.resolve(process.cwd(), 'src');
    const OUTPUT_PATH = path.resolve(process.cwd(), 'dist/metadata.json');

    console.log('Finding component files...');
    const componentFiles = findComponentFiles(ROOT_DIR);
    console.log(`Found ${componentFiles.length} component files`);

    console.log('Creating ts-morph project...');
    const componentsTSMorphProject = initializeComponentTSMorphProject(componentFiles);

    console.log('Extracting component metadata...');
    const componentMetadata = [];

    for (const filePath of componentFiles) {
      const sourceFile = componentsTSMorphProject.getSourceFileOrThrow(filePath);
      const exports = extractExportsFromFile(sourceFile);

      for (const exportInfo of exports) {
        const metadata = extractComponentMetadata(sourceFile, exportInfo);
        if (metadata) {
          // Only include components that have a description
          if (metadata.description && metadata.description.trim().length > 0) {
            componentMetadata.push(metadata);
          }
        }
      }
    }

    console.log(`Extracted metadata for ${componentMetadata.length} components`);

    console.log('Extracting design tokens...');
    const designTokens = extractDesignTokens();
    console.log(`Extracted ${designTokens.length} design tokens`);

    const formattedComponents = formatComponents(componentMetadata);
    const metadata = generateMetadataOutput(formattedComponents, designTokens);
    writeMetadataToFile(metadata, OUTPUT_PATH);
    const summary = generateMetadataSummary(metadata);
    console.log(summary);

    console.log('✅ Metadata generation completed successfully');
  } catch (error) {
    console.error('❌ Error generating metadata:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateMetadata();
}
