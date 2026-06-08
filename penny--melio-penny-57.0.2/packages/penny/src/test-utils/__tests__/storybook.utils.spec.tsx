import { describe, expect, it } from 'vitest';

import { extractComponentSource } from '../storybook.utils';

describe('extractComponentSource', () => {
  // Happy path - basic case
  it('should extract a simple component source', () => {
    const source = `
      import React from 'react';
import { expect } from 'vitest';
      export const SimpleComponent = () => {
        return <div>Hello World</div>;
      };
      export const OtherComponent = () => {
        return <div>Other Component</div>;
      };
    `;

    const result = extractComponentSource(source, 'SimpleComponent');

    expect(result).toContain('const SimpleComponent = () => {');
    expect(result).toContain('return <div>Hello World</div>;');
    expect(result).not.toContain('export ');
    expect(result).not.toContain('OtherComponent');
  });

  // Testing with props
  it('should extract a component with props', () => {
    const source = `
      export const ComponentWithProps = ({ name, age }: { name: string; age: number }) => {
        return <div>Hello {name}, you are {age} years old</div>;
      };
    `;

    const result = extractComponentSource(source, 'ComponentWithProps');

    expect(result).toContain('const ComponentWithProps = ({ name, age }: { name: string; age: number }) => {');
    expect(result).toContain('return <div>Hello {name}, you are {age} years old</div>;');
  });

  // Testing with nested functions and JSX
  it('should extract a component with nested functions and JSX', () => {
    const source = `
      export const ComplexComponent = (args: Partial<SomeType>) => {
        const NestedComponent = ({ text }: { text: string }) => {
          return <span>{text}</span>;
        };
        
        const handleClick = () => {
          console.log('clicked');
        };
        
        return (
          <div onClick={handleClick}>
            <NestedComponent text="Hello" />
            {args.showMore && <div>More content</div>}
          </div>
        );
      };
    `;

    const result = extractComponentSource(source, 'ComplexComponent');

    expect(result).toContain('const ComplexComponent = (args: Partial<SomeType>) => {');
    expect(result).toContain('const NestedComponent = ({ text }: { text: string }) => {');
    expect(result).toContain('const handleClick = () => {');
    expect(result).toContain('<NestedComponent text="Hello" />');
  });

  // Testing with string literals containing braces and semicolons
  it('should handle string literals with braces and semicolons correctly', () => {
    const source = `
      export const ComponentWithStrings = () => {
        const codeString = \`function example() { return true; }\`;
        const objectString = '{ "key": "value" }';
        return <pre>{codeString}</pre>;
      };
    `;

    const result = extractComponentSource(source, 'ComponentWithStrings');

    expect(result).toContain('const codeString = `function example() { return true; }`');
    expect(result).toContain('const objectString = \'{ "key": "value" }\'');
  });

  // Testing error handling - component not found
  it('should handle component not found', () => {
    const source = `
      export const ComponentA = () => <div>A</div>;
      export const ComponentB = () => <div>B</div>;
    `;

    const result = extractComponentSource(source, 'NonExistentComponent');

    expect(result).toBe('// Could not find component NonExistentComponent');
  });

  // Testing with useMemo and complex logic
  it('should handle components with hooks and complex logic', () => {
    const source = `
      export const TableExample = (args: Partial<UseTableOptions<SomeType>>) => {
        const columns: TableColumnDef<SomeType>[] = useMemo(
          () => [
            {
              id: 'col1',
              header: 'Column 1',
              cell: ({ row }) => <Cell>{row.value}</Cell>,
            },
            {
              id: 'col2',
              header: 'Column 2',
              cell: ({ row }) => <Cell>{row.otherValue}</Cell>,
            },
          ],
          []
        );

        const tableProps = useTable({
          data,
          columns,
          onRowClick: () => null,
        });

        return (
          <Table {...tableProps} />
        );
      };
    `;

    const result = extractComponentSource(source, 'TableExample');

    expect(result).toContain('const TableExample = (args: Partial<UseTableOptions<SomeType>>) => {');
    expect(result).toContain('const columns: TableColumnDef<SomeType>[] = useMemo(');
    expect(result).toContain('return (\n          <Table {...tableProps} />\n        );');
  });

  // Testing with nested JSX and conditional rendering
  it('should handle nested JSX and conditional rendering', () => {
    const source = `
      export const ConditionalComponent = ({ condition }: { condition: boolean }) => {
        return (
          <div>
            {condition ? (
              <div>
                <h1>True Condition</h1>
                <p>This is shown when condition is true</p>
              </div>
            ) : (
              <div>
                <h1>False Condition</h1>
                <p>This is shown when condition is false</p>
              </div>
            )}
          </div>
        );
      };
    `;

    const result = extractComponentSource(source, 'ConditionalComponent');

    expect(result).toContain('const ConditionalComponent = ({ condition }: { condition: boolean }) => {');
    expect(result).toContain('<h1>True Condition</h1>');
    expect(result).toContain('<h1>False Condition</h1>');
  });

  // Testing with inline comments
  it('should handle components with inline comments', () => {
    const source = `
      export const ComponentWithComments = () => {
        // This is a comment
        const value = 42; // Inline comment
        /* Block comment
           spanning multiple lines */
        return (
          <div>
            {/* JSX comment */}
            <span>{value}</span>
          </div>
        );
      };
    `;

    const result = extractComponentSource(source, 'ComponentWithComments');

    expect(result).toContain('// This is a comment');
    expect(result).toContain('const value = 42; // Inline comment');
    expect(result).toContain('/* Block comment\n           spanning multiple lines */');
    expect(result).toContain('{/* JSX comment */}');
  });

  // Testing with escaped characters in strings
  it('should handle escaped characters in strings', () => {
    const source = `
      export const ComponentWithEscapedChars = () => {
        const str = "This has \\"quotes\\" inside";
        const backtick = \`Template with \\\${escaped} placeholder\`;
        return <div>{str} {backtick}</div>;
      };
    `;

    const result = extractComponentSource(source, 'ComponentWithEscapedChars');

    expect(result).toContain('const str = "This has \\"quotes\\" inside"');
    expect(result).toContain('const backtick = `Template with \\${escaped} placeholder`');
  });

  // Testing component with very complex nesting
  it('should extract a component with very complex nesting', () => {
    const source = `
      export const ComplexNestedComponent = () => {
        const renderItem = (item) => {
          if (item.type === 'group') {
            return (
              <div>
                <h2>{item.title}</h2>
                {item.children.map(child => (
                  <div key={child.id}>
                    {renderItem(child)}
                  </div>
                ))}
              </div>
            );
          }
          return <span>{item.name}</span>;
        };
        
        return (
          <div>
            {data.map(item => renderItem(item))}
          </div>
        );
      };
    `;

    const result = extractComponentSource(source, 'ComplexNestedComponent');

    expect(result).toContain('const ComplexNestedComponent = () => {');
    expect(result).toContain('const renderItem = (item) => {');
    expect(result).toContain("if (item.type === 'group') {");
    expect(result).toContain('{item.children.map(child => (');
    expect(result).toContain('{data.map(item => renderItem(item))}');
  });
});
