#!/usr/bin/env tsx
/**
 * Generates TypeScript types and mappings from local SVG assets
 *
 * Usage:
 *   yarn run codegen
 *   yarn run codegen:assets from the root of the repo
 */

/* eslint-disable no-console, max-lines */

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';

type AssetCategory = {
  readonly name: string;
  readonly folder: string;
  readonly typePrefix: string;
  readonly generateMapping: (names: readonly string[]) => string;
  readonly generateTypes: (names: readonly string[]) => string;
};

const BASE_PATH = 'src/assets';

const ASSET_CATEGORIES: readonly AssetCategory[] = [
  {
    name: 'icons',
    folder: `${BASE_PATH}/icons`,
    typePrefix: 'Icon',
    generateMapping: (names) => generateIconsMapping(names),
    generateTypes: (names) => generateIconsTypes(names),
  },
  {
    name: 'brands',
    folder: `${BASE_PATH}/brands`,
    typePrefix: 'Brand',
    generateMapping: (names) => generateBrandsMapping(names),
    generateTypes: (names) => generateBrandsTypes(names),
  },
  {
    name: 'brand-symbols',
    folder: `${BASE_PATH}/brand-symbols`,
    typePrefix: 'BrandSymbol',
    generateMapping: (names) => generateBrandSymbolsMapping(names),
    generateTypes: (names) => generateBrandSymbolsTypes(names),
  },
  {
    name: 'illustrations',
    folder: `${BASE_PATH}/illustrations`,
    typePrefix: 'Illustration',
    generateMapping: (names) => generateIllustrationsMapping(names),
    generateTypes: (names) => generateIllustrationsTypes(names),
  },
  {
    name: 'flags',
    folder: `${BASE_PATH}/flags`,
    typePrefix: 'Flag',
    generateMapping: (names) => generateFlagsMapping(names),
    generateTypes: (names) => generateFlagsTypes(names),
  },
] as const;

const readSvgFiles = (directory: string): readonly string[] => {
  if (!existsSync(directory)) {
    console.log(`📁 Directory ${directory} does not exist, skipping...`);
    return [];
  }

  const files = readdirSync(directory)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => basename(file, '.svg'))
    .sort();

  return files;
};

// Icons have both small and medium sizes
const readIconFiles = (): readonly string[] => {
  const smallDir = `${BASE_PATH}/icons/small`;
  const mediumDir = `${BASE_PATH}/icons/medium`;

  const smallIcons = readSvgFiles(smallDir);
  const mediumIcons = readSvgFiles(mediumDir);

  // Make sure its icons that exist in both sizes
  const commonIcons = smallIcons.filter((icon) => mediumIcons.includes(icon));

  if (commonIcons.length === 0) {
    console.log('⚠️  No common icons found in both small and medium sizes');
  }

  return commonIcons;
};

const readBrandFiles = (): readonly string[] => {
  const brandsDir = `${BASE_PATH}/brands`;
  const allFiles = readSvgFiles(brandsDir);

  if (allFiles.length === 0) {
    return [];
  }

  // Group files by base brand name (default, neutral, inverse)
  const brandGroups = new Map<string, Set<string>>();

  for (const file of allFiles) {
    let baseName: string;

    if (file.endsWith('-neutral')) {
      baseName = file.slice(0, -8);
    } else if (file.endsWith('-inverse')) {
      baseName = file.slice(0, -8);
    } else {
      baseName = file;
    }

    if (!brandGroups.has(baseName)) {
      brandGroups.set(baseName, new Set());
    }
    const brandSet = brandGroups.get(baseName);
    if (brandSet) {
      brandSet.add(file);
    }
  }

  const validBrands = Array.from(brandGroups.entries())
    .filter(([baseName, variants]) => variants.has(baseName)) // Must have default variant
    .map(([baseName]) => baseName)
    .sort();

  if (validBrands.length === 0) {
    console.log('⚠️  No valid brands found (brands must have at least a default variant)');
  }

  return validBrands;
};

const readBrandSymbolFiles = (): readonly string[] => {
  const brandSymbolsDir = `${BASE_PATH}/brand-symbols`;
  const allFiles = readSvgFiles(brandSymbolsDir);

  if (allFiles.length === 0) {
    return [];
  }

  // Group files by base brand symbol name (default, inverse)
  const brandSymbolGroups = new Map<string, Set<string>>();

  for (const file of allFiles) {
    let baseName: string;

    if (file.endsWith('-inverse')) {
      baseName = file.slice(0, -8);
    } else {
      baseName = file;
    }

    if (!brandSymbolGroups.has(baseName)) {
      brandSymbolGroups.set(baseName, new Set());
    }
    const brandSymbolSet = brandSymbolGroups.get(baseName);
    if (brandSymbolSet) {
      brandSymbolSet.add(file);
    }
  }

  const validBrandSymbols = Array.from(brandSymbolGroups.entries())
    .filter(([baseName, variants]) => variants.has(baseName)) // Must have default variant
    .map(([baseName]) => baseName)
    .sort();

  if (validBrandSymbols.length === 0) {
    console.log('⚠️  No valid brand symbols found (brand symbols must have at least a default variant)');
  }

  return validBrandSymbols;
};

// Helper function to check which brand variants exist
const getBrandVariants = (brandName: string): { default: boolean; neutral: boolean; inverse: boolean } => {
  const brandsDir = `${BASE_PATH}/brands`;
  return {
    default: existsSync(join(brandsDir, `${brandName}.svg`)),
    neutral: existsSync(join(brandsDir, `${brandName}-neutral.svg`)),
    inverse: existsSync(join(brandsDir, `${brandName}-inverse.svg`)),
  };
};

// Helper function to check which brand symbol variants exist
const getBrandSymbolVariants = (brandSymbolName: string): { default: boolean; inverse: boolean } => {
  const brandSymbolsDir = `${BASE_PATH}/brand-symbols`;
  return {
    default: existsSync(join(brandSymbolsDir, `${brandSymbolName}.svg`)),
    inverse: existsSync(join(brandSymbolsDir, `${brandSymbolName}-inverse.svg`)),
  };
};

// Type generation functions ///////////////////////////////////
const generateIconsTypes = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

export type IconKey = 
${names.map((name) => `  | '${name}'`).join('\n')}

export type IconSize = 'small' | 'medium';

export type IconsMap = Record<IconKey, Record<IconSize, string>>;
`;

const generateBrandsTypes = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

export type BrandKey = 
${names.map((name) => `  | '${name}'`).join('\n')}

export type BrandVariant = 'default' | 'neutral' | 'inverse';

export type BrandsMap = Record<BrandKey, Partial<Record<BrandVariant, string>>>;
`;

const generateBrandSymbolsTypes = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

export type BrandSymbolKey = 
${names.map((name) => `  | '${name}'`).join('\n')}

export type BrandSymbolVariant = 'default' | 'inverse';

export type BrandSymbolsMap = Record<BrandSymbolKey, Partial<Record<BrandSymbolVariant, string>>>;
`;

const generateIllustrationsTypes = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

export type IllustrationKey = 
${names.map((name) => `  | '${name}'`).join('\n')}

export type IllustrationsMap = Record<IllustrationKey, string>;
`;

const generateFlagsTypes = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

export type FlagKey = 
${names.map((name) => `  | '${name}'`).join('\n')}

export type FlagsMap = Record<FlagKey, string>;
`;

// Mapping generation functions ///////////////////////////////////
const generateIconsMapping = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

import type { IconsMap } from './icons.generated.types';

export const getIconsMap = (): IconsMap => ({
${names.map((name) => `  '${name}': { small: '/assets/icons/small/${name}.svg', medium: '/assets/icons/medium/${name}.svg' },`).join('\n')}
});
`;

const generateBrandsMapping = (names: readonly string[]): string => {
  const brandMappings = names.map((name) => {
    const variants = getBrandVariants(name);
    const variantEntries: string[] = [];

    if (variants.default) {
      variantEntries.push(`default: '/assets/brands/${name}.svg'`);
    }
    if (variants.neutral) {
      variantEntries.push(`neutral: '/assets/brands/${name}-neutral.svg'`);
    }
    if (variants.inverse) {
      variantEntries.push(`inverse: '/assets/brands/${name}-inverse.svg'`);
    }

    return `  '${name}': { ${variantEntries.join(', ')} },`;
  });

  return `
// Auto-generated file by penny-assets codegen script

import type { BrandsMap } from './brands.generated.types';

export const getBrandsMap = (): BrandsMap => ({
${brandMappings.join('\n')}
});
`;
};

const generateBrandSymbolsMapping = (names: readonly string[]): string => {
  const brandSymbolMappings = names.map((name) => {
    const variants = getBrandSymbolVariants(name);
    const variantEntries: string[] = [];

    if (variants.default) {
      variantEntries.push(`default: '/assets/brand-symbols/${name}.svg'`);
    }
    if (variants.inverse) {
      variantEntries.push(`inverse: '/assets/brand-symbols/${name}-inverse.svg'`);
    }

    return `  '${name}': { ${variantEntries.join(', ')} },`;
  });

  return `
// Auto-generated file by penny-assets codegen script

import type { BrandSymbolsMap } from './brand-symbols.generated.types';

export const getBrandSymbolsMap = (): BrandSymbolsMap => ({
${brandSymbolMappings.join('\n')}
});
`;
};

const generateIllustrationsMapping = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

import type { IllustrationsMap } from './illustrations.generated.types';

export const getIllustrationsMap = (): IllustrationsMap => ({
${names.map((name) => `  '${name}': '/assets/illustrations/${name}.svg',`).join('\n')}
});
`;

const generateFlagsMapping = (names: readonly string[]): string => `
// Auto-generated file by penny-assets codegen script

import type { FlagsMap } from './flags.generated.types';

export const getFlagsMap = (): FlagsMap => ({
${names.map((name) => `  '${name}': '/assets/flags/${name}.svg',`).join('\n')}
});
`;

const writeFile = (filePath: string, content: string): void => {
  // Ensure directory exists
  mkdirSync(dirname(filePath), { recursive: true });

  writeFileSync(filePath, content.trim());
  console.log(`✅ Generated: ${filePath}`);
};

const getAssetNames = (category: AssetCategory): readonly string[] => {
  if (category.name === 'icons') {
    return readIconFiles();
  }
  if (category.name === 'brands') {
    return readBrandFiles();
  }
  if (category.name === 'brand-symbols') {
    return readBrandSymbolFiles();
  }
  return readSvgFiles(category.folder);
};

const main = (): void => {
  console.log('🚀 Starting penny-assets codegen...\n');

  for (const category of ASSET_CATEGORIES) {
    console.log(`📁 Processing ${category.name}...`);

    const assetNames = getAssetNames(category);

    if (assetNames.length === 0) {
      console.log(`⚠️  No ${category.name} found, skipping generation`);
      continue;
    }

    console.log(
      `   Found ${assetNames.length} ${category.name}: ${assetNames.slice(0, 5).join(', ')}${assetNames.length > 5 ? '...' : ''}`
    );

    const typesContent = category.generateTypes(assetNames);
    const typesPath = join('src', 'types', `${category.name}.generated.types.ts`);
    writeFile(typesPath, typesContent);

    const mappingContent = category.generateMapping(assetNames);
    const mappingPath = join('src', 'types', `${category.name}.generated.ts`);
    writeFile(mappingPath, mappingContent);

    console.log('');
  }

  console.log('🎉 Codegen completed successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Add SVG files to the appropriate asset directories');
  console.log('   2. Run codegen again to regenerate types');
  console.log('   3. Update your stories to display the assets');
};

if (require.main === module) {
  main();
}
