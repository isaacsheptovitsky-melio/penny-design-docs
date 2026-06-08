import { z } from 'zod';

import designToCodePlanningTemplate from './design-to-code-planning.md';
import formImplementationGuidanceTemplate from './form-implementation-guidelines.md';

interface PromptMessage {
  role: 'user' | 'assistant';
  content: {
    type: 'text';
    text: string;
  };

  [key: string]: unknown;
}

interface PromptResult {
  description: string;
  messages: PromptMessage[];

  [key: string]: unknown;
}

const TEMPLATE_PLACEHOLDER = '{{CONTEXT}}';
const designToCodePlanningPromptArgsShape = {
  designReference: z
    .string()
    .min(1)
    .describe('Primary design reference. Typically a Figma URL or a description of the provided design assets.'),
  additionalNotes: z
    .string()
    .min(1)
    .describe('Optional implementation notes, acceptance criteria, or open questions to keep in mind.')
    .optional(),
};

// Schema is used only for type inference; MCP API expects the shape object at runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const designToCodePlanningPromptArgsSchema = z.object(designToCodePlanningPromptArgsShape);

export type DesignToCodePlanningPromptArgs = z.infer<typeof designToCodePlanningPromptArgsSchema>;

export const DESIGN_TO_CODE_PLANNING_PROMPT_NAME = 'design_to_code_planning';

export const designToCodePlanningPrompt = {
  name: DESIGN_TO_CODE_PLANNING_PROMPT_NAME,
  config: {
    title: 'Design-to-Code Planning',
    description:
      'Guide for planning a design-to-code implementation using the Penny design system, MCP tooling, and approved workflows.',
    argsSchema: designToCodePlanningPromptArgsShape,
  },
  handler: (args: DesignToCodePlanningPromptArgs): PromptResult => {
    const contextLines = [
      `Design Reference: ${args.designReference}`,
      args.additionalNotes ? `Additional Notes: ${args.additionalNotes}` : undefined,
    ]
      .filter(Boolean)
      .join('\n');

    const messageWithPlanningContext =
      contextLines.length > 0
        ? designToCodePlanningTemplate?.replace(TEMPLATE_PLACEHOLDER, contextLines)
        : designToCodePlanningTemplate?.replace(TEMPLATE_PLACEHOLDER, '');

    const fullMessage = [messageWithPlanningContext, formImplementationGuidanceTemplate].join('\n\n');

    return {
      description:
        'Detailed checklist for transforming a Figma design into code with the Penny design system and MCP integrations.',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: fullMessage,
          },
        },
      ],
    };
  },
} as const;
