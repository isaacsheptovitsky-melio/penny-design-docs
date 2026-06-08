import * as fs from 'fs';
import * as path from 'path';
import { Project, type SourceFile } from 'ts-morph';

import type { ExportInfo } from './types';

const COMPONENT_EXTENSIONS = ['.tsx', '.ts'];
const COMPONENT_DIR_PATTERNS = ['components'];
const EXCLUDE_COMPONENT_DIR_PATTERNS: string[] = ['components/internal', 'components/table'];

const IGNORE_PATTERNS = [
  '__tests__',
  '__mocks__',
  '*.test.*',
  '*.spec.*',
  '*.stories.*',
  '*.utils.*',
  '*.util.*',
  '*.helper.*',
  '*.helpers.*',
  '*.hook.*',
  '*.hooks.*',
  '*.constant.*',
  '*.constants.*',
  '*.type.*',
  '*.types.*',
  '*.theme.*',
  '*.styles.*',
  '*.style.*',
  '^use*',
  '*Context*',
  '^_*',
];

/**
 * Check if a directory should be excluded from component discovery
 */
function shouldExcludeDirectory(dirPath: string): boolean {
  const dirName = path.basename(dirPath);
  const relativePath = dirPath;

  return EXCLUDE_COMPONENT_DIR_PATTERNS.some((pattern) => {
    if (pattern.includes('*')) {
      // Handle wildcard patterns
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(dirName) || regex.test(relativePath);
    } else {
      // Handle exact matches and directory patterns
      return relativePath.includes(pattern) || dirName.includes(pattern);
    }
  });
}

/**
 * Check if a file should be ignored based on ignore patterns
 */
function shouldIgnoreFile(filePath: string): boolean {
  const fileName = path.basename(filePath);
  const relativePath = filePath;

  return IGNORE_PATTERNS.some((pattern) => {
    if (pattern.includes('*')) {
      // Handle wildcard patterns
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(fileName) || regex.test(relativePath);
    } else {
      // Handle directory patterns
      return relativePath.includes(pattern);
    }
  });
}

/**
 * Escape special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Check if a file is likely a React component by checking its content
 */
function isLikelyReactComponent(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, path.extname(filePath));
    const escapedFileName = escapeRegExp(fileName);

    // Check if it's a component file by looking for:
    // 1. React imports
    // 2. Component-like exports (PascalCase)
    // 3. JSX/TSX content
    const hasReactImport = /import.*React|import.*from ['"]react['"]/.test(content);
    const hasJSXContent = /<[A-Z]/.test(content) || /jsx|tsx/.test(content);
    const hasPascalCaseExport = new RegExp(`export.*\\b${escapedFileName}\\b|const\\s+${escapedFileName}\\s*=`).test(
      content
    );

    // Must have either React import or JSX content, and should have PascalCase export
    return (hasReactImport || hasJSXContent) && hasPascalCaseExport;
  } catch {
    // If we can't read the file, skip it
    return false;
  }
}

/**
 * Find all component files in the specified directory
 */
export function findComponentFiles(rootDir: string): string[] {
  const componentPaths: string[] = [];

  // Helper function to traverse directory recursively
  const traverseDir = (dir: string) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);

      // Skip ignored files and directories
      if (shouldIgnoreFile(fullPath)) {
        continue;
      }

      if (stats.isDirectory()) {
        // Check if this directory should be excluded from discovery
        if (shouldExcludeDirectory(fullPath)) {
          continue;
        }
        traverseDir(fullPath);
      } else if (
        COMPONENT_EXTENSIONS.includes(path.extname(fullPath)) &&
        COMPONENT_DIR_PATTERNS.some((pattern) => fullPath.includes(pattern))
      ) {
        // Additional check: only include files that are likely React components
        if (isLikelyReactComponent(fullPath)) {
          componentPaths.push(fullPath);
        }
      }
    }
  };

  traverseDir(rootDir);
  return componentPaths;
}

/**
 * Initialize ts-morph project with component files
 */
export function initializeComponentTSMorphProject(componentFiles: string[]): Project {
  const project = new Project({
    tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  // Add files to the project
  for (const filePath of componentFiles) {
    project.addSourceFileAtPath(filePath);
  }

  return project;
}

/**
 * Extract export information from a source file
 */
export function extractExportsFromFile(sourceFile: SourceFile): ExportInfo[] {
  const exports: ExportInfo[] = [];
  const filePath = sourceFile.getFilePath();

  // Get exported declarations
  const exportedDeclarations = sourceFile.getExportedDeclarations();

  // Process each exported declaration
  exportedDeclarations.forEach((declarations, name) => {
    for (const declaration of declarations) {
      // Skip re-exports from other modules
      if (!declaration.getSourceFile().getFilePath().includes(filePath)) {
        continue;
      }

      exports.push({
        name,
        filePath,
        exportPath: getRelativeExportPath(filePath),
      });
    }
  });

  return exports;
}

/**
 * Extract relative export path from file path
 * e.g. /penny/src/components/Button/Button.tsx -> components/Button
 */
function getRelativeExportPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  const srcIndex = parts.indexOf('src');

  if (srcIndex !== -1 && srcIndex + 2 < parts.length) {
    const categoryIndex = srcIndex + 1;
    const componentIndex = srcIndex + 2;

    return `${parts[categoryIndex]}/${parts[componentIndex]}`;
  }

  return path.dirname(filePath).split(path.sep).slice(-2).join('/');
}
