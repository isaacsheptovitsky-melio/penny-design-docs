/* eslint-disable max-lines */
import * as path from 'path';
import type {
  ClassDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  ParameterDeclaration,
  PropertySignature,
  SourceFile,
  TypeAliasDeclaration,
  VariableDeclaration,
} from 'ts-morph';
import { Node } from 'ts-morph';

import type { ComponentMetadata, ExportInfo, PropMetadata } from './types';

/**
 * Extract component metadata from a source file
 */
export function extractComponentMetadata(sourceFile: SourceFile, exportInfo: ExportInfo): ComponentMetadata | null {
  const filePath = sourceFile.getFilePath();
  const componentName = exportInfo.name;

  const componentNode = findComponentDeclaration(sourceFile, componentName);
  if (!componentNode) {
    console.warn(`Could not find component declaration for "${componentName}" in file "${filePath}"`);
    return null;
  }

  const description = extractDescription(componentNode);
  const props = extractComponentProps(componentNode, sourceFile);
  const { category, subCategory } = extractComponentCategories(filePath);

  return {
    name: componentName,
    displayName: componentName,
    description,
    props,
    category,
    subCategory,
    exportPath: exportInfo.exportPath,
  };
}

/**
 * Find the component declaration in a source file
 */
function findComponentDeclaration(
  sourceFile: SourceFile,
  componentName: string
): VariableDeclaration | FunctionDeclaration | ClassDeclaration | undefined {
  // Try to find variable declaration (most common for React components)
  const variableDeclaration = sourceFile.getVariableDeclaration(componentName);
  if (variableDeclaration) {
    return variableDeclaration;
  }

  // Try to find function declaration
  const functionDeclaration = sourceFile.getFunction(componentName);
  if (functionDeclaration) {
    return functionDeclaration;
  }

  // Try to find class declaration
  const classDeclaration = sourceFile.getClass(componentName);
  if (classDeclaration) {
    return classDeclaration;
  }

  return undefined;
}

/**
 * Extract component description from JSDoc or leading comments
 */
function extractDescription(node: VariableDeclaration | FunctionDeclaration | ClassDeclaration): string {
  if (!node) {
    return '';
  }

  let description = '';

  // Try to get JSDoc comments for functions and classes
  if (Node.isFunctionDeclaration(node) || Node.isClassDeclaration(node)) {
    // Use getJsDocs() for function and class declarations
    const jsDocs = node.getJsDocs();
    if (jsDocs && jsDocs.length > 0) {
      const firstJsDoc = jsDocs[0];
      if (firstJsDoc) {
        description = firstJsDoc.getDescription();
      }
    }
  } else if (Node.isVariableDeclaration(node)) {
    // For variable declarations, get the parent variable statement
    const variableStatement = node.getVariableStatement();
    if (variableStatement) {
      const jsDocs = variableStatement.getJsDocs();
      if (jsDocs && jsDocs.length > 0) {
        const firstJsDoc = jsDocs[0];
        if (firstJsDoc) {
          description = firstJsDoc.getDescription();
        }
      }
    }
  }

  // If no JSDoc found, try to get leading comments
  if (!description) {
    const leadingComments = node.getLeadingCommentRanges();
    if (leadingComments && leadingComments.length > 0) {
      const firstComment = leadingComments[0];
      if (firstComment) {
        description = firstComment.getText();
        // Clean up comment markers
        description = description
          .replace(/^\/\*\*?\s*/, '')
          .replace(/\s*\*\/\s*$/, '')
          .replace(/^\s*\*\s?/gm, '');
      }
    }
  }

  return description.trim();
}

/**
 * Extract component props from component declaration
 */
function extractComponentProps(
  componentNode: VariableDeclaration | FunctionDeclaration | ClassDeclaration,
  sourceFile: SourceFile
): PropMetadata[] {
  try {
    // Find the props interface/type
    const propsInterface = findPropsInterface(componentNode, sourceFile);
    if (!propsInterface) return [];

    const extractedProps = extractPropsFromInterface(propsInterface);

    return extractedProps;
  } catch (error) {
    console.error(`Error extracting props for component "${componentNode.getName()}"`, error);
    return [];
  }
}

/**
 * Find the props interface/type for a component
 */
function findPropsInterface(
  componentNode: VariableDeclaration | FunctionDeclaration | ClassDeclaration,
  sourceFile: SourceFile
): InterfaceDeclaration | TypeAliasDeclaration | undefined {
  // Try different patterns to find the props interface
  const componentName = componentNode.getName();
  if (!componentName) return undefined;

  // Look for common prop interface naming patterns
  const possiblePropNames = [
    `${componentName}Props`,
    `${componentName}Properties`,
    `I${componentName}Props`,
    `T${componentName}Props`,
  ];

  for (const propName of possiblePropNames) {
    // First try to find it in the current file
    const localInterface = sourceFile.getInterface(propName) || sourceFile.getTypeAlias(propName);
    if (localInterface) {
      return localInterface;
    }

    // If not found locally, try to find it through imports
    const importedInterface = findImportedInterface(propName, sourceFile);
    if (importedInterface) {
      return importedInterface;
    }
  }

  // If we still haven't found it, try to extract from function parameters
  if (Node.isVariableDeclaration(componentNode)) {
    const initializer = componentNode.getInitializer();
    if (initializer && Node.isCallExpression(initializer)) {
      // Check if it's a forwardRef call
      const expression = initializer.getExpression();
      if (Node.isIdentifier(expression) && expression.getText() === 'forwardRef') {
        return extractPropsFromForwardRef(initializer);
      }
    }

    // Check for arrow function
    if (initializer && Node.isArrowFunction(initializer)) {
      const firstParam = initializer.getParameters()[0];
      if (firstParam) {
        return extractPropsFromParameter(firstParam, sourceFile);
      }
    }
  }

  // For function declarations, extract from first parameter
  if (Node.isFunctionDeclaration(componentNode)) {
    const firstParam = componentNode.getParameters()[0];
    if (firstParam) {
      return extractPropsFromParameter(firstParam, sourceFile);
    }
  }

  return undefined;
}

/**
 * Extract props interface from forwardRef call
 */
function extractPropsFromForwardRef(forwardRefCall: Node): InterfaceDeclaration | TypeAliasDeclaration | undefined {
  if (!Node.isCallExpression(forwardRefCall)) return undefined;

  // Get the callback function (first argument of forwardRef)
  const args = forwardRefCall.getArguments();

  if (args.length === 0) return undefined;

  const callback = args[0];
  if (!callback) return undefined;

  // Handle arrow function callback
  if (Node.isArrowFunction(callback)) {
    const firstParam = callback.getParameters()[0];
    if (firstParam) {
      // If the parameter has a type annotation, use it
      if (firstParam.getTypeNode()) {
        return extractPropsFromParameter(firstParam, forwardRefCall.getSourceFile());
      }

      // Otherwise, extract from forwardRef's generic type arguments
      return extractPropsFromForwardRefGenerics(forwardRefCall);
    }
  }

  // Handle regular function callback
  if (Node.isFunctionExpression(callback)) {
    const firstParam = callback.getParameters()[0];
    if (firstParam) {
      // If the parameter has a type annotation, use it
      if (firstParam.getTypeNode()) {
        return extractPropsFromParameter(firstParam, forwardRefCall.getSourceFile());
      }

      // Otherwise, extract from forwardRef's generic type arguments
      return extractPropsFromForwardRefGenerics(forwardRefCall);
    }
  }

  return undefined;
}

/**
 * Extract props interface from forwardRef's generic type arguments
 */
function extractPropsFromForwardRefGenerics(
  forwardRefCall: Node
): InterfaceDeclaration | TypeAliasDeclaration | undefined {
  if (!Node.isCallExpression(forwardRefCall)) return undefined;

  // Get the type arguments from the forwardRef call
  const typeArgs = forwardRefCall.getTypeArguments();

  if (typeArgs.length < 2) return undefined;

  // The second type argument is the props type
  const propsTypeArg = typeArgs[1];
  if (!propsTypeArg) return undefined;

  // If it's a type reference, try to resolve it
  if (Node.isTypeReference(propsTypeArg)) {
    const typeName = propsTypeArg.getTypeName();
    if (Node.isIdentifier(typeName)) {
      const referencedName = typeName.getText();
      const sourceFile = forwardRefCall.getSourceFile();

      // First try to find it in the current file
      const localInterface = sourceFile.getInterface(referencedName) || sourceFile.getTypeAlias(referencedName);
      if (localInterface) {
        return localInterface;
      }

      // If not found locally, try to resolve through the symbol
      const symbol = typeName.getSymbol();

      if (symbol) {
        const declarations = symbol.getDeclarations();

        for (const declaration of declarations) {
          if (Node.isInterfaceDeclaration(declaration) || Node.isTypeAliasDeclaration(declaration)) {
            return declaration;
          }
        }
      }

      // Try alternative approach - look through imports
      return findImportedInterface(referencedName, sourceFile);
    }
  }

  return undefined;
}

/**
 * Find an imported interface or type alias by name
 */
function findImportedInterface(
  interfaceName: string,
  sourceFile: SourceFile
): InterfaceDeclaration | TypeAliasDeclaration | undefined {
  // Look through import declarations
  const imports = sourceFile.getImportDeclarations();

  for (const importDecl of imports) {
    const namedImports = importDecl.getNamedImports();

    for (const namedImport of namedImports) {
      const importedName = namedImport.getName();

      if (importedName === interfaceName) {
        // Get the source file that contains the actual interface
        const resolvedModule = importDecl.getModuleSpecifierSourceFile();

        if (resolvedModule) {
          // Look for the interface in the resolved module
          const interfaceDecl = resolvedModule.getInterface(interfaceName);
          if (interfaceDecl) {
            return interfaceDecl;
          }

          const typeDecl = resolvedModule.getTypeAlias(interfaceName);
          if (typeDecl) {
            return typeDecl;
          }
        }
      }
    }
  }

  return undefined;
}

/**
 * Extract props interface from function parameter
 */
function extractPropsFromParameter(
  param: ParameterDeclaration,
  sourceFile: SourceFile
): InterfaceDeclaration | TypeAliasDeclaration | undefined {
  const typeNode = param.getTypeNode();
  if (!typeNode) return undefined;

  // If it's a type reference, try to resolve it
  if (Node.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName();
    if (Node.isIdentifier(typeName)) {
      const referencedName = typeName.getText();

      // First try to find it in the current file
      const localInterface = sourceFile.getInterface(referencedName) || sourceFile.getTypeAlias(referencedName);
      if (localInterface) {
        return localInterface;
      }

      // If not found locally, try to resolve through imports
      return findImportedInterface(referencedName, sourceFile);
    }
  }

  return undefined;
}

/**
 * Extract props from an interface or type alias
 */
function extractPropsFromInterface(propsInterface: InterfaceDeclaration | TypeAliasDeclaration): PropMetadata[] {
  const props: PropMetadata[] = [];

  if (Node.isInterfaceDeclaration(propsInterface)) {
    // Extract properties from interface
    const properties = propsInterface.getProperties();
    for (const property of properties) {
      const propMetadata = extractPropFromProperty(property);
      if (propMetadata) {
        props.push(propMetadata);
      }
    }

    // Also check extended interfaces
    const extendsClauses = propsInterface.getExtends();
    for (const extendsClause of extendsClauses) {
      const extendedProps = extractPropsFromExtendedType(extendsClause);
      props.push(...extendedProps);
    }
  } else if (Node.isTypeAliasDeclaration(propsInterface)) {
    // Extract properties from type alias
    const typeNode = propsInterface.getTypeNode();
    if (typeNode) {
      const typeNodeProps = extractPropsFromTypeNode(typeNode);
      props.push(...typeNodeProps);
    }
  }

  return props;
}

/**
 * Extract props from a type node (handles type literals, intersection types, etc.)
 */
function extractPropsFromTypeNode(typeNode: Node): PropMetadata[] {
  const props: PropMetadata[] = [];

  if (Node.isTypeLiteral(typeNode)) {
    // Handle type literal (e.g., { foo: string; bar: number })
    const properties = typeNode.getProperties();
    for (const property of properties) {
      if (Node.isPropertySignature(property)) {
        const propMetadata = extractPropFromProperty(property);
        if (propMetadata) {
          props.push(propMetadata);
        }
      }
    }
  } else if (Node.isIntersectionTypeNode(typeNode)) {
    // Handle intersection types (e.g., A & B)
    const intersectionTypes = typeNode.getTypeNodes();

    for (const node of intersectionTypes) {
      const intersectionProps = extractPropsFromTypeNode(node);

      props.push(...intersectionProps);
    }
  } else if (Node.isTypeReference(typeNode)) {
    // Handle type references (e.g., ButtonHTMLAttributes<HTMLButtonElement>)
    const typeName = typeNode.getTypeName();
    if (Node.isIdentifier(typeName)) {
      const referencedProps = extractPropsFromTypeReference(typeNode);
      props.push(...referencedProps);
    }
  }

  return props;
}

/**
 * Extract props from type reference (e.g., ButtonHTMLAttributes<HTMLButtonElement>)
 */
function extractPropsFromTypeReference(typeRef: Node): PropMetadata[] {
  const props: PropMetadata[] = [];

  if (Node.isTypeReference(typeRef)) {
    const typeName = typeRef.getTypeName();
    if (Node.isIdentifier(typeName)) {
      const typeNameText = typeName.getText();

      const symbol = typeName.getSymbol();

      if (symbol) {
        const declarations = symbol.getDeclarations();

        for (const declaration of declarations) {
          if (Node.isInterfaceDeclaration(declaration) || Node.isTypeAliasDeclaration(declaration)) {
            const referencedProps = extractPropsFromInterface(declaration);
            props.push(...referencedProps);
          } else if (Node.isImportSpecifier(declaration)) {
            // Handle imported types by following the import to the actual declaration
            const importDeclaration = declaration.getImportDeclaration();
            const resolvedModule = importDeclaration.getModuleSpecifierSourceFile();

            if (resolvedModule) {
              // First look for the interface/type in the resolved module
              let interfaceDecl = resolvedModule.getInterface(typeNameText);
              let typeDecl = resolvedModule.getTypeAlias(typeNameText);

              if (!interfaceDecl && !typeDecl) {
                // If not found directly, look through export declarations (re-exports)
                const exportDeclarations = resolvedModule.getExportDeclarations();

                for (const exportDecl of exportDeclarations) {
                  const namedExports = exportDecl.getNamedExports();

                  // Check if this is a star export (export * from './module')
                  if (namedExports.length === 0 && exportDecl.isNamespaceExport()) {
                    // This is a star export, check the module it's exporting from
                    const reExportedModule = exportDecl.getModuleSpecifierSourceFile();

                    if (reExportedModule) {
                      interfaceDecl = reExportedModule.getInterface(typeNameText);
                      typeDecl = reExportedModule.getTypeAlias(typeNameText);

                      if (!interfaceDecl && !typeDecl) {
                        // Not found directly, check if this module has its own re-exports
                        const nestedExportDeclarations = reExportedModule.getExportDeclarations();
                        for (const nestedExportDecl of nestedExportDeclarations) {
                          const nestedNamedExports = nestedExportDecl.getNamedExports();

                          // Check named exports
                          for (const nestedNamedExport of nestedNamedExports) {
                            if (nestedNamedExport.getName() === typeNameText) {
                              const nestedReExportedModule = nestedExportDecl.getModuleSpecifierSourceFile();

                              if (nestedReExportedModule) {
                                interfaceDecl = nestedReExportedModule.getInterface(typeNameText);
                                typeDecl = nestedReExportedModule.getTypeAlias(typeNameText);

                                if (interfaceDecl || typeDecl) {
                                  break;
                                }
                              }
                            }
                          }

                          if (interfaceDecl || typeDecl) {
                            break;
                          }
                        }
                      }

                      if (interfaceDecl || typeDecl) {
                        break;
                      }
                    }
                  }

                  for (const namedExport of namedExports) {
                    if (namedExport.getName() === typeNameText) {
                      // Found a re-export, follow it to the actual module
                      const reExportedModule = exportDecl.getModuleSpecifierSourceFile();

                      if (reExportedModule) {
                        interfaceDecl = reExportedModule.getInterface(typeNameText);
                        typeDecl = reExportedModule.getTypeAlias(typeNameText);

                        if (interfaceDecl || typeDecl) {
                          break;
                        }
                      }
                    }
                  }
                  if (interfaceDecl || typeDecl) {
                    break;
                  }
                }
              }

              if (interfaceDecl) {
                const importedProps = extractPropsFromInterface(interfaceDecl);
                props.push(...importedProps);
              } else if (typeDecl) {
                const importedProps = extractPropsFromInterface(typeDecl);
                props.push(...importedProps);
              }
            }
          } else if (Node.isExportSpecifier(declaration)) {
            // Handle re-exported types
            const exportDeclaration = declaration.getExportDeclaration();
            const moduleSpecifier = exportDeclaration.getModuleSpecifier();

            if (moduleSpecifier) {
              const reExportedModule = exportDeclaration.getModuleSpecifierSourceFile();
              if (reExportedModule) {
                const interfaceDecl = reExportedModule.getInterface(typeNameText);
                const typeDecl = reExportedModule.getTypeAlias(typeNameText);

                if (interfaceDecl) {
                  const importedProps = extractPropsFromInterface(interfaceDecl);
                  props.push(...importedProps);
                } else if (typeDecl) {
                  const importedProps = extractPropsFromInterface(typeDecl);
                  props.push(...importedProps);
                }
              }
            }
          }
        }
      }
    }
  }

  return props;
}

/**
 * Extract props from extended type (interface extends clause)
 */
function extractPropsFromExtendedType(extendsClause: Node): PropMetadata[] {
  const props: PropMetadata[] = [];

  if (Node.isExpressionWithTypeArguments(extendsClause)) {
    const expression = extendsClause.getExpression();
    if (Node.isIdentifier(expression)) {
      const symbol = expression.getSymbol();
      if (symbol) {
        const declarations = symbol.getDeclarations();
        for (const declaration of declarations) {
          if (Node.isInterfaceDeclaration(declaration) || Node.isTypeAliasDeclaration(declaration)) {
            const extendedProps = extractPropsFromInterface(declaration);
            props.push(...extendedProps);
          }
        }
      }
    }
  }

  return props;
}

/**
 * Extract prop metadata from a property signature
 */
function extractPropFromProperty(property: PropertySignature): PropMetadata | null {
  const name = property.getName();
  if (!name) return null;

  // Get type information
  const type = property.getType();
  const typeText = type.getText();

  // Build structured type metadata with optional options for string literal unions
  const propType = getPropTypeMetadata(property);

  // Check if required (no question token)
  const required = !property.hasQuestionToken();

  // Get description from JSDoc
  let description = '';
  const jsDocs = property.getJsDocs();
  if (jsDocs && jsDocs.length > 0) {
    const firstJsDoc = jsDocs[0];
    if (firstJsDoc) {
      description = firstJsDoc.getDescription().trim();
    }
  }

  // Try to get default value (this is tricky and may not always work)
  let defaultValue: string | undefined;
  const initializer = property.getInitializer();
  if (initializer) {
    defaultValue = initializer.getText();
  }

  return {
    name,
    description: description || `${name} prop`,
    type: propType ?? { name: typeText },
    defaultValue,
    required,
  };
}

/**
 * Clean up type text by removing JSDoc comments and normalizing whitespace.
 */
function cleanTypeText(text: string): string {
  return (
    text
      // Remove JSDoc comments (/** ... */), but skip quoted strings
      .replace(/(["'`])(?:(?!\1|\\).|\\.)*\1|\/\*\*[\s\S]*?\*\//g, (match) => (match.startsWith('/') ? '' : match))
      // Remove single-line comments (// ...), but skip quoted strings
      .replace(/(["'`])(?:(?!\1|\\).|\\.)*\1|\/\/.*$/gm, (match) => (match.startsWith('/') ? '' : match))
      // Normalize whitespace: collapse multiple spaces/newlines into single space
      .replace(/\s+/g, ' ')
      // Remove spaces after { and before }
      .replace(/\{\s+/g, '{')
      .replace(/\s+\}/g, '}')
      // Remove spaces before ; and after ;
      .replace(/\s*;\s*/g, ';')
      // Trim leading/trailing whitespace
      .trim()
  );
}

/**
 * Create PropTypeMetadata for a property, including options for string literal unions.
 */
function getPropTypeMetadata(property: PropertySignature): { name: string; options?: string[] } | null {
  const typeNode = property.getTypeNode();
  if (!typeNode) return null;
  const name = cleanTypeText(typeNode.getText());

  // First, try to get options from the type node directly (covers inline unions)
  let options: string[] | undefined;

  options = extractStringUnionOptionsFromTypeNode(typeNode);

  // If this is a reference to a type alias (e.g., ButtonVariants), resolve alias and try again
  if ((!options || options.length === 0) && Node.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName();
    const symbol = Node.isIdentifier(typeName) ? typeName.getSymbol() : undefined;
    if (symbol) {
      const declarations = symbol.getDeclarations();
      for (const decl of declarations) {
        if (Node.isTypeAliasDeclaration(decl)) {
          const aliasTypeNode = decl.getTypeNode();
          if (aliasTypeNode) {
            const aliasOptions = extractStringUnionOptionsFromTypeNode(aliasTypeNode);
            if (aliasOptions.length > 0) {
              options = aliasOptions;
              break;
            }
          }
        }
      }
    }
  }

  return { name, ...(options && options.length > 0 ? { options } : {}) };
}

/**
 * Extract string literal union options from a TypeNode tree.
 */
function extractStringUnionOptionsFromTypeNode(typeNode: Node): string[] {
  // Inline union like 'a' | 'b'
  if (Node.isUnionTypeNode(typeNode)) {
    const members = typeNode.getTypeNodes();
    const values: string[] = [];
    for (const m of members) {
      if (Node.isLiteralTypeNode(m)) {
        const lit = m.getLiteral();
        if (Node.isStringLiteral(lit)) {
          values.push(lit.getLiteralText());
          continue;
        }
      }
      // Non-string literal member -> not a pure string-literal union
      return [];
    }
    return values;
  }

  // Type alias that is itself a union will be handled by the caller when resolving alias declarations
  return [];
}

/**
 * Extract component categories from file path
 */
function extractComponentCategories(filePath: string): { category?: string; subCategory?: string } {
  const pathSegments = filePath.split(path.sep);
  const componentsIndex = pathSegments.findIndex((segment) => segment === 'components');

  if (componentsIndex === -1) {
    return {};
  }

  const category = pathSegments[componentsIndex + 1];
  const subCategory = pathSegments[componentsIndex + 2];

  return { category, subCategory };
}
