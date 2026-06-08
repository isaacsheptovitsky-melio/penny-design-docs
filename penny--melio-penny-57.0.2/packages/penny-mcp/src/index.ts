// @ts-nocheck - MCP SDK v1.24.3 has excessively deep type instantiation (TS2589)
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { designToCodePlanningPrompt, DesignToCodePlanningPromptArgs } from './prompts/designToCodePlanning';
import { designToCodePlanning, formImplementationGuidelines } from './resources';
import { getPennyComponentDetails } from './tools/getPennyComponentDetails';
import { listPennyComponents } from './tools/listPennyComponents';
import { listPennyDesignTokens } from './tools/listPennyDesignTokens';

const server = new McpServer({ name: 'penny-mcp', version: '1.0.0' });

const CATEGORY_VALUES = [
  'action',
  'dataDisplay',
  'feedback',
  'form',
  'navigation',
  'selectionAndInputs',
  'table',
  'media',
  'accessibility',
] as const;

const DESIGN_TOKEN_TYPE_VALUES = [
  'color',
  'border',
  'borderRadius',
  'breakpoints',
  'fontFamily',
  'fontWeight',
  'fontSize',
  'textStyle',
  'spacing',
  'shadow',
  'zIndex',
] as const;

server.registerTool(
  'list_penny_components',
  {
    description: 'List all available Penny design system components with optional category filtering',
    inputSchema: {
      category: z
        .enum(CATEGORY_VALUES)
        .optional()
        .describe(
          'Optional category filter (action, dataDisplay, feedback, form, navigation, selectionAndInputs, table, media, accessibility)'
        ),
    },
  },
  async (args: unknown) => {
    const result = await listPennyComponents(args as { category?: string });
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
);

server.registerTool(
  'get_penny_component_details',
  {
    description:
      'Get detailed information about a specific Penny component including props definition and usage example',
    inputSchema: {
      componentName: z.string().min(1).describe('Name of the component to get details for'),
    },
  },
  async (args: unknown) => {
    const result = await getPennyComponentDetails(args as { componentName: string });
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
);

server.registerTool(
  'list_penny_design_tokens',
  {
    description: 'List all available Penny design tokens with optional type filtering',
    inputSchema: {
      type: z
        .enum(DESIGN_TOKEN_TYPE_VALUES)
        .optional()
        .describe(
          'Optional type filter (color, border, borderRadius, breakpoints, fontFamily, fontWeight, fontSize, textStyle, spacing, shadow, zIndex)'
        ),
    },
  },
  async (args: unknown) => {
    const result = await listPennyDesignTokens(args as { type?: string });
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
);

server.registerPrompt(
  designToCodePlanningPrompt.name,
  designToCodePlanningPrompt.config,
  (args: DesignToCodePlanningPromptArgs) => designToCodePlanningPrompt.handler(args)
);

server.registerResource(
  'design-to-code-planning',
  'penny://prompts/design-to-code-planning',
  {
    description: 'Design-to-code planning template for Penny design system',
    mimeType: 'text/markdown',
  },
  () => ({
    contents: [
      {
        uri: 'penny://prompts/design-to-code-planning',
        mimeType: 'text/markdown',
        text: designToCodePlanning,
      },
    ],
  })
);

server.registerResource(
  'form-implementation-guidelines',
  'penny://prompts/form-implementation-guidelines',
  {
    description: 'Form implementation guidelines template for Penny design system',
    mimeType: 'text/markdown',
  },
  () => ({
    contents: [
      {
        uri: 'penny://prompts/form-implementation-guidelines',
        mimeType: 'text/markdown',
        text: formImplementationGuidelines,
      },
    ],
  })
);

process.on('uncaughtException', () => {});
process.on('unhandledRejection', () => {});

const transport = new StdioServerTransport();
await server.connect(transport);
